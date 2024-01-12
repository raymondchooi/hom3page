// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "erc721a/contracts/ERC721A.sol";

import "./security/onlyActive.sol";

contract BlockToken is ERC721A, OnlyActive {
    constructor() ERC721A("Hom3Page Block", "AZUKI") {}

    function mint(uint256 quantity) external payable {
        // `_mint`'s second argument now takes in a `quantity`, not a `tokenId`.
        _mint(msg.sender, quantity);
    }
}
