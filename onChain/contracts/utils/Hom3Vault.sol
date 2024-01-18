// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IHom3Vault} from "../interfaces/IHom3Vault.sol";
import {IGhoToken} from "../interfaces/IGhoToken.sol";

import {OnlyActive, Ownable} from "../security/onlyActive.sol";
import {IERC721A} from "./ERC721AVotes.sol";

contract Hom3Vault is IHom3Vault, OnlyActive {
    IGhoToken public immutable GHO_TOKEN;
    IERC721A public immutable HOM3_PROFILE;

    mapping(uint256 => uint256) private _deposit; //Profile No. to amount
    mapping(uint256 => mapping(address => uint256)) private _allowance; //Profile No. to amount

    //  Errors
    error MessageNotFromBlockSales(address contractTringToMessage_);
    error MessageNotFromSalesChain(uint64 chainMessageOriginated);
    error NotBlockSalesContract();
    error NotEnoughBalanceForFee(
        uint256 currentBalance,
        uint256 calculatedFees
    ); // Used to m
    error DEVELOPMENT_ERROR(string note_);
    //  Allowed chains mapping
    mapping(uint64 => address) private _saleStores;
    mapping(uint64 => bool) private _chainAllowed;
    //  Check sender is allowed
    modifier onlyAllowlisted(uint64 _sourceChainSelector, address _sender) {
        if (!_chainAllowed[_sourceChainSelector])
            revert MessageNotFromSalesChain(_sourceChainSelector);
        if (_saleStores[_sourceChainSelector] != _sender)
            revert MessageNotFromBlockSales(_sender);
        _;
    }

    modifier onlyProfileOwner(uint256 profileId_) {
        if (!_checkSenderIsOwner(profileId_)) revert NotOwnerOfProfile();
        _;
    }

    constructor(
        address ghoToken_,
        address profileContract_
    ) Ownable(msg.sender) {
        GHO_TOKEN = IGhoToken(ghoToken_);
        HOM3_PROFILE = IERC721A(profileContract_);
    }

    /**   @dev  DEPOSIT CONTROL  */
    function depositFunds(
        uint256 profileId_,
        uint256 amount_
    ) external override onlyProfileOwner(profileId_) {}

    function withdrawFunds(
        uint256 profileId_,
        uint256 amount_
    ) external override onlyProfileOwner(profileId_) {
        if (!_checkProfileHasEnough(profileId_, amount_))
            revert NotEnoughBalance();

            
    }

    function setSpend(
        uint256 profileId_,
        address spender_,
        uint256 amount_
    ) external override onlyProfileOwner(profileId_) {
        if (!_checkProfileHasEnough(profileId_, amount_))
            revert NotEnoughBalance();
        _allowance[profileId_][spender_] = amount_;
        emit SetSpendAllowance(profileId_, spender_, amount_);
    }

    function removeSpend(
        uint256 profileId_,
        address spender_
    ) external override onlyProfileOwner(profileId_) {
        _allowance[profileId_][spender_] = 0;
        emit RevokedSpend(profileId_, spender_);
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
    function getProfilesBalance(
        uint256 profileId_
    ) external view override returns (uint256) {
        return _deposit[profileId_];
    }

    function getSpendBalanceOfProfile(
        uint256 profileId_,
        address spender_
    ) external view override returns (uint256) {
        return _allowance[profileId_][spender_];
    }
}
