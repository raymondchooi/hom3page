// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IHom3DepositVault} from "../interfaces/IHom3DepositVault.sol";
import {IGhoToken, IERC20} from "../interfaces/IGhoToken.sol";
import {OnlyActive, Ownable, Context} from "../security/onlyActive.sol";
import {IERC721A} from "./ERC721AVotes.sol";
import "../helpers/CCIPInterface.sol";

contract Hom3DepositVault is CCIPInterface, OnlyActive, IHom3DepositVault {
    IGhoToken public immutable PAYMENT_TOKEN;

    address internal _masterVault;
    uint64 public immutable MASTER_CHAIN;

    mapping(uint256 => uint256) private _escrow; //Profile No. to amount
    mapping(uint256 => uint256) private _deposit; //Profile No. to amount
    mapping(uint256 => address) private _spender;

    mapping(uint256 => address) private _owners;

    mapping(bytes32 => PastMessage) private _pastMessages;

    modifier onlyProfileOwner(uint256 profileId_) {
        if (!_checkSenderIsOwner(profileId_)) revert NotOwnerOfProfile();
        _;
    }

    fallback() external payable {}

    receive() external payable {}

    constructor(
        address ghoToken_,
        address masterContract_,
        address ccipRouter_,
        address linkToken_,
        uint64 masterChainId_
    ) CCIPInterface(linkToken_, ccipRouter_) Ownable(msg.sender) {
        PAYMENT_TOKEN = IGhoToken(ghoToken_);
        MASTER_CHAIN = masterChainId_;
        _masterVault = masterContract_;
        _setAllowedAddress(masterChainId_, masterContract_);
        _setChainsActivity(masterChainId_, true);
    }

    /**   @dev  DEPOSIT CONTROL  */
    function depositFunds(
        uint256 profileId_,
        uint256 amount_
    ) external override {
        if (_checkTokenBalance(_msgSender()) < amount_) revert BalanceToLow();

        bool success = _transferTokens(msg.sender, address(this), amount_);
        if (success) {
            _deposit[profileId_] += amount_;

            Message memory newMessage = Message(
                MessageActions.DEPOSIT,
                Errors.NO_ERROR,
                "",
                UpdateMessage(profileId_, _msgSender(), 0),
                bytes32(0x0),
                amount_
            );

            Client.EVM2AnyMessage memory evm2AnyMessage = _buildMessage(
                _masterVault,
                abi.encode(newMessage),
                1_000_000
            );

            bytes32 messageId = _sendMessage(MASTER_CHAIN, evm2AnyMessage);
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
            MessageActions.WITHDRAW,
            Errors.NO_ERROR,
            "",
            UpdateMessage(profileId_, _msgSender(), amount_),
            bytes32(0x0),
            amount_
        );

        Client.EVM2AnyMessage memory evm2AnyMessage = _buildMessage(
            _masterVault,
            abi.encode(newMessage),
            1_000_000
        );
        bytes32 messageId = _sendMessage(MASTER_CHAIN, evm2AnyMessage);

        _pastMessages[messageId] = PastMessage(newMessage, false);
        emit WithdrewFundsRequested(messageId, profileId_, amount_);
    }

    function _executeWithdrawal(Message memory message) internal {
        if (_escrow[message.update_.profileId_] < message.value_) {
            emit EscrowBalanceToLow(
                message.update_.profileId_,
                message.returnMessageId_
            );
            return;
        }

        _escrow[message.update_.profileId_] -= message.value_;
        _pastMessages[message.returnMessageId_].fullFilled_ = true;

        emit WithdrewFunds(message.update_.profileId_, message.value_);
    }

    function _executeDeposit(Message memory message) internal {
        _escrow[message.update_.profileId_] -= message.value_;
        _deposit[message.update_.profileId_] += message.value_;

        _pastMessages[message.returnMessageId_].fullFilled_ = true;
        emit DepositedFunds(message.update_.profileId_, message.value_);
    }

    function _executeTransferProfile(Message memory message) internal {
        _owners[message.update_.profileId_] = message.update_.owner_;
        emit ProfileOwnershipTransferred(
            message.update_.profileId_,
            message.update_.owner_
        );
    }

    /**     @dev    CROSS CHAIN   */

    function _messageSwitch(
        MessageActions action_,
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal {
        if (action_ == MessageActions.ERROR) _receiveError(any2EvmMessage);
        if (action_ == MessageActions.COMPLETE)
            _receiveComplete(any2EvmMessage);
    }

    function _receiveError(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal {
        Message memory message = abi.decode(any2EvmMessage.data, (Message));
    }

    function _receiveComplete(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal {
        Message memory message = abi.decode(any2EvmMessage.data, (Message));

        MessageActions action = _pastMessages[message.returnMessageId_]
            .message_
            .action_;

        if (!_pastMessages[message.returnMessageId_].fullFilled_) {
            if (action == MessageActions.WITHDRAW) _executeWithdrawal(message);
            else if (action == MessageActions.DEPOSIT) _executeDeposit(message);
            else if (action == MessageActions.TRANSFER)
                _executeTransferProfile(message);
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

    function _sendMessage(
        uint64 destinationChainSelector_,
        Client.EVM2AnyMessage memory evm2AnyMessage
    ) internal returns (bytes32) {
        // Get the fee required to send the CCIP message
        (bytes32 messageId, uint256 fees) = _sendTX(
            destinationChainSelector_,
            evm2AnyMessage
        );
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
        if (_owners[profileId_] == _msgSender()) return true;
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

    function setAllowedVaultAddress(
        uint64 chainId_,
        address contractAddress_
    ) public onlyOwner {
        _setAllowedAddress(chainId_, contractAddress_);
    }

    /**
     * @notice switch the allow of a ccip chain
     * @param chainId_ chain id to effect
     * @param flag_ wether to be active or not
     */
    function setAllowedChainId(uint64 chainId_, bool flag_) public onlyOwner {
        _setChainsActivity(chainId_, flag_);
    }

    /**  @dev   GETTERS         */
    function getProfileDeposits(
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
