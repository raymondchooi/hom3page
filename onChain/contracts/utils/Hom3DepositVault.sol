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

    mapping(uint256 => uint256) private _deposit; //Profile No. to amount
    mapping(uint256 => address) private _spender;
    mapping(uint256 => uint256) private _allowance; //Profile No. to amount

    modifier onlyProfileOwner(uint256 profileId_) {
        if (!_checkSenderIsOwner(profileId_)) revert NotOwnerOfProfile();
        _;
    }

    modifier onlySpender(uint256 profileId_) {
        if (_spender[profileId_] != _msgSender()) revert NotATrustedSpender();
        _;
    }

    constructor(
        address ghoToken_,
        address profileContract_,
        address ccipRouter_,
        address linkToken_
    ) CCIPInterface(linkToken_, ccipRouter_) Ownable(msg.sender) {
        PAYMENT_TOKEN = IGhoToken(ghoToken_);
        HOM3_PROFILE = IERC721A(profileContract_);
        LINK_TOKEN = LinkTokenInterface(linkToken_);
    }

    function spend(
        uint256 profileId_,
        uint256 amount_,
        bytes calldata calldata_
    ) external onlySpender(profileId_) {
        if (_allowance[profileId_] < amount_) revert AllowanceToLow();
        if (_deposit[profileId_] < amount_) revert BalanceToLow();
    }

    /**   @dev  DEPOSIT CONTROL  */
    function depositFunds(
        uint256 profileId_,
        uint256 amount_
    ) external override onlyProfileOwner(profileId_) {
        if (_checkTokenBalance(_msgSender()) < amount_) revert BalanceToLow();

        bool success = _transferTokens(address(this), msg.sender, amount_);
        if (success) {
            _deposit[profileId_] += amount_;
            emit DepositedFunds(profileId_, amount_);
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
        _transferTokens(address(this), msg.sender, amount_);

        emit WithdrewFunds(profileId_, amount_);
    }

    /**     @dev    CROSS CHAIN   */

    function _sendDeposit() internal returns (bytes32) {
        Message memory newMessage = Message();

    }

    function _messageSwitch(
        MessageActions action_,
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal {
        if (action_ == MessageActions.DEPOSIT) _receiveDeposit(any2EvmMessage);
    }

    function _receiveDeposit(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal returns (bool) {
        Message memory message = abi.decode(any2EvmMessage.data, (Message));
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
    ) internal onlyOwner returns (bytes32 messageId) {
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        Client.EVM2AnyMessage memory evm2AnyMessage = _buildMessage(
            receiver_,
            abi.encode(payload_),
            1_000_000
        );
        // Send the CCIP message through the router and store the returned CCIP message ID
        messageId = _sendTX(destinationChainSelector_, evm2AnyMessage);

        // Emit an event with message details
        emit MessageSent(messageId, destinationChainSelector_);

        // Return the CCIP message ID
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
    function getProfilesDeposits(
        uint256 profileId_
    ) external view override returns (uint256) {
        return _deposit[profileId_];
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
