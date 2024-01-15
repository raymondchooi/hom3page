// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "../security/onlyActive.sol";
import "../interfaces/IBlockSale.sol";

import {IGhoToken} from "../interfaces/IGhoToken.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";

contract BlockStore is ReentrancyGuard, OnlyActive {
    //  Set token cost to 100 $GHO
    //  Var to track contract sales
    uint256 internal constant COST_PER_BLOCK = 100 * 10 ** 18;
    uint256 internal _totalSold;
    //  Contracts
    IRouterClient private s_router;
    LinkTokenInterface private s_linkToken;
    IGhoToken public immutable GHO;

    //          CCIP DEMO FUNCTIONS
    // Custom errors to provide more descriptive revert messages.
    error NotEnoughBalance(uint256 currentBalance, uint256 calculatedFees); // Used to make sure contract has enough balance.
    // Event emitted when a message is sent to another chain.
    event MessageSent(
        bytes32 indexed messageId, // The unique ID of the CCIP message.
        uint64 indexed destinationChainSelector, // The chain selector of the destination chain.
        address receiver, // The address of the receiver on the destination chain.
        string text, // The text being sent.
        address feeToken, // the token address used to pay CCIP fees.
        uint256 fees // The fees paid for sending the CCIP message.
    );

    constructor(
        address router_,
        address link_,
        address ghoTokenAddress_
    ) Ownable(msg.sender) {
        s_router = IRouterClient(router_);
        s_linkToken = LinkTokenInterface(link_);
        GHO = IGhoToken(ghoTokenAddress_);
    }

    function buyBlock(uint256 tokenId) external nonReentrant is_active {}

    function buyBatchBlock(
        uint256[][] calldata tokenIds_
    ) external nonReentrant is_active {}

    /// @notice Sends data to receiver on the destination chain.
    /// @dev Assumes your contract has sufficient LINK.
    /// @param destinationChainSelector The identifier (aka selector) for the destination blockchain.
    /// @param receiver The address of the recipient on the destination blockchain.
    /// @param text The string text to be sent.
    /// @return messageId The ID of the message that was sent.
    function _sendMessage(
        uint64 destinationChainSelector,
        address receiver,
        string calldata text
    ) internal onlyOwner returns (bytes32 messageId) {
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        Client.EVM2AnyMessage memory evm2AnyMessage = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver), // ABI-encoded receiver address
            data: abi.encode(text), // ABI-encoded string
            tokenAmounts: new Client.EVMTokenAmount[](0), // Empty array indicating no tokens are being sent
            extraArgs: Client._argsToBytes(
                // Additional arguments, setting gas limit
                Client.EVMExtraArgsV1({gasLimit: 200_000})
            ),
            // Set the feeToken  address, indicating LINK will be used for fees
            feeToken: address(s_linkToken)
        });

        // Get the fee required to send the message
        uint256 fees = s_router.getFee(
            destinationChainSelector,
            evm2AnyMessage
        );

        if (fees > s_linkToken.balanceOf(address(this)))
            revert NotEnoughBalance(s_linkToken.balanceOf(address(this)), fees);

        // approve the Router to transfer LINK tokens on contract's behalf. It will spend the fees in LINK
        s_linkToken.approve(address(s_router), fees);

        // Send the message through the router and store the returned message ID
        messageId = s_router.ccipSend(destinationChainSelector, evm2AnyMessage);

        // Emit an event with message details
        emit MessageSent(
            messageId,
            destinationChainSelector,
            receiver,
            text,
            address(s_linkToken),
            fees
        );

        // Return the message ID
        return messageId;
    }

    function getBlockCost() public pure returns (uint256) {
        return COST_PER_BLOCK;
    }

    function getTotalSold() public view returns (uint256) {
        return _totalSold;
    }

    function withdrawFunds(address withdrawAddress_) external onlyOwner {
        uint balance = GHO.balanceOf(address(this));
        GHO.transfer(withdrawAddress_, balance);
    }
}
