// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../interfaces/IHom3Profile.sol";
import {OnlyActive, Ownable, Context} from "../security/onlyActive.sol";
import {ERC721, ERC721Votes} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Votes.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

contract Hom3ProfileToken is ERC721Votes, OnlyActive, IHom3ProfileToken {
    IERC20 public immutable PAYMENT_TOKEN;
    address public immutable LENS_PROTOCOL;
    uint256 public constant COST_PER_PROFILE = 100 * 10 ** 6; // USD
    uint8 public constant BUY_CAP = 1;

    uint256 private _profilesMinted;
    mapping(uint256 => uint256) internal _lensProfileMatcher;

    constructor(
        string memory name_,
        string memory symbol_,
        string memory version_,
        address paymentToken_,
        address lensProtocol_
    ) ERC721(name_, symbol_) EIP712(name_, version_) Ownable(msg.sender) {
        PAYMENT_TOKEN = IERC20(paymentToken_);
        LENS_PROTOCOL = 0x4fbffF20302F3326B20052ab9C217C44F6480900;
    }

    modifier onlyProfileOwner(uint256 profileId_) {
        if (_ownerOf(profileId_) != _msgSender()) revert NotOwnerOfProfile();
        _;
    }

    modifier onlyOnePerWallet(address buyer_) {
        if (!_checkCanBuy(buyer_)) revert OneProfilePerAccount();
        _;
    }

    /**
     * @dev Add logic for checking One-per-wallet on transfers
     */
    function transferFrom(
        address from_,
        address to_,
        uint256 tokenId_
    ) public virtual override(ERC721) onlyOnePerWallet(to_) {
        super.transferFrom(from_, to_, tokenId_);
    }

    function safeTransferFrom(
        address from_,
        address to_,
        uint256 tokenId_,
        bytes memory data_
    ) public virtual override(ERC721) onlyOnePerWallet(to_) {
        super.safeTransferFrom(from_, to_, tokenId_, data_);
    }

    function mintProfile(
        address owner_
    ) external override is_active onlyOnePerWallet(owner_) {
        require(
            PAYMENT_TOKEN.balanceOf(_msgSender()) > COST_PER_PROFILE,
            "Incorrect Payment"
        );

        bool succsess = PAYMENT_TOKEN.transferFrom(
            _msgSender(),
            address(this),
            COST_PER_PROFILE
        );

        if (succsess) {
            uint256 tokenId = _profilesMinted + 1;
            _mint(owner_, tokenId);
            emit ProfileCreated(owner_, tokenId);
        } else revert("Payment Failed");
    }

    function signUpWithLens(
        address owner_,
        uint256 lensProfileId_
    ) external override is_active {
        require(
            PAYMENT_TOKEN.balanceOf(_msgSender()) > COST_PER_PROFILE,
            "Incorrect Payment"
        );

        bool succsess = PAYMENT_TOKEN.transferFrom(
            _msgSender(),
            address(this),
            COST_PER_PROFILE
        );

        if (succsess) {
            uint256 tokenId = _profilesMinted + 1;
            _mint(owner_, tokenId);
            emit ProfileCreated(owner_, tokenId);
        } else revert("Payment Failed");
    }

    function assignLensProfile(
        uint256 profileId_,
        uint256 lensProfileId_
    ) external onlyProfileOwner(profileId_) {
        _lensProfileMatcher[profileId_] = lensProfileId_;
    }

    function _checkCanBuy(address buyer_) internal view returns (bool) {
        if (balanceOf(buyer_) > 0) return false;
        return true;
    }

    /**
     * @dev this is only for inital testing phases
     * @param tokenId tokenId to get URI of
     */
    function tokenURI(
        uint256 tokenId
    ) public view virtual override(ERC721) returns (string memory) {
        if (_ownerOf(tokenId) != address(0)) revert("Token DOesnt Excist");

        return _baseURI();
    }

    /**
     * @notice Set the base URI address for all tokens
     * @dev replace this for real deployments
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return
            "https://hom3page.vercel.app/metadata/blockTokenHoldingMetadata.json";
    }

    function getTotalProfilesCreated() external view returns (uint256) {
        return _profilesMinted;
    }
}
