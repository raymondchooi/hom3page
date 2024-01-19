// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "../security/onlyActive.sol";
import "../interfaces/IBlockSales.sol";
import {IGhoToken} from "../interfaces/IGhoToken.sol";
import "../helpers/CCIPInterface.sol";

contract BlockSales is CCIPInterface, ReentrancyGuard, OnlyActive, IBlockSales {
    IERC721 public immutable NFT;
    IERC20 public immutable PAYMENT_TOKEN;

    mapping(uint64 => address) private _saleStores;

    //  Sales
    uint256 internal constant COST_PER_BLOCK = 100 * 10 ** 6; // USD
    uint8 internal constant BUY_CAP = 10;

    uint256 internal _totalSold;

    constructor(
        address NFTAddress_,
        address paymentToken_,
        address ccipRouter_,
        address linkToken_
    ) CCIPInterface(linkToken_, ccipRouter_) Ownable(msg.sender) {
        NFT = IERC721(NFTAddress_);
        PAYMENT_TOKEN = IERC20(paymentToken_);
    }

    fallback() external payable {}

    receive() external payable {}

    /** @notice SALES MECHANICS */
    function buyBlock(
        uint256 tokenId
    ) external override nonReentrant is_active {
        require(NFT.ownerOf(tokenId) == address(this), "Token not available");
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
            NFT.transferFrom(address(this), _msgSender(), tokenId);
            _totalSold++;
            emit SaleMade(_msgSender(), 1, OP_CHAIN_SELECTOR);
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
            for (uint i = 0; i < numElements; i++) {
                for (uint x = 0; x < tokenIds_[i].length; x++)
                    NFT.transferFrom(
                        address(this),
                        msg.sender,
                        tokenIds_[i][x]
                    );
            }
            _totalSold += totalOrder;
            emit SaleMade(_msgSender(), totalOrder, OP_CHAIN_SELECTOR);
        }
    }

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
        bytes32 messageId = any2EvmMessage.messageId;
        uint64 chainId = any2EvmMessage.sourceChainSelector;
        Sale memory payload = abi.decode(any2EvmMessage.data, (Sale));

        if (!payload.multiBuy_) {
            if (NFT.ownerOf(payload.tokens_[0][0]) != address(this))
                _returnSalesError(
                    SaleRecipe(messageId, true),
                    chainId,
                    payload.buyer_
                );
            else {
                NFT.transferFrom(
                    address(this),
                    payload.buyer_,
                    payload.tokens_[0][0]
                );
                _totalSold++;
                emit SaleMade(payload.buyer_, 1, chainId);
            }
        } else {
            bool happy = _checkOwnershipOfBatch(payload.tokens_);
            if (!happy) {
                _returnSalesError(
                    SaleRecipe(messageId, false),
                    chainId,
                    payload.buyer_
                );
            } else {
                (uint totalOrder, uint numElements) = (
                    0,
                    payload.tokens_.length
                );
                unchecked {
                    for (uint i = 0; i < numElements; i++)
                        for (uint x = 0; x < payload.tokens_[i].length; x++) {
                            totalOrder++;
                            NFT.transferFrom(
                                address(this),
                                payload.buyer_,
                                payload.tokens_[i][x]
                            );
                        }
                }
                _totalSold += totalOrder;
                emit SaleMade(payload.buyer_, totalOrder, chainId);
            }
        }
    }

    function testSendMessage() external onlyOwner {
        bytes32 message_ = 0x0;
        SaleRecipe memory recipe_ = SaleRecipe(message_, true);
        _returnSalesError(recipe_, SALES_CONTRACT_CHAIN, address(0));
    }

    function _returnSalesError(
        SaleRecipe memory recipe_,
        uint64 chainId_,
        address buyer_
    ) internal returns (bytes32 messageId) {
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        Client.EVM2AnyMessage memory evm2AnyMessage = _buildMessage(
            _saleStores[chainId_],
            abi.encode(recipe_),
            SALES_RECIPE_GAS
        );
        // Send the CCIP message through the router and store the returned CCIP message ID
        messageId = _sendMessage(chainId_, evm2AnyMessage);

        // Emit an event saying message failed
        emit SaleFailed(chainId_, recipe_.salesMessageId_);
        emit MessageSent(messageId, chainId_, buyer_);
        // Return the CCIP message ID
        return messageId;
    }

    /// @notice Construct a CCIP message.
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

    /** @notice WITHDRAWING MECHANICS */
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

    function withdrawBlock(uint256 tokenId_) external override onlyOwner {
        require(NFT.ownerOf(tokenId_) == address(this), "Token not available");
        NFT.transferFrom(address(this), _msgSender(), tokenId_);
    }

    function withdrawLink() external onlyOwner {
        uint linkBalance = _linkToken.balanceOf(address(this));
        _linkToken.transfer(_msgSender(), linkBalance);
    }

    function _checkOwnershipOfBatch(
        uint256[][] memory tokenIds_
    ) internal view returns (bool) {
        unchecked {
            for (uint i = 0; i < tokenIds_.length; i++)
                for (uint x = 0; x < tokenIds_[i].length; x++)
                    if (NFT.ownerOf(tokenIds_[i][x]) != address(this))
                        return false;
        }
        return true;
    }

    /** @notice GETTERS */

    function getBlockCost() public pure returns (uint256) {
        return COST_PER_BLOCK;
    }

    function getTotalSold() public view returns (uint256) {
        return _totalSold;
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

    function getChainBlockStore(uint64 chainId_) public view returns (address) {
        return _saleStores[chainId_];
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
