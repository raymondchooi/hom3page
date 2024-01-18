// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";

import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";

abstract contract CCIPInterface is CCIPReceiver {
    error DEVELOPMENT_ERROR(string note_);
    //  Errors
    error MessageNotFromBlockSales(address contractTringToMessage_);
    error MessageNotFromSalesChain(uint64 chainMessageOriginated);
    error NotBlockSalesContract();
    error NotEnoughBalance(uint256 currentBalance, uint256 calculatedFees);

    event MessageSent(bytes32 messageId_, uint64 destinationChain_);
    event MessageReceived(bytes32 messageId_, uint64 sourceChainId_);

    //  Cross Chain endpoints
    uint64 public constant OP_CHAIN_SELECTOR = 2664363617261496610;
    uint64 public constant ETH_CHAIN_SELECTOR = 16015286601757825753;
    uint64 public constant MATIC_CHAIN_SELECTOR = 12532609583862916517;

    uint64 public constant SALES_CONTRACT_CHAIN = MATIC_CHAIN_SELECTOR;

    enum Chains {
        ETH,
        OP,
        MATIC
    }

    uint constant SALES_RECIPE_GAS = 500_000;
    uint constant SALES_ORDER_GAS = 2_000_000;

    IRouterClient private _router;
    LinkTokenInterface internal _linkToken;

    bool private _useLinkAsPayment = false;

    mapping(uint64 => address) private _saleStores;
    mapping(uint64 => bool) private _chainAllowed;

    modifier onlyAllowlisted(uint64 _sourceChainSelector, address _sender) {
        if (!_chainAllowed[_sourceChainSelector])
            revert MessageNotFromSalesChain(_sourceChainSelector);
        if (_saleStores[_sourceChainSelector] != _sender)
            revert MessageNotFromBlockSales(_sender);
        _;
    }

    constructor(
        address linkToken_,
        address ccipRouter_
    ) CCIPReceiver(ccipRouter_) {
        _router = IRouterClient(ccipRouter_);
        _linkToken = LinkTokenInterface(linkToken_);
    }

    /// @notice Construct a CCIP message.
    /// @dev This function will create an EVM2AnyMessage struct with all the necessary information for sending a text.
    /// @param receiver_ The address of the receiver.
    /// @param payload_ The string data to be sent.
    /// @return Client.EVM2AnyMessage Returns an EVM2AnyMessage struct which contains information for sending a CCIP message.
    function _buildMessage(
        address receiver_,
        bytes memory payload_,
        uint256 gasFee_
    ) internal view returns (Client.EVM2AnyMessage memory) {
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        return
            Client.EVM2AnyMessage({
                receiver: abi.encode(receiver_), // ABI-encoded receiver address
                data: payload_,
                tokenAmounts: new Client.EVMTokenAmount[](0), // Empty array aas no tokens are transferred
                extraArgs: Client._argsToBytes(
                    // Additional arguments, setting gas limit
                    Client.EVMExtraArgsV1({gasLimit: gasFee_})
                ),
                // Set the feeToken to a feeTokenAddress, indicating specific asset will be used for fees
                feeToken: _getPaymentAddress()
            });
    }

    function _sendTX(
        uint64 chainId_,
        Client.EVM2AnyMessage memory evm2AnyMessage_
    ) internal returns (bytes32 messageId, uint256 fees) {
        // Initialize a router client instance to interact with cross-chain router
        IRouterClient router = IRouterClient(this.getRouter());
        fees = router.getFee(chainId_, evm2AnyMessage_);
        uint256 balance;
        //  Handle paying with Link
        if (_useLinkAsPayment) {
            balance = _linkToken.balanceOf(address(this));
            if (fees > balance) revert NotEnoughBalance(balance, fees);
            _linkToken.approve(address(router), fees);
            messageId = router.ccipSend(chainId_, evm2AnyMessage_);
        } else {
            balance = address(this).balance;
            if (fees > balance) revert NotEnoughBalance(balance, fees);
            messageId = router.ccipSend{value: fees}(chainId_, evm2AnyMessage_);
        }

        return (messageId, fees);
    }

    /** @notice Adds a BlockStore contract to the allow message
     * @param chainId_ ccip chain id
     * @param contractAddress_ address of the BlockStore contracts
     */
    function _setAllowedAddress(
        uint64 chainId_,
        address contractAddress_
    ) internal virtual {
        _saleStores[chainId_] = contractAddress_;
    }

    /**
     * @notice switch the allow of a ccip chain
     * @param chainId_ chain id to effect
     * @param flag_ wether to be active or not
     */
    function _setChainsActivity(uint64 chainId_, bool flag_) internal virtual {
        _chainAllowed[chainId_] = flag_;
    }

    function _setUseLinkForPaymentFlay(bool newSetting_) internal {
        _useLinkAsPayment = newSetting_;
    }

    function _setRouterAddress(address newRouter_) internal {
        _router = IRouterClient(newRouter_);
    }

    function _getChainsAllowAddress(
        uint64 chainId_
    ) internal view returns (address) {
        return _saleStores[chainId_];
    }

    function _getPaymentAddress() internal view returns (address) {
        if (_useLinkAsPayment) return address(_linkToken);
        else return address(0);
    }

    function _getChainAddress(Chains selector_) internal pure returns (uint64) {
        if (selector_ == Chains.ETH) return ETH_CHAIN_SELECTOR;
        if (selector_ == Chains.OP) return OP_CHAIN_SELECTOR;
        if (selector_ == Chains.MATIC) return MATIC_CHAIN_SELECTOR;
    }
}
