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
    LinkTokenInterface private s_linkToken;

    //  Cross Chain endpoints
    uint64 constant OP_CHAIN_SELECTOR = 2664363617261496610;
    uint64 constant ETH_CHAIN_SELECTOR = 16015286601757825753;
    uint64 constant MATIC_CHAIN_SELECTOR = 12532609583862916517;

    mapping(uint64 => address) private _saleStores;
    mapping(uint64 => bool) private _chainAllowed;

    //  Errors
    error MessageNotFromBlockSales(address contractTringToMessage_);
    error MessageNotFromSalesChain(uint64 chainMessageOriginated);
    error NotBlockSalesContract();
    error NotEnoughBalance(uint256 currentBalance, uint256 calculatedFees); // Used to m
    error DEVELOPMENT_ERROR(string note_);

    modifier onlyAllowlisted(uint64 _sourceChainSelector, address _sender) {
        if (!_chainAllowed[_sourceChainSelector])
            revert MessageNotFromSalesChain(_sourceChainSelector);
        if (_saleStores[_sourceChainSelector] != _sender)
            revert MessageNotFromBlockSales(_sender);
        _;
    }

    //  Sales
    uint256 internal constant COST_PER_BLOCK = 100 * 10 ** 6; // USD
    uint8 internal constant BUY_CAP = 10;

    uint256 internal _totalSold;

    constructor(
        address NFTAddress_,
        address paymentToken_,
        address ccipRouter_,
        address linkToken_
    ) CCIPReceiver(ccipRouter_) Ownable(msg.sender) {
        s_router = IRouterClient(ccipRouter_);
        NFT = IERC721(NFTAddress_);
        PAYMENT_TOKEN = IERC20(paymentToken_);
        s_linkToken = LinkTokenInterface(linkToken_);
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
                _returnSalesRecipe(SaleRecipe(messageId, true), chainId);
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
            emit SaleMade(payload.buyer_, 0, chainId);
            if (!happy) {
                // _returnSalesRecipe(SaleRecipe(messageId, false), chainId);
            } else {
                (uint totalOrder, uint numElements) = (
                    0,
                    payload.tokens_.length
                );
                unchecked {
                    for (uint i = 0; i < numElements; i++)
                        for (uint x = 0; x < payload.tokens_[i].length; x++)
                            NFT.transferFrom(
                                address(this),
                                payload.buyer_,
                                payload.tokens_[i][x]
                            );
                }
                _totalSold += totalOrder;
                emit SaleMade(payload.buyer_, totalOrder, chainId);
            }
        }
    }

    function _returnSalesRecipe(
        SaleRecipe memory recipe_,
        uint64 chainId_
    ) internal onlyOwner returns (bytes32 messageId) {
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        Client.EVM2AnyMessage memory evm2AnyMessage = _buildCCIPMessage(
            _saleStores[chainId_],
            recipe_,
            address(0)
        );

        // Initialize a router client instance to interact with cross-chain router
        IRouterClient router = IRouterClient(this.getRouter());

        // Get the fee required to send the CCIP message
        uint256 fees = router.getFee(chainId_, evm2AnyMessage);

        if (fees > address(this).balance)
            revert NotEnoughBalance(address(this).balance, fees);

        // Send the CCIP message through the router and store the returned CCIP message ID
        messageId = router.ccipSend{value: fees}(chainId_, evm2AnyMessage);

        // Emit an event with message details
        emit MessageSent(
            messageId,
            chainId_,
            _saleStores[chainId_],
            recipe_,
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
        SaleRecipe memory payload_,
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
                    Client.EVMExtraArgsV1({gasLimit: 500_000})
                ),
                // Set the feeToken to a feeTokenAddress, indicating specific asset will be used for fees
                feeToken: feeTokenAddress_
            });
    }

    /** @notice WITHDRAWING MECHANICS */
    function withdrawTokens(address tokenAddress_) external override onlyOwner {
        IERC20 token = IERC20(tokenAddress_);
        uint balance = token.balanceOf(address(this));
        token.transfer(_msgSender(), balance);
    }

    function withdrawFunds() external payable override onlyOwner {
        uint256 balance = address(this).balance;
        (bool sent, bytes memory data) = _msgSender().call{value: balance}("");
        require(sent, "Failed to send Ether");
    }

    function withdrawBlock(uint256 tokenId_) external override onlyOwner {
        require(NFT.ownerOf(tokenId_) == address(this), "Token not available");
        NFT.transferFrom(address(this), _msgSender(), tokenId_);
    }

    function withdrawLink() external onlyOwner {
        IERC20 token = IERC20(address(s_linkToken));
        uint balance = token.balanceOf(address(this));
        token.transfer(_msgSender(), balance);
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
        _saleStores[chainId_] = contractAddress_;
    }

    /**
     * @notice switch the allow of a ccip chain
     * @param chainId_ chain id to effect
     * @param flag_ wether to be active or not
     */
    function setBlockStoreActive(uint64 chainId_, bool flag_) public onlyOwner {
        _chainAllowed[chainId_] = flag_;
    }

    function getChainBlockStore(uint64 chainId_) public view returns (address) {
        return _saleStores[chainId_];
    }
}
