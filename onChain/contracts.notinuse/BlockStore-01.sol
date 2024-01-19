// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "../helpers/CCIPInterface.sol";
import {OnlyActive, Ownable} from "../security/onlyActive.sol";

contract BlockStore is CCIPInterface, ReentrancyGuard, OnlyActive, IBlockStore {
    //  Set token cost to 100 PAYMENT_TOKEN
    //  Var to track contract sales
    uint256 internal constant COST_PER_BLOCK = 100 * 10 ** 18; // PAYMENT_TOKEN
    uint8 internal constant BUY_CAP = 10;
    uint256 internal _totalSold;
    //  Contracts
    IERC20 public immutable PAYMENT_TOKEN;

    //  BlockSales Contract
    //  Optimism Goerli

    address private _salesContractAddress;

    mapping(bytes32 => SaleStore) _saleRecipes;

    fallback() external payable {}

    receive() external payable {}

    constructor(
        address router_,
        address PAYMENT_TOKENTokenAddress_,
        address blockSalesContract_,
        address linkToken_
    ) CCIPInterface(router_, linkToken_) Ownable(msg.sender) {
        PAYMENT_TOKEN = IERC20(PAYMENT_TOKENTokenAddress_);
        _salesContractAddress = blockSalesContract_;
        _setChainsActivity(SALES_CONTRACT_CHAIN, true);
        _setAllowedAddress(SALES_CONTRACT_CHAIN, blockSalesContract_);
    }

    function buyBlock(
        uint256 tokenId_
    ) external override nonReentrant is_active {
        require(
            PAYMENT_TOKEN.balanceOf(_msgSender()) > COST_PER_BLOCK,
            "Balance to low"
        );

        bool succsess = PAYMENT_TOKEN.transferFrom(
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
            while (totalOrder < BUY_CAP && index < numElements) {
                totalOrder += tokenIds_[index].length;
                index++;
            }
            if (totalOrder > BUY_CAP) revert OrderToLargeMax10();
        }

        uint256 cost = COST_PER_BLOCK * (totalOrder);
        require(
            PAYMENT_TOKEN.balanceOf(_msgSender()) >= cost,
            "Insufficient Funds"
        );
        bool succsess = PAYMENT_TOKEN.transferFrom(
            _msgSender(),
            address(this),
            cost
        );
        if (succsess) {}
    }

    function _startCrossChainPurchase(Sale memory saleData_) internal {
        bytes32 messageId = _sendMessage(
            SALES_CONTRACT_CHAIN,
            _salesContractAddress,
            saleData_
        );
        _saleRecipes[messageId] = SaleStore(saleData_, messageId, false, false);
    }

    /// @notice Sends data to receiver on the destination chain.
    /// @dev Assumes your contract has sufficient Native Token.
    /// @param chainId_ The identifier (aka selector) for the destination blockchain.
    /// @param receiver_ The address of the recipient on the destination blockchain.
    /// @param payload_ The string text to be sent.
    /// @return messageId The ID of the message that was sent.
    function _sendMessage(
        uint64 chainId_,
        address receiver_,
        Sale memory payload_
    ) internal onlyOwner returns (bytes32) {
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        Client.EVM2AnyMessage memory evm2AnyMessage = _buildMessage(
            receiver_,
            abi.encode(payload_),
            SALES_ORDER_GAS
        );

        // Send the CCIP message through the router and store the returned CCIP message ID
        (bytes32 messageId, uint256 fees) = _sendTX(chainId_, evm2AnyMessage);

        // Emit an event with message details
        emit MessageSent(
            messageId,
            chainId_,
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
        override
        onlyAllowlisted(
            any2EvmMessage.sourceChainSelector,
            abi.decode(any2EvmMessage.sender, (address))
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
            PAYMENT_TOKEN.transfer(
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

    function getSalesContractAddress() external view returns (address) {
        return _salesContractAddress;
    }

    function getSaleStatus(
        bytes32 saleId_
    ) external view override returns (SaleStore memory) {
        return _saleRecipes[saleId_];
    }

    function setSalesContractAddress(address newAddress_) external onlyOwner {
        _salesContractAddress = newAddress_;
        _setAllowedAddress(SALES_CONTRACT_CHAIN, newAddress_);
    }

    function setUseLinkForPaymentFlay(bool newSetting_) external onlyOwner {
        _setUseLinkForPaymentFlay(newSetting_);
    }

    function setAddressAsAllowed(
        uint64 chainId_,
        address contractAddress_
    ) public onlyOwner {
        _setAllowedAddress(chainId_, contractAddress_);
    }

    function setChainAllowed(uint64 chainId_, bool flag_) external onlyOwner {
        _setChainsActivity(chainId_, flag_);
    }

    function withdrawTokens(
        address withdrawAddress_,
        address tokenAddress_
    ) external override onlyOwner {
        IERC20 token = IERC20(tokenAddress_);
        uint balance = token.balanceOf(address(this));
        token.transfer(withdrawAddress_, balance);
    }

    function withdrawFunds(
        address payable withdrawAddress_
    ) external payable override onlyOwner {
        uint256 balance = address(this).balance;
        (bool sent, bytes memory data) = withdrawAddress_.call{value: balance}(
            ""
        );
        require(sent, "Failed to send Ether");
    }
}
