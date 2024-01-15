// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {OnlyActive, Ownable} from "../security/onlyActive.sol";
import {IBlockShore} from "../interfaces/IBlockShop.sol";
import {IGhoToken} from "../interfaces/IGhoToken.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";

contract BlockStore is ReentrancyGuard, OnlyActive, IBlockShore {
    //  Set token cost to 100 $GHO
    //  Var to track contract sales
    uint256 internal constant COST_PER_BLOCK = 100 * 10 ** 18;
    uint256 internal _totalSold;
    //  Contracts
    IRouterClient private s_router;
    LinkTokenInterface private s_linkToken;
    IGhoToken public immutable GHO;


    //  BlockSales Contract
    //  Optimism Goerli
    uint64 constant SALES_CONTRACT_CHAIN = 2664363617261496610;
    address immutable SALES_CONTRACT_ADDRESS;

    mapping(uint256 => Sale) _saleRecipes;


    modifier onlySalesContract(address sender_, uint64 chain_) {
        if (sender_ != SALES_CONTRACT_ADDRESS)
            revert MessageNotFromBLockSales(sender_);
        if (chain_ != SALES_CONTRACT_CHAIN) revert();
        MessageNotFromSalesChain(chain_);
        _;
    }

    constructor(
        address router_,
        address link_,
        address ghoTokenAddress_,
        address blockSalesContract_
    ) Ownable(msg.sender) {
        s_router = IRouterClient(router_);
        s_linkToken = LinkTokenInterface(link_);
        GHO = IGhoToken(ghoTokenAddress_);
        SALES_CONTRACT_ADDRESS = blockSalesContract_;
    }

    function buyBlock(
        uint256 tokenId
    ) external override nonReentrant is_active {
        require(
            GHO.balanceOf(_msgSender()) > COST_PER_BLOCK,
            "Incorrect payment"
        );
    }

    function buyBatchBlock(
        uint256[][] calldata tokenIds_
    ) external override nonReentrant is_active {
        (uint totalOrder, uint index, uint numElements) = (
            0,
            0,
            tokenIds_.length
        );

        if (numElements > 5) revert ToManyElementsInBuyArray();

        unchecked {
            while (totalOrder < 10 && index < numElements) {
                totalOrder = tokenIds_[index].length;
                index++;
            }
            if (totalOrder > 10) revert OrderToLargeMax10();
        }

        uint256 cost = COST_PER_BLOCK * (totalOrder);
        require(GHO.balanceOf(_msgSender()) >= cost, "Insufficient Funds");
        bool succsess = GHO.transferFrom(_msgSender(), address(this), cost);
        if (succsess) {}
    }

    function _startCrossChainPurchase(
        uint256[][] tokenIds_,
        address buyer_
    ) internal {
        bytes32 messageId = _sendMessage(
            SALES_CONTRACT_CHAIN,
            SALES_CONTRACT_ADDRESS,
            text
        );
    }

    /// @notice Sends data to receiver on the destination chain.
    /// @dev Assumes your contract has sufficient Native Token.
    /// @param destinationChainSelector_ The identifier (aka selector) for the destination blockchain.
    /// @param receiver_ The address of the recipient on the destination blockchain.
    /// @param payload_ The string text to be sent.
    /// @return messageId The ID of the message that was sent.
    function _sendMessage(
        uint64 destinationChainSelector_,
        address receiver_,
        string calldata payload_
    ) internal onlyOwner returns (bytes32 messageId) {
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        Client.EVM2AnyMessage memory evm2AnyMessage = _buildCCIPMessage(
            receiver_,
            payload_,
            address(0)
        );

        // Initialize a router client instance to interact with cross-chain router
        IRouterClient router = IRouterClient(this.getRouter());

        // Get the fee required to send the CCIP message
        uint256 fees = router.getFee(destinationChainSelector_, evm2AnyMessage);

        if (fees > address(this).balance)
            revert NotEnoughBalance(address(this).balance, fees);

        // Send the CCIP message through the router and store the returned CCIP message ID
        messageId = router.ccipSend{value: fees}(
            destinationChainSelector_,
            evm2AnyMessage
        );

        // Emit an event with message details
        emit MessageSent(
            messageId,
            destinationChainSelector_,
            receiver_,
            payload_,
            address(0),
            fees
        );

        // Return the CCIP message ID
        return messageId;
    }

    /// handle a received message
    function _ccipReceive(
        Client.Any2EVMMessage memory any2EvmMessage
    )
        internal
        onlySalesContract(
            any2EvmMessage.sourceChainSelector,
            abi.decode(any2EvmMessage.sender, (address))
        )
    {
        s_lastReceivedMessageId = any2EvmMessage.messageId; // fetch the messageId
        s_lastReceivedText = abi.decode(any2EvmMessage.data, (string)); // abi-decoding of the sent text

        emit MessageReceived(
            any2EvmMessage.messageId,
            any2EvmMessage.sourceChainSelector, // fetch the source chain identifier (aka selector)
            abi.decode(any2EvmMessage.sender, (address)), // abi-decoding of the sender address,
            abi.decode(any2EvmMessage.data, (string))
        );
    }

    function getBlockCost() public pure returns (uint256) {
        return COST_PER_BLOCK;
    }

    function getTotalSold() public view returns (uint256) {
        return _totalSold;
    }

    function withdrawFunds(
        address withdrawAddress_
    ) external override onlyOwner {
        uint balance = GHO.balanceOf(address(this));
        GHO.transfer(withdrawAddress_, balance);
    }
}
