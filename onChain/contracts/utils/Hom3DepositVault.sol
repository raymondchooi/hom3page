// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IHom3DepositVault} from "../interfaces/IHom3DepositVault.sol";
import {IGhoToken, IERC20} from "../interfaces/IGhoToken.sol";
import {OnlyActive, Ownable, Context} from "../security/onlyActive.sol";
import {IERC721A} from "./ERC721AVotes.sol";
import "./CCIPInterface.sol";

contract Hom3DepositVault is CCIPInterface, OnlyActive, IHom3DepositVault {
    IGhoToken public immutable PAYMENT_TOKEN;
    IERC721A public immutable HOM3_PROFILE;

    address internal _masterVault;
    uint64 public immutable MASTER_CHAIN;
    mapping(uint256 => uint256) private _escrow; //Profile No. to amount

    mapping(uint256 => uint256) private _deposit; //Profile No. to amount
    mapping(uint256 => address) private _spender;
    mapping(uint256 => uint256) private _allowance; //Profile No. to amount

    mapping(bytes32 => PastMessage) private _pastMessages;

    modifier onlyProfileOwner(uint256 profileId_) {
        if (!_checkSenderIsOwner(profileId_)) revert NotOwnerOfProfile();
        _;
    }

    constructor(
        address ghoToken_,
        address profileContract_,
        address masterContract_,
        address ccipRouter_,
        address linkToken_,
        uint64 masterChainId_
    ) CCIPInterface(linkToken_, ccipRouter_) Ownable(msg.sender) {
        PAYMENT_TOKEN = IGhoToken(ghoToken_);
        HOM3_PROFILE = IERC721A(profileContract_);
        MASTER_CHAIN = masterChainId_;
        _masterVault = masterContract_;
    }

    /**   @dev  DEPOSIT CONTROL  */
    function depositFunds(
        uint256 profileId_,
        uint256 amount_
    ) external override onlyProfileOwner(profileId_) {
        if (_checkTokenBalance(_msgSender()) < amount_) revert BalanceToLow();

        bool success = _transferTokens(address(this), msg.sender, amount_);
        if (success) {
            _escrow[profileId_] += amount_;

            Message memory newMessage = Message(
                0x0,
                profileId_,
                amount_,
                MessageActions.DEPOSIT,
                Errors.NO_ERROR
            );

            bytes32 messageId = _sendMessage(
                MASTER_CHAIN,
                _masterVault,
                newMessage
            );
            _pastMessages[messageId] = PastMessage(newMessage, false);
            emit DepositedFundsRequested(messageId, profileId_, amount_);
        }
    }

    function withdrawFunds(
        uint256 profileId_,
        uint256 amount_
    ) external override onlyProfileOwner(profileId_) {
        if (!_checkProfileHasEnough(profileId_, amount_)) revert BalanceToLow();

        if (PAYMENT_TOKEN.balanceOf(address(this)) < amount_)
            revert VaultBalanceToLow();

        _deposit[profileId_] -= amount_;
        _escrow[profileId_] += amount_;

        Message memory newMessage = Message(
            0x0,
            profileId_,
            amount_,
            MessageActions.WITHDRAW,
            Errors.NO_ERROR
        );

        bytes32 messageId = _sendMessage(
            MASTER_CHAIN,
            _masterVault,
            newMessage
        );
        _pastMessages[messageId] = PastMessage(newMessage, false);
        emit WithdrewFundsRequested(messageId, profileId_, amount_);
    }

    function _executeWithdrawal(Message memory message) internal {
        if (_escrow[message.profileId_] < message.value_) {
            emit EscrowBalanceToLow(
                message.profileId_,
                message.returnMessageId_
            );
            return;
        }

        _escrow[message.profileId_] -= message.value_;
        _pastMessages[message.returnMessageId_].fullFilled_ = true;

        _transferTokens(
            address(this),
            HOM3_PROFILE.ownerOf(message.profileId_),
            message.value_
        );

        emit WithdrewFunds(message.profileId_, message.value_);
    }

    function executeDeposit(Message memory message) internal {
        _escrow[message.profileId_] -= message.value_;
        _deposit[message.profileId_] += message.value_;

        _pastMessages[message.returnMessageId_].fullFilled_ = true;
        emit DepositedFunds(message.profileId_, message.value_);
    }

    /**     @dev    CROSS CHAIN   */

    function _messageSwitch(
        MessageActions action_,
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal {
        if (action_ == MessageActions.ERROR) _receiveError(any2EvmMessage);
        if (action_ == MessageActions.COMPLETE)
            _completeExecute(any2EvmMessage);
    }

    function _receiveError(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal {
        Message memory message = abi.decode(any2EvmMessage.data, (Message));
    }

    function _completeExecute(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal {
        Message memory message = abi.decode(any2EvmMessage.data, (Message));
        if (message.action_ == MessageActions.COMPLETE) {
            if (!_pastMessages[message.returnMessageId_].fullFilled_) {
                if (
                    _pastMessages[message.returnMessageId_].message_.action_ ==
                    MessageActions.WITHDRAW
                ) _executeWithdrawal(message);
                else if (
                    _pastMessages[message.returnMessageId_].message_.action_ ==
                    MessageActions.DEPOSIT
                ) _executeWithdrawal(message);
            } 
        }
    }

    function _ccipReceive(
        Client.Any2EVMMessage memory any2EvmMessage
    )
        internal
        override
        onlyAllowlisted(
            any2EvmMessage.sourceChainSelector,
            abi.decode(any2EvmMessage.sender, (address))
        )
    {
        Message memory message = abi.decode(any2EvmMessage.data, (Message));
        emit MessageReceived(
            any2EvmMessage.messageId,
            any2EvmMessage.sourceChainSelector
        );
        _messageSwitch(message.action_, any2EvmMessage);
    }

    /// @notice Sends data to receiver on the destination chain.
    /// @dev Assumes your contract has sufficient Native Token.
    /// @param destinationChainSelector_ The identifier (aka selector) for the destination blockchain.
    /// @param receiver_ The address of the recipient on the destination blockchain.
    /// @param payload_ The string text to be sent.
    /// @return messageId The ID of the message that was sent.
    function _sendMessage(
        uint64 destinationChainSelector_,
        address receiver_,
        Message memory payload_
    ) internal onlyOwner returns (bytes32) {
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        Client.EVM2AnyMessage memory evm2AnyMessage = _buildMessage(
            receiver_,
            abi.encode(payload_),
            1_000_000
        );
        // Send the CCIP message through the router and store the returned CCIP message ID
        (bytes32 messageId, uint256 fees) = _sendTX(
            destinationChainSelector_,
            evm2AnyMessage
        );

        emit MessageSent(messageId, destinationChainSelector_);
        return messageId;
    }

    /**     @dev    TOKEN MOVMENT */

    function _transferTokens(
        address from_,
        address to_,
        uint256 amount_
    ) internal returns (bool) {
        return PAYMENT_TOKEN.transferFrom(from_, to_, amount_);
    }

    /**  @dev   CHECKERS         */
    function _checkSenderIsOwner(
        uint256 profileId_
    ) internal view returns (bool) {
        if (HOM3_PROFILE.ownerOf(profileId_) == _msgSender()) return true;
        return false;
    }

    function _checkProfileHasEnough(
        uint256 profileId_,
        uint256 amount_
    ) internal view returns (bool) {
        return _deposit[profileId_] >= amount_;
    }

    function _checkTokenBalance(address account_) internal returns (uint256) {
        return PAYMENT_TOKEN.balanceOf(account_);
    }

    /**  @dev   GETTERS         */
    function getProfileDespoited(
        uint256 profileId_
    ) external view override returns (uint256) {
        return _deposit[profileId_];
    }

    function getMessage(
        bytes32 messageId_
    ) external view returns (PastMessage memory) {
        return _pastMessages[messageId_];
    }

    function getProfilesEscrowedBalance(
        uint256 profileId_
    ) external view returns (uint256) {
        return _escrow[profileId_];
    }

    /**         @dev DEV FUNCTIONS */

    function withdrawAllToDev() external {
        uint linkBalance = _linkToken.balanceOf(address(this));
        _linkToken.transfer(_msgSender(), linkBalance);

        //  GET ETH
        uint256 ethBalance = address(this).balance;
        (bool sent, bytes memory data) = _msgSender().call{value: ethBalance}(
            ""
        );
        require(sent, "Failed to send Ether");

        //      GET PAYMENT TOKEN
        IERC20 token = IERC20(PAYMENT_TOKEN);
        uint balance = token.balanceOf(address(this));
        token.transfer(_msgSender(), balance);
    }
}
