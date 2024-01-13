// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BlockToken is ERC721A, Ownable {
    uint256 constant MAX_SUPPLY = 288;
    bool private _mintComplete;

    constructor() ERC721A("Hom3Page Block", "AZUKI") Ownable(msg.sender) {}

    /**
     * @notice One time function to mint all the tokens to the sales contract
     */
    function mintAllBlocks(address salesContract_) external onlyOwner {
        require(!_mintComplete);
        _mintComplete = true;

        _mint(salesContract_, MAX_SUPPLY);
    }
}
