// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../utils/CCIPInterface.sol";
import "../security/onlyActive.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract BlockSales is CCIPInterface, ReentrancyGuard, OnlyActive, IBlockSales {
    IERC721 public immutable NFT;
    IERC20 public immutable PAYMENT_TOKEN;

    //  Sales
    uint256 internal constant COST_PER_BLOCK = 100 * 10 ** 6; // USD
    uint8 internal constant BUY_CAP = 10;

    uint256 internal _totalSold;
    mapping(bytes => IBlockStore.SaleRecipe) private _saleStores;

    constructor(
        address NFTAddress_,
        address paymentToken_,
        address ccipRouter_,
        address linkToken_
    ) CCIPInterface(ccipRouter_, linkToken_) Ownable(msg.sender) {
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
        Sale memory payload; // = abi.decode(any2EvmMessage.data, (Sale));

        // will remove after test
        emit MessageReceived(
            messageId,
            chainId,
            abi.decode(any2EvmMessage.sender, (address)), // abi-decoding of the sender address,
            payload
        );

        //CONNECTED OUT FOR TESTING
        bool happy = _checkOwnershipOfBatch(
            payload.tokens_,
            !payload.multiBuy_
        );
        if (!happy) revert DEVELOPMENT_ERROR("Not owners");
        //_returnSalesRecipe(SaleRecipe(messageId, false), chainId);
        else if (!payload.multiBuy_) {
            //  Check it is the contracts
            NFT.transferFrom(
                address(this),
                _msgSender(),
                payload.tokens_[0][0]
            );
            _totalSold++;
            //_returnSalesRecipe(SaleRecipe(messageId, true), chainId);
            emit SaleMade(_msgSender(), 1, chainId);
        } else {
            (uint totalOrder, uint numElements) = (0, payload.tokens_.length);
            unchecked {
                for (uint i = 0; i < numElements; i++)
                    for (uint x = 0; x < payload.tokens_[i].length; x++)
                        NFT.transferFrom(
                            address(this),
                            msg.sender,
                            payload.tokens_[i][x]
                        );
            }
            _totalSold += totalOrder;
            //_returnSalesRecipe(SaleRecipe(messageId, true), chainId);
            emit SaleMade(_msgSender(), totalOrder, chainId);
        }
    }

    function _returnSalesRecipe(
        IBlockSales.SaleRecipe memory recipe_,
        uint64 chainId_
    ) internal onlyOwner returns (bytes32 messageId) {
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        Client.EVM2AnyMessage memory evm2AnyMessage = _buildMessage(
            _getChainsAllowAddress(chainId_),
            abi.encode(recipe_),
            _getPaymentAddress(),
            SALES_RECIPE_GAS
        );

        uint256 fees;
        (messageId, fees) = _sendTX(chainId_, evm2AnyMessage);

        // Emit an event with message details
        emit MessageSent(
            messageId,
            chainId_,
            _getChainsAllowAddress(chainId_),
            recipe_,
            address(0),
            fees
        );

        // Return the CCIP message ID
        return messageId;
    }

    /** @notice WITHDRAWING MECHANICS */
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

    function withdrawBlock(
        address withdrawAddress_,
        uint256 tokenId_
    ) external override onlyOwner {
        require(NFT.ownerOf(tokenId_) == address(this), "Token not available");
        NFT.transferFrom(address(this), withdrawAddress_, tokenId_);
    }

    function _checkOwnershipOfBatch(
        uint256[][] memory tokenIds_,
        bool single_
    ) internal view returns (bool) {
        uint numElements = (tokenIds_.length);
        unchecked {
            if (single_)
                if (NFT.ownerOf(tokenIds_[0][0]) != address(this)) return false;
                else
                    for (uint i = 0; i < numElements; i++)
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
}
