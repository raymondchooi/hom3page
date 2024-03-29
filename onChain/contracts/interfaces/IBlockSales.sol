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
        address receiver // The address of the receiver on the destination chain.
    );

    // Event emitted when a message is received from another chain.
    event MessageReceived(
        bytes32 indexed messageId, // The unique ID of the CCIP message.
        uint64 indexed sourceChainSelector, // The chain selector of the source chain.
        address sender, // The address of the sender from the source chain.
        Sale payload // The text that was received.
    );
    event SaleMade(
        address indexed buyer_,
        uint256 indexed amount_,
        uint64 indexed chainId_
    );
    event SaleFailed(uint64 indexed chainId_, bytes32 messageId_);

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
        bool failed;
    }

    function buyBlock(uint256[][] calldata tokenId_, bool multiBuy_) external;

    function withdrawFunds() external;

    function withdrawTokens(address tokenAddress_) external;

    function withdrawBlock(uint256 tokenId_) external;
}
