// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Base Contracts
import {Votes, EIP712, ERC721AVotes, ERC721A} from "../utils/ERC721AVotes.sol";
import "../interfaces/IBlockToken.sol";
// Security
import "../security/onlyActive.sol";

// Extentions

contract BlockToken is ERC721AVotes, OnlyActive, IBlockToken {
    uint256 constant MAX_SUPPLY = 288;
    bool private _mintComplete;

    /**
     * @param name_ Name of the Token
     * @param symbol_ Symbol or Ticker
     * @param version_ Version of teh contract
     */
    constructor(
        string memory name_,
        string memory symbol_,
        string memory version_
    ) ERC721A(name_, symbol_) Ownable(msg.sender) EIP712(name_, version_) {}

    /**
     * @notice One time function to mint all the tokens to the sales contract
     */
    function mintAllBlocks(address salesContract_) external override onlyOwner {
        require(!_mintComplete, "Mint already happened");
        _mintComplete = true;

        _mint(salesContract_, MAX_SUPPLY);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return "override uri";
    }
}
