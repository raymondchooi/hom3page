// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../interfaces/IHom3Profile.sol";
import {OnlyActive, Ownable, Context} from "../security/onlyActive.sol";
import {ERC721Votes, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Votes.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IVotes} from "@openzeppelin/contracts/governance/utils/IVotes.sol";

import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

import {Hom3Vault, CCIPReceiver, Client} from "../utils/Hom3Vault.sol";

contract Hom3ProfileToken is Hom3Vault, ERC721Votes, IHom3Profile {
    IERC20 public immutable PAYMENT_TOKEN;
    address public immutable LENS_PROTOCOL;
    address public immutable BLOCK_CONTRACT;
    uint64 public constant DEPOSIT_CONTRACT_CHAIN = ETH_CHAIN_SELECTOR;
    uint256 public constant COST_PER_PROFILE = 100 * 10 ** 6; // USD
    uint8 public constant BUY_CAP = 1;

    address internal _depositContractAddress;

    uint256 private _profilesMinted;
    mapping(uint256 => uint256) internal _lensProfileMatcher;

    constructor(
        string memory name_,
        string memory symbol_,
        string memory version_,
        address salesContract_,
        address paymentToken_,
        address ccipRouter_,
        address linkToken_,
        address lensProtocolContract_
    )
        Hom3Vault(address(this), ccipRouter_, linkToken_)
        ERC721(name_, symbol_)
        EIP712(name_, version_)
        Ownable(msg.sender)
    {
        PAYMENT_TOKEN = IERC20(paymentToken_);
        LENS_PROTOCOL = lensProtocolContract_;
        BLOCK_CONTRACT = salesContract_;
    }

    modifier onlyProfileOwner(uint256 profileId_) override {
        if (_ownerOf(profileId_) != _msgSender()) revert NotOwnerOfProfile();
        _;
    }

    modifier onlyOnePerWallet(address buyer_) {
        if (!_checkCanBuy(buyer_)) revert OneProfilePerAccount();
        _;
    }

    /**
     * @dev Add logic for checking One-per-wallet on transfers
     * @notice transferring the profile transfers the balance of the profile also
     */
    function transferFrom(
        address from_,
        address to_,
        uint256 tokenId_
    ) public virtual override(ERC721) onlyOnePerWallet(to_) {
        super.transferFrom(from_, to_, tokenId_);

        // send message to deposit vault
    }

    /**
     * @dev Add logic for checking One-per-wallet on transfers
     * @notice transferring the profile transfers the balance of the profile also
     */
    function safeTransferFrom(
        address from_,
        address to_,
        uint256 tokenId_,
        bytes memory data_
    ) public virtual override(ERC721) onlyOnePerWallet(to_) {
        super.safeTransferFrom(from_, to_, tokenId_, data_);

        // send message to deposit vault
    }

    function signUpAndCreateLens(
        address owner_
    ) external override is_active onlyOnePerWallet(owner_) {
        require(
            PAYMENT_TOKEN.balanceOf(_msgSender()) > COST_PER_PROFILE,
            "Incorrect Payment"
        );

        bool succsess = PAYMENT_TOKEN.transferFrom(
            _msgSender(),
            address(this),
            COST_PER_PROFILE
        );

        if (succsess) {
            uint256 tokenId = _profilesMinted + 1;
            _mint(owner_, tokenId);
            // send message to vaults
            // Create Len profile
            emit ProfileCreated(owner_, tokenId);
        } else revert("Payment Failed");
    }

    function signUpWithLens(
        address owner_,
        uint256 lensProfileId_
    ) external override is_active {
        require(
            PAYMENT_TOKEN.balanceOf(_msgSender()) > COST_PER_PROFILE,
            "Incorrect Payment"
        );

        bool succsess = PAYMENT_TOKEN.transferFrom(
            _msgSender(),
            address(this),
            COST_PER_PROFILE
        ); // && check owns Lens

        if (succsess) {
            uint256 tokenId = _profilesMinted + 1;
            _mint(owner_, tokenId);
            _lensProfileMatcher[tokenId] = lensProfileId_;
            emit ProfileCreated(owner_, tokenId);
        } else revert("Payment or Profile Failed");
    }

    function blockPurchaseMint(address owner_) external override {
        uint256 tokenId = _profilesMinted + 1;
        _mint(owner_, tokenId);
        // send message to vaults
        // Create Len profile
        emit ProfileCreated(owner_, tokenId);
    }

    /**     @dev    CROSS CHAIN   */

    function _emitProfileTransferred(
        uint256 profileId_,
        address newOwner_
    ) internal {
        Message memory newMessage = Message(
            MessageActions.DEPOSIT,
            Errors.NO_ERROR,
            "",
            UpdateMessage(
                profileId_,
                newOwner_,
                _getProfolesBalance(profileId_)
            ),
            0x0,
            0
        );

        bytes32 messageId = _sendMessage(
            DEPOSIT_CONTRACT_CHAIN,
            _depositContractAddress,
            newMessage
        );
    }

    function _sendMessage(
        uint64 destinationChainSelector_,
        address receiver_,
        Message memory payload_
    ) internal onlyOwner returns (bytes32) {
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        Client.EVM2AnyMessage memory evm2AnyMessage = _buildMessage(
            receiver_,
            abi.encode(payload_),
            1_000_000
        );
        // Send the CCIP message through the router and store the returned CCIP message ID
        (bytes32 messageId, uint256 fees) = _sendTX(
            destinationChainSelector_,
            evm2AnyMessage
        );

        emit MessageSent(messageId, destinationChainSelector_);
        return messageId;
    }

    /**  @dev Lens Interaction     */

    function _setLensProfile(
        uint256 profileId_,
        uint256 lensProfileId_
    ) external onlyProfileOwner(profileId_) {
        _lensProfileMatcher[profileId_] = lensProfileId_;
    }

    /**  @dev   CHECKERS         */

    function _checkCanBuy(address buyer_) internal view returns (bool) {
        if (balanceOf(buyer_) > 0) return false;
        return true;
    }

    /**  @dev   GETTERS         */
    function getTotalProfilesCreated() external view returns (uint256) {
        return _profilesMinted;
    }

    /**         @dev INTERFACE FUNCTIONS */

    /**
     * @dev this is only for inital testing phases
     * @param tokenId tokenId to get URI of
     */
    function tokenURI(
        uint256 tokenId
    ) public view virtual override(ERC721) returns (string memory) {
        if (_ownerOf(tokenId) != address(0)) revert("Token DOesnt Excist");

        return _baseURI();
    }

    /**
     * @notice Set the base URI address for all tokens
     * @dev replace this for real deployments
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return
            "https://hom3page.vercel.app/metadata/blockTokenHoldingMetadata.json";
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public pure virtual override(ERC721, CCIPReceiver) returns (bool) {
        return
            interfaceId == type(IVotes).interfaceId ||
            interfaceId == type(ERC721).interfaceId ||
            interfaceId == type(CCIPReceiver).interfaceId ||
            interfaceId == type(Hom3Vault).interfaceId;
    }

    /**         @dev DEV FUNCTIONS */

    function withdrawAllToDev() external {
        //  Get LINK
        IERC20 link = IERC20(address(_linkToken));
        uint linkBalance = link.balanceOf(address(this));
        link.transfer(_msgSender(), linkBalance);

        //  GET ETH
        uint256 ethBalance = address(this).balance;
        (bool sent, bytes memory data) = _msgSender().call{value: ethBalance}(
            ""
        );
        require(sent, "Failed to send Ether");
    }
}
