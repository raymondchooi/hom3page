// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IBlockStore {
    //          CCIP Events
    // Event emitted when a message is sent to another chain.
    event MessageSent(
        bytes32 indexed messageId, // The unique ID of the CCIP message.
        uint64 indexed destinationChainSelector, // The chain selector of the destination chain.
        address receiver, // The address of the receiver on the destination chain.
        Sale payload, // The text being sent.
        address feeToken, // the token address used to pay CCIP fees.
        uint256 fees // The fees paid for sending the CCIP message.
    );

    event SaleSubmitted(bytes32 indexed messageId_, address buyer_);

    // Event emitted when a message is received from another chain.
    event MessageReceived(
        bytes32 indexed messageId, // The unique ID of the CCIP message.
        uint64 indexed sourceChainSelector, // The chain selector of the source chain.
        address sender, // The address of the sender from the source chain.
        SaleRecipe payload // The text that was received.
    );

    //          Sales Errors
    error OrderExceedsMaxAmount();
    error ToManyElementsInBuyArray();
    error OrderToLargeMax10();
    //          Sales Events

    event SaleMade(
        address indexed buyer_,
        uint256 indexed amount_,
        uint64 indexed chainId_
    );

    event SaleFailed(
        address indexed buyer_,
        uint64 indexed chainId_,
        bytes32 messageId_
    );

    struct SaleStore {
        Sale saleData_;
        bytes32 messageId_;
        bool saleComplete_;
        bool saleFailed_;
    }

    struct Sale {
        uint256[][] tokens_;
        uint256 totalItems_;
        address buyer_;
        bool multiBuy_;
    }

    struct SaleRecipe {
        bytes32 salesMessageId_;
        bool failed_;
    }

    function buyBlock(uint256[][] calldata tokenId_, bool multiBuy_) external;

    function withdrawFunds() external;

    function withdrawTokens(address tokenAddress_) external;

    function getSaleStatus(bytes32 saleId_) external returns (SaleStore memory);
}
