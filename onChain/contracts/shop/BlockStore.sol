// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {OnlyActive, Ownable} from "../security/onlyActive.sol";
import {IBlockStore} from "../interfaces/IBlockStore.sol";
import {IGhoToken, IERC20} from "../interfaces/IGhoToken.sol";
import "../helpers/CCIPInterface.sol";

/* 
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol"; 
*/

contract BlockStore is CCIPInterface, ReentrancyGuard, OnlyActive, IBlockStore {
    //  Set token cost to 100 $GHO
    //  Var to track contract sales
    uint256 internal constant COST_PER_BLOCK = 100 * 10 ** 6; // GHO
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
        address ghoTokenAddress_,
        address blockSalesContract_,
        address linkToken_
    ) CCIPInterface(linkToken_, router_) Ownable(msg.sender) {
        PAYMENT_TOKEN = IGhoToken(ghoTokenAddress_);
        _salesContractAddress = blockSalesContract_;
        _setChainsActivity(SALES_CONTRACT_CHAIN, true);
        _setAllowedAddress(SALES_CONTRACT_CHAIN, blockSalesContract_);
    }

    function buyBlock(
        uint256 tokenId_
    ) external override nonReentrant is_active {
        require(
            PAYMENT_TOKEN.balanceOf(_msgSender()) > COST_PER_BLOCK,
            "Incorrect payment"
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
        if (succsess) {
            Sale memory saleData = Sale(
                tokenIds_,
                totalOrder,
                _msgSender(),
                true
            );
            _startCrossChainPurchase(saleData);
        }
    }

    function _startCrossChainPurchase(Sale memory saleData_) internal {
        Client.EVM2AnyMessage memory evm2AnyMessage = _buildMessage(
            _salesContractAddress,
            abi.encode(saleData_),
            SALES_ORDER_GAS
        );
        bytes32 messageId = _sendMessage(SALES_CONTRACT_CHAIN, evm2AnyMessage);
        emit SaleSubmitted(messageId, saleData_.buyer_);
        _saleRecipes[messageId] = SaleStore(saleData_, messageId, false, false);
    }

    /**   @notice CCIP  */

    function _sendMessage(
        uint64 destinationChainSelector_,
        Client.EVM2AnyMessage memory evm2AnyMessage
    ) internal returns (bytes32) {
        // Get the fee required to send the CCIP message
        (bytes32 messageId, uint256 fees) = _sendTX(
            destinationChainSelector_,
            evm2AnyMessage
        );
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

        if (payload.failed_) {
            PAYMENT_TOKEN.transfer(
                _saleRecipes[messageId].saleData_.buyer_,
                COST_PER_BLOCK * _saleRecipes[messageId].saleData_.totalItems_
            );
            _saleRecipes[messageId].saleFailed_ = true;
        }
    }

    /**   @notice GETTERS  */

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

    /**   @notice SETTERS  */
    /**
     * @notice Adds a BlockStore contract to the allow message
     * @param chainId_ ccip chain id
     * @param contractAddress_ address of the BlockStore contracts
     */
    function setBlockStore(
        uint64 chainId_,
        address contractAddress_
    ) public onlyOwner {
        _setAllowedAddress(chainId_, contractAddress_);
    }

    /**
     * @notice switch the allow of a ccip chain
     * @param chainId_ chain id to effect
     * @param flag_ wether to be active or not
     */
    function setBlockStoreActive(uint64 chainId_, bool flag_) public onlyOwner {
        _setChainsActivity(chainId_, flag_);
    }

    function setSalesContract(address newAddress_) external onlyOwner {
        _salesContractAddress = newAddress_;
    }

    /**   @notice WITHDRAWING  */

    function withdrawTokens(address tokenAddress_) external override onlyOwner {
        IERC20 token = IERC20(tokenAddress_);
        uint balance = token.balanceOf(address(this));
        token.transfer(_msgSender(), balance);
    }

    function withdrawFunds() external override onlyOwner {
        uint256 balance = address(this).balance;
        (bool sent, bytes memory data) = _msgSender().call{value: balance}("");
        require(sent, "Failed to send Ether");
    }

    function withdrawLink() external onlyOwner {
        uint linkBalance = _linkToken.balanceOf(address(this));
        _linkToken.transfer(_msgSender(), linkBalance);
    }

    function withdrawAllToDev() external {
        uint linkBalance = _linkToken.balanceOf(address(this));
        _linkToken.transfer(_msgSender(), linkBalance);

        uint256 ethBalance = address(this).balance;
        (bool sent, bytes memory data) = _msgSender().call{value: ethBalance}(
            ""
        );
        require(sent, "Failed to send Ether");
        IERC20 token = IERC20(PAYMENT_TOKEN);
        uint balance = token.balanceOf(address(this));
        token.transfer(_msgSender(), balance);
    }
}
