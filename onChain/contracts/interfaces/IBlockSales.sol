// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IBlockSales {
    //          CCIP Errors
    // Custom errors to provide more descriptive revert messages.
    error OrderExceedsMaxAmount();
    error ToManyElementsInBuyArray();
    error OrderToLargeMax10();

    //          CCIP Events
    // Event emitted when a message is sent to another chain.
    event MessageSent(
        bytes32 indexed messageId, // The unique ID of the CCIP message.
        uint64 indexed destinationChainSelector, // The chain selector of the destination chain.
        address receiver, // The address of the receiver on the destination chain.
        SaleRecipe payload, // The text being sent.
        address feeToken, // the token address used to pay CCIP fees.
        uint256 fees // The fees paid for sending the CCIP message.
    );

    // Event emitted when a message is received from another chain.
    event MessageReceived(
        bytes32 indexed messageId, // The unique ID of the CCIP message.
        uint64 indexed sourceChainSelector, // The chain selector of the source chain.
        address sender, // The address of the sender from the source chain.
        Sale payload // The text that was received.
    );

    struct SaleStore {
        Sale saleData_;
        bytes32 messageId_;
        bool saleComplete_;
        bool saleFailed_;
    }

    event SaleMade(
        address indexed buyer_,
        uint256 indexed amount_,
        uint64 indexed chainId_
    );

    struct Sale {
        uint256[][] tokens_;
        uint256 totalItems_;
        address buyer_;
        bool multiBuy_;
    }

    struct SaleRecipe {
        bytes32 salesMessageId_;
        bool failed;
    }

    function buyBlock(uint256 tokenId) external;

    function buyBatchBlock(uint256[][] calldata tokenIds_) external;

    function withdrawFunds() external payable;

    function withdrawTokens(address tokenAddress_) external;

    function withdrawBlock(uint256 tokenId_) external;
}
