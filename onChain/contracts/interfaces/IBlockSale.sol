// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IBlockSale {
    error OrderExceedsMaxAmount();
    error ToManyElementsInBuyArray();
    error OrderToLargeMax10();

    event SaleMade(address indexed buyer_, uint256 indexed amount_);

    function buyBlock(uint256 tokenId) external;

    function buyBatchBlock(uint256[][] calldata tokenIds_) external;

    function withdrawFunds(address withdrawAddress_) external;

    function withdrawBlock(address withdrawAddress_, uint256 tokenId_) external;
}
