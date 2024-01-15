// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "../security/onlyActive.sol";
import "../interfaces/IBlockSales.sol";
import {IGhoToken} from "../interfaces/IGhoToken.sol";

import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";

contract BlockSales is CCIPReceiver, ReentrancyGuard, OnlyActive, IBlockSales {
    IERC721 public immutable NFT;
    IERC20 public immutable PAYMENT_TOKEN;
    IRouterClient private s_router;

    //  Cross Chain endpoints
    uint64 constant OP_CHAIN_SELECTOR = 2664363617261496610;
    uint64 constant ETH_CHAIN_SELECTOR = 16015286601757825753;

    mapping(uint64 => address) private _saleStores;

    // Mapping to keep track of allowlisted destination chains.
    // Mapping to keep track of allowlisted source chains.
    // Mapping to keep track of allowlisted senders.
    mapping(uint64 => bool) public allowlistedSourceChains;
    mapping(address => bool) public allowlistedSenders;

    modifier onlyAllowlisted(uint64 _sourceChainSelector, address _sender) {
        if (!allowlistedSourceChains[_sourceChainSelector])
            revert MessageNotFromSalesChain(_sourceChainSelector);
        if (!allowlistedSenders[_sender])
            revert MessageNotFromBlockSales(_sender);
        _;
    }

    //  Sales
    uint256 internal constant COST_PER_BLOCK = 100 * 10 ** 18;
    uint256 internal _totalSold;

    constructor(
        address NFTAddress_,
        address paymentToken_,
        address ccipRouter_
    ) CCIPReceiver(ccipRouter_) Ownable(msg.sender) {
        s_router = IRouterClient(ccipRouter_);
        NFT = IERC721(NFTAddress_);
        PAYMENT_TOKEN = IERC20(paymentToken_);
    }

    fallback() external payable {
        revert("BlockSales : [fallback] - We don't want your ETH");
    }

    receive() external payable {
        revert("BlockSales : [receive] - You can keep your tokens");
    }

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
            while (totalOrder < 10 && index < numElements) {
                totalOrder = tokenIds_[index].length;
                index++;
            }
            if (totalOrder > 10) revert OrderToLargeMax10();
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

    function externalPurchase() external override {}

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

        // will remove after test
        emit MessageReceived(
            messageId,
            chainId,
            abi.decode(any2EvmMessage.sender, (address)), // abi-decoding of the sender address,
            payload
        );

        if (!payload.multiBuy_) {
            uint256 tokenId = payload.tokens_[0][0];
            if (NFT.ownerOf(tokenId) != address(this))
                _returnSalesRecipe(SaleRecipe(messageId, false), chainId);
            else {
                NFT.transferFrom(
                    address(this),
                    _msgSender(),
                    payload.tokens_[0][0]
                );
                _totalSold++;
                emit SaleMade(_msgSender(), 1, chainId);
            }
        } else {
            (uint totalOrder, uint numElements) = (0, payload.tokens_.length);

            for (uint i = 0; i < numElements; i++) {
                for (uint x = 0; x < payload.tokens_[i].length; x++)
                    NFT.transferFrom(
                        address(this),
                        msg.sender,
                        payload.tokens_[i][x]
                    );
            }
            _totalSold += totalOrder;
            emit SaleMade(_msgSender(), totalOrder, OP_CHAIN_SELECTOR);
        }
    }

    function _returnSalesRecipe(
        SaleRecipe memory recipe_,
        uint64 chainId_
    ) internal {}

    /** @notice WITHDRAWING MECHANICS */
    function withdrawFunds(address withdrawAddress_) external onlyOwner {
        uint balance = PAYMENT_TOKEN.balanceOf(address(this));
        PAYMENT_TOKEN.transfer(withdrawAddress_, balance);
    }

    function withdrawBlock(
        address withdrawAddress_,
        uint256 tokenId_
    ) external override onlyOwner {}

    /** @notice GETTERS */

    function getBlockCost() public pure returns (uint256) {
        return COST_PER_BLOCK;
    }

    function getTotalSold() public view returns (uint256) {
        return _totalSold;
    }

    function getChainBlockStore(uint64 chainId_) public view returns (address) {
        return _saleStores[chainId_];
    }

    /**   @notice SETTERS  */
    function addBlockStore(
        uint64 chainId_,
        address contractAddress_
    ) public onlyOwner {
        _saleStores[chainId_] = contractAddress_;
    }
}
