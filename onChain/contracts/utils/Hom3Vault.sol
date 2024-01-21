// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IHom3Vault} from "../interfaces/IHom3Vault.sol";
import {IGhoToken, IERC20} from "../interfaces/IGhoToken.sol";

import {OnlyActive, Ownable, Context} from "../security/onlyActive.sol";
import {IERC721A} from "./ERC721AVotes.sol";
import "../helpers/CCIPInterface.sol";

abstract contract Hom3Vault is CCIPInterface, OnlyActive, IHom3Vault {
    IERC721A public immutable HOM3_PROFILE;

    mapping(uint256 => uint256) private _escrow; //Profile No. to amount
    mapping(uint256 => uint256) private _deposit; //Profile No. to amount
    mapping(uint256 => uint256) private _spender;
    mapping(uint256 => uint256) private _allowance; //Profile No. to amount

    mapping(bytes32 => PastMessage) private _pastMessages;

    modifier onlyProfileOwner(uint256 profileId_) virtual {
        if (!_checkSenderIsOwner(profileId_)) revert NotOwnerOfProfile();
        _;
    }

    modifier onlySpender(uint256 profileId_, uint256 spender_) {
        if (_spender[profileId_] != spender_) revert NotATrustedSpender();
        _;
    }

   
    constructor(
        address profileContract_,
        address ccipRouter_,
        address linkToken_
    ) CCIPInterface(linkToken_, ccipRouter_) {
        HOM3_PROFILE = IERC721A(profileContract_);
    }

    function spend(
        uint256 profileId_,
        uint256 spender_,
        uint256 amount_,
        bytes calldata calldata_
    ) external onlySpender(profileId_, spender_) {
        if (_allowance[profileId_] < amount_) revert AllowanceToLow();
        if (_deposit[profileId_] < amount_) revert BalanceToLow();
        _deposit[spender_] += spender_;
        _allowance[profileId_] -= amount_;
        _deposit[profileId_] -= amount_;
        emit SpendTriggered(profileId_, spender_, amount_);
        // Logic for bApp to spend tokens
    }

    /**   @dev   Spending Settings */
    function setSpend(
        uint256 profileId_,
        uint256 amount_
    ) external override onlyProfileOwner(profileId_) {
        if (!_checkProfileHasEnough(profileId_, amount_)) revert BalanceToLow();
        _allowance[profileId_] = amount_;
        emit SetSpendAllowance(profileId_, amount_);
    }

    function setSpender(
        uint256 profileId_,
        uint256 spender_
    ) external override onlyProfileOwner(profileId_) {
        _spender[profileId_] = spender_;
        emit SetSpender(profileId_, spender_);
    }

    function removeSpend(
        uint256 profileId_
    ) external override onlyProfileOwner(profileId_) {
        _allowance[profileId_] = 0;
        emit SetSpendAllowance(profileId_, 0);
    }

    function removeSpender(
        uint256 profileId_
    ) external override onlyProfileOwner(profileId_) {
        _spender[profileId_] = 0;
        emit SetSpender(profileId_, 0);
    }

    /**     @dev    CROSS CHAIN   */

    function _receiveComplete(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal {
        Message memory message = abi.decode(any2EvmMessage.data, (Message));
    }

    function _messageSwitch(
        MessageActions action_,
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal {
        if (action_ == MessageActions.ERROR) _receiveError(any2EvmMessage);
        else if (action_ == MessageActions.DEPOSIT)
            _receiveDeposit(any2EvmMessage);
        else if (action_ == MessageActions.COMPLETE)
            _receiveComplete(any2EvmMessage);
    }

    function _receiveError(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal {
        Message memory message = abi.decode(any2EvmMessage.data, (Message));
    }

    function _receiveDeposit(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal returns (bool) {
        Message memory message = abi.decode(any2EvmMessage.data, (Message));
        _deposit[message.update_.profileId_] += message.value_;

        emit DepositedFunds(message.update_.profileId_, message.value_);
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

    /**  @dev   GETTERS         */

    function _getProfolesBalance(
        uint256 profileId_
    ) internal view returns (uint256) {
        return _deposit[profileId_];
    }

    function getProfilesBalance(
        uint256 profileId_
    ) external view override returns (uint256) {
        return _getProfolesBalance(profileId_);
    }

    function getSpendBalanceOfProfile(
        uint256 profileId_
    ) external view override returns (uint256) {
        return _allowance[profileId_];
    }
}
