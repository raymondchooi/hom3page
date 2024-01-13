// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "../node_modules/erc721a/contracts/ERC721A.sol";
import "./security/onlyActive.sol";

contract BlockToken is ERC721A, OnlyActive {
    uint256 constant MAX_SUPPLY = 1000;
    bool private _mintComplete;

    constructor() ERC721A("Hom3Page Block", "AZUKI") Ownable(_msgSender()) {}

    function mintAllBlocks(uint256 quantity) external {
        require(!_mintComplete);
        _mintComplete = true;
        _mint(msg.sender, quantity);
    }
}
