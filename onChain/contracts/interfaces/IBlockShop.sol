// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IBlockShop {
    error OrderExceedsMaxAmount();
    error ToManyElementsInBuyArray();
    error OrderToLargeMax10();

    event SaleMade(
        address indexed buyer_,
        uint256 indexed amount_,
        uint64 indexed chainId_
    );

    function buyBlock(uint256 tokenId) external;

    function buyBatchBlock(uint256[][] calldata tokenIds_) external;

    function withdrawFunds(address withdrawAddress_) external;
}
