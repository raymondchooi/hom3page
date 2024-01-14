// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "erc721a/contracts/ERC721A.sol";
import "../security/onlyActive.sol";

contract stINRWLToken is ERC721A, OnlyActive {
    mapping(uint256 => uint256) internal _motherBlockNumberToWrapped;

    constructor()
        ERC721A("Hom3Page Innerwall Generator", "stINRWL")
        Ownable(msg.sender)
    {}

    function mint() external onlyOwner {

    }
}
