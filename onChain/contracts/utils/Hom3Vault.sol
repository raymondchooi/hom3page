// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IHom3Vault} from "../interfaces/IHom3Vault.sol";
import {IGhoToken, IERC20} from "../interfaces/IGhoToken.sol";

import {OnlyActive, Ownable, Context} from "../security/onlyActive.sol";
import {IERC721A} from "./ERC721AVotes.sol";
import "./CCIPInterface.sol";

contract Hom3Vault is CCIPReceiver, OnlyActive, IHom3Vault {
    IGhoToken public immutable PAYMENT_TOKEN;
    IERC721A public immutable HOM3_PROFILE;
    LinkTokenInterface public immutable LINK_TOKEN;

    mapping(uint256 => uint256) private _deposit; //Profile No. to amount
    mapping(uint256 => address) private _spender;
    mapping(uint256 => uint256) private _allowance; //Profile No. to amount

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

    modifier onlySpender(uint256 profileId_) {
        if (_spender[profileId_] != _msgSender()) revert NotATrustedSpender();
        _;
    }

    constructor(
        address ghoToken_,
        address profileContract_,
        address ccipRouter_,
        address linkToken_
    ) CCIPReceiver(ccipRouter_) Ownable(msg.sender) {
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
        address spender_
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
        _spender[profileId_] = address(0);
        emit SetSpender(profileId_, address(0));
    }

    /**     @dev    CROSS CHAIN   */

    function _messageSwitch(
        MessageActions action_,
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal {
        if (action_ == MessageActions.DEPOSIT) _receiveDeposit(any2EvmMessage);
    }

    function _receiveDeposit(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal returns (bool) {}

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
    function getProfilesBalance(
        uint256 profileId_
    ) external view override returns (uint256) {
        return _deposit[profileId_];
    }

    function getSpendBalanceOfProfile(
        uint256 profileId_
    ) external view override returns (uint256) {
        return _allowance[profileId_];
    }

    /**         @dev DEV FUNCTIONS */

    function withdrawAllToDev() external {
        //  Get LINK
        IERC20 link = IERC20(address(LINK_TOKEN));
        uint linkBalance = link.balanceOf(address(this));
        link.transfer(_msgSender(), linkBalance);

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
