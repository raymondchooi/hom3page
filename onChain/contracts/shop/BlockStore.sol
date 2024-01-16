// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {OnlyActive, Ownable} from "../security/onlyActive.sol";
import {IBlockStore} from "../interfaces/IBlockStore.sol";
import {IGhoToken, IERC20} from "../interfaces/IGhoToken.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";

contract BlockStore is CCIPReceiver, ReentrancyGuard, OnlyActive, IBlockStore {
    //  Set token cost to 100 $GHO
    //  Var to track contract sales
    uint256 internal constant COST_PER_BLOCK = 100 * 10 ** 6; // USDC
    uint256 internal _totalSold;
    //  Contracts
    IRouterClient private s_router;
    LinkTokenInterface private s_linkToken;
    IGhoToken public immutable GHO;

    //  BlockSales Contract
    //  Optimism Goerli
    uint64 constant SALES_CONTRACT_CHAIN = 2664363617261496610;
    address immutable SALES_CONTRACT_ADDRESS;

    mapping(bytes32 => SaleStore) _saleRecipes;

    modifier onlySalesContract(address sender_, uint64 chain_) {
        if (sender_ != SALES_CONTRACT_ADDRESS)
            revert MessageNotFromBLockSales(sender_);
        if (chain_ != SALES_CONTRACT_CHAIN)
            revert MessageNotFromSalesChain(chain_);
        _;
    }

    fallback() external payable {}

    receive() external payable {}

    constructor(
        address router_,
        address ghoTokenAddress_,
        address blockSalesContract_
    ) CCIPReceiver(router_) Ownable(msg.sender) {
        s_router = IRouterClient(router_);
        GHO = IGhoToken(ghoTokenAddress_);
        SALES_CONTRACT_ADDRESS = blockSalesContract_;
    }

    function buyBlock(
        uint256 tokenId_
    ) external override nonReentrant is_active {
        require(
            GHO.balanceOf(_msgSender()) > COST_PER_BLOCK,
            "Incorrect payment"
        );

        bool succsess = GHO.transferFrom(
            _msgSender(),
            address(this),
            COST_PER_BLOCK
        );
        if (succsess) {
            unchecked {
                uint256[] memory batch = new uint256[](1);
                batch[0] = tokenId_;
                uint256[][] memory order = new uint256[][](1);
                order[0] = batch;

                Sale memory saleData = Sale(order, 1, _msgSender(), false);
                _startCrossChainPurchase(saleData);
            }
        }
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

    function _startCrossChainPurchase(Sale memory saleData_) internal {
        bytes32 messageId = _sendMessage(
            SALES_CONTRACT_CHAIN,
            SALES_CONTRACT_ADDRESS,
            saleData_
        );
        _saleRecipes[messageId] = SaleStore(saleData_, messageId, false, false);
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
        Sale memory payload_
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

    /// @notice Construct a CCIP message.
    /// @dev This function will create an EVM2AnyMessage struct with all the necessary information for sending a text.
    /// @param receiver_ The address of the receiver.
    /// @param payload_ The string data to be sent.
    /// @param feeTokenAddress_ The address of the token used for fees. Set address(0) for native gas.
    /// @return Client.EVM2AnyMessage Returns an EVM2AnyMessage struct which contains information for sending a CCIP message.
    function _buildCCIPMessage(
        address receiver_,
        Sale memory payload_,
        address feeTokenAddress_
    ) internal pure returns (Client.EVM2AnyMessage memory) {
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        return
            Client.EVM2AnyMessage({
                receiver: abi.encode(receiver_), // ABI-encoded receiver address
                data: abi.encode(payload_),
                tokenAmounts: new Client.EVMTokenAmount[](0), // Empty array aas no tokens are transferred
                extraArgs: Client._argsToBytes(
                    // Additional arguments, setting gas limit
                    Client.EVMExtraArgsV1({gasLimit: 200_000})
                ),
                // Set the feeToken to a feeTokenAddress, indicating specific asset will be used for fees
                feeToken: feeTokenAddress_
            });
    }

    /// handle a received message
    function _ccipReceive(
        Client.Any2EVMMessage memory any2EvmMessage
    )
        internal
        override
        onlySalesContract(
            abi.decode(any2EvmMessage.sender, (address)),
            any2EvmMessage.sourceChainSelector
        )
    {
        bytes32 messageId = any2EvmMessage.messageId; // fetch the messageId
        SaleRecipe memory payload = abi.decode(
            any2EvmMessage.data,
            (SaleRecipe)
        );

        // will remove after test
        emit MessageReceived(
            messageId,
            any2EvmMessage.sourceChainSelector, // fetch the source chain identifier (aka selector)
            abi.decode(any2EvmMessage.sender, (address)), // abi-decoding of the sender address,
            payload
        );
        _saleRecipes[messageId].saleComplete_ = true;

        if (payload.success) {
            _saleRecipes[messageId].saleFailed_ = false;
        } else {
            GHO.transfer(
                _saleRecipes[messageId].saleData_.buyer_,
                COST_PER_BLOCK * _saleRecipes[messageId].saleData_.totalItems_
            );
        }
    }

    function getBlockCost() public pure returns (uint256) {
        return COST_PER_BLOCK;
    }

    function getTotalSold() public view returns (uint256) {
        return _totalSold;
    }

    function withdrawFunds(
        address withdrawAddress_,
        address tokenAddress_
    ) external override onlyOwner {
        IERC20 token = IERC20(tokenAddress_);
        uint balance = token.balanceOf(address(this));
        token.transfer(withdrawAddress_, balance);
    }

    function getSaleStatus(
        bytes32 saleId_
    ) external view override returns (SaleStore memory) {
        return _saleRecipes[saleId_];
    }
}
