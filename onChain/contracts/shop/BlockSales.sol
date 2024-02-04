// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "../security/onlyActive.sol";
import "../interfaces/IBlockSales.sol";
import "../helpers/CCIPInterface.sol";
import {IGhoToken} from "../interfaces/tokens/IGhoToken.sol";
import {IHom3Profile} from "../interfaces/tokens/IHom3Profile.sol";

contract BlockSales is CCIPInterface, ReentrancyGuard, OnlyActive, IBlockSales {
    IERC721 public immutable NFT;
    IERC20 public immutable PAYMENT_TOKEN;
    uint256 public constant PAYMENT_TOKEN_DECIMALS = 6; // USDC

    IHom3Profile private _Hom3ProfileContract;

    mapping(uint64 => address) private _saleStores;

    //  Sales
    uint256 internal constant COST_PER_BLOCK =
        100 * 10 ** PAYMENT_TOKEN_DECIMALS;

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

    /**
     * @notice function to buy blocks on deployed chain
     * @dev tokenIds_ need to be formatted as an array or arrays,
     *      with the blocks in arrays of their order.
     *      NO MORE than 10 tokens per buy, no moore than 5 sub arrays
     *
     *      Example
     *          tokenIds_ = [[1,2,3],[21,22],[109],[54]]
     *
     * @param tokenIds_ embedded token ids
     * @param multiBuy_ if it is a single block or multi
     */
    function buyBlock(
        uint256[][] calldata tokenIds_,
        bool multiBuy_
    ) external override nonReentrant is_active {
        if (multiBuy_) _buyBatchBlock(tokenIds_, _msgSender());
        else _buyBlock(tokenIds_[0][0], _msgSender());
    }

    /**
     * @param tokenId_ the id of the wanted block
     * @param buyer_ address of the buyer
     */
    function _buyBlock(uint256 tokenId_, address buyer_) internal {
        require(NFT.ownerOf(tokenId_) == address(this), "Token not available");
        require(
            PAYMENT_TOKEN.balanceOf(buyer_) >= COST_PER_BLOCK,
            "Incorrect payment"
        );
        bool succsess = PAYMENT_TOKEN.transferFrom(
            buyer_,
            address(this),
            COST_PER_BLOCK
        );
        if (succsess) {
            NFT.transferFrom(address(this), buyer_, tokenId_);
            _totalSold++;
            _doProfileThing(buyer_);
            emit SaleMade(buyer_, 1, OP_CHAIN_SELECTOR);
        }
    }

    /**
     * @param tokenIds_ the nested arrays of token Ids
     * @param buyer_ address of the buyer
     */
    function _buyBatchBlock(
        uint256[][] calldata tokenIds_,
        address buyer_
    ) internal {
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
        require(PAYMENT_TOKEN.balanceOf(buyer_) >= cost, "Insufficient Funds");

        bool succsess = PAYMENT_TOKEN.transferFrom(buyer_, address(this), cost);
        require(succsess, "Payment Failed");

        for (uint i = 0; i < numElements; i++) {
            for (uint x = 0; x < tokenIds_[i].length; x++)
                NFT.transferFrom(address(this), buyer_, tokenIds_[i][x]);
        }
        _totalSold += totalOrder;
        _doProfileThing(buyer_);
        emit SaleMade(buyer_, totalOrder, OP_CHAIN_SELECTOR);
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
                _doProfileThing(payload.buyer_);
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
                _doProfileThing(payload.buyer_);
                _totalSold += totalOrder;
                emit SaleMade(payload.buyer_, totalOrder, chainId);
            }
        }
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

    /**   @notice HOM£PROFILE  */

    function _doProfileThing(address owner_) internal {
        if (_needsProfile(owner_)) {
            _Hom3ProfileContract.blockPurchaseMint(owner_);
        }
    }

    function _needsProfile(address buyer_) internal view returns (bool) {
        return _Hom3ProfileContract.balanceOf(buyer_) < 1;
    }

    /**   @notice CHECKERS  */

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

    function _checkIfHasProfile(address buyer_) internal returns (bool) {}

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

    function getProfileCOntract() external view returns (address) {
        return address(_Hom3ProfileContract);
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
        _saleStores[chainId_] = contractAddress_;
    }

    /**
     * @notice switch the allow of a ccip chain
     * @param chainId_ chain id to effect
     * @param flag_ wether to be active or not
     */
    function setBlockStoreActive(uint64 chainId_, bool flag_) public onlyOwner {
        _setChainsActivity(chainId_, flag_);
    }

    function setProfileAddress(address newAddress_) external onlyOwner {
        _Hom3ProfileContract = IHom3Profile(newAddress_);
    }

    /** @notice WITHDRAWING */
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
