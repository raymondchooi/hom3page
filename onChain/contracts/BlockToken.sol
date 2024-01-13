// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Base Contracts
import "erc721a/contracts/ERC721A.sol";
// Security
import "./security/onlyActive.sol";
// Extentions
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Votes.sol";

contract BlockToken is ERC721A, ERC721Votes, OnlyActive {
    uint256 constant MAX_SUPPLY = 288;
    bool private _mintComplete;

    mapping(uint256 => address) internal _innerWall;

    constructor() ERC721A("Hom3Page Block", "AZUKI") Ownable(msg.sender) {}

    /**
     * @notice One time function to mint all the tokens to the sales contract
     */
    function mintAllBlocks(address salesContract_) external onlyOwner {
        require(!_mintComplete);
        _mintComplete = true;

        _mint(salesContract_, MAX_SUPPLY);
    }

    function mintInnerWall(uint256 blockId_) external is_active {
        // Allow the block owner to mint an inner wall.
        // Will deploy a new BLock contract fron a factory.
    }
}
