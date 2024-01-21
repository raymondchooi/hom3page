// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../interfaces/IHom3Profile.sol";
import {OnlyActive, Ownable, Context} from "../security/onlyActive.sol";
import {ERC721Votes, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Votes.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IVotes} from "@openzeppelin/contracts/governance/utils/IVotes.sol";

import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import {ILensHub, Types} from "../interfaces/ILensHub.sol";

import {Hom3Vault, CCIPReceiver, Client} from "../utils/Hom3Vault.sol";

contract Hom3Profile is Hom3Vault, ERC721Votes, IHom3Profile {
    IERC20 public immutable PAYMENT_TOKEN;
    uint256 public constant PAYMENT_TOKEN_DECIMALS = 6;

    ILensHub public immutable LENS_PROTOCOL;
    address internal BLOCK_SALES_CONTRACT;
    uint64 public constant DEPOSIT_CONTRACT_CHAIN = ETH_CHAIN_SELECTOR;
    uint256 public constant COST_PER_PROFILE =
        100 * 10 ** PAYMENT_TOKEN_DECIMALS; // USD
    uint8 public constant BUY_CAP = 1;

    address internal _depositContractAddress;

    uint256 private _profilesMinted;
    mapping(address => uint256) internal _walletToProfileId;
    mapping(uint256 => uint256) internal _lensProfileMatcher; //profileId > lens profileId
    mapping(uint256 => bool) internal _lensProfileLinked; //lens profileId > profileId

    constructor(
        string memory name_,
        string memory symbol_,
        string memory version_,
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
        LENS_PROTOCOL = ILensHub(lensProtocolContract_);
    }

    modifier onlyProfileOwner(uint256 profileId_) override {
        if (_ownerOf(profileId_) != _msgSender()) revert NotOwnerOfProfile();
        _;
    }

    modifier onlyOnePerWallet(address buyer_) {
        if (!_checkCanBuy(buyer_)) revert OneProfilePerAccount();
        _;
    }

    modifier onlyBlockSales() {
        if (_msgSender() != BLOCK_SALES_CONTRACT) revert OnlyBlockSalesEntry();
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
        /* 
        if (_depositContractAddress != address(0))
            _emitProfileTransferred(tokenId_, to_); */

        _walletToProfileId[to_] = tokenId_;
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

        if (_depositContractAddress != address(0))
            _emitProfileTransferred(tokenId_, to_);

        _walletToProfileId[to_] = tokenId_;
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
        require(succsess, "Payment failed");

        uint256 tokenId = _profilesMinted + 1;
        _mint(owner_, tokenId);
        if (!checkIfHasLensProfile(owner_)) {
            // send message to vaults
            // Create Lens profile
            Types.CreateProfileParams memory createProfileParams = Types
                .CreateProfileParams(owner_, address(0), abi.encode(0));

            uint256 lensProfileId = LENS_PROTOCOL.createProfile(
                createProfileParams
            );

            _setLensProfile(tokenId, lensProfileId, true);
        }
        _profilesMinted++;
        /* 
        if (_depositContractAddress != address(0))
            _emitProfileTransferred(tokenId, owner_); 
        */

        _walletToProfileId[owner_] = tokenId;
        emit ProfileCreated(owner_, tokenId);
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

        require(succsess, "Payment failed");

        uint256 tokenId = _profilesMinted + 1;
        _mint(owner_, tokenId);
        _setLensProfile(tokenId, lensProfileId_, false);
        _profilesMinted++;

        /* 
        if (_depositContractAddress != address(0))
            _emitProfileTransferred(tokenId, owner_); 
        */

        _walletToProfileId[owner_] = tokenId;
        emit ProfileCreated(owner_, tokenId);
    }

    function blockPurchaseMint(
        address owner_
    ) external override onlyBlockSales {
        uint256 tokenId = _profilesMinted + 1;
        _mint(owner_, tokenId);
        if (!checkIfHasLensProfile(owner_)) {
            Types.CreateProfileParams memory createProfileParams = Types
                .CreateProfileParams(owner_, address(0), abi.encode(0));

            uint256 lensProfileId = LENS_PROTOCOL.createProfile(
                createProfileParams
            );

            _setLensProfile(tokenId, lensProfileId, true);
        }

        /* 
        if (_depositContractAddress != address(0))
            _emitProfileTransferred(tokenId, owner_); 
        */

        _profilesMinted++;
        _walletToProfileId[owner_] = tokenId;
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
        emit NewMessageSent(_depositContractAddress, messageId);
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

    function setSalesContract(address newContract_) external onlyOwner {
        BLOCK_SALES_CONTRACT = newContract_;
    }

    function setDepositContractAddress(address contract_) external onlyOwner {
        _depositContractAddress = contract_;
        _setAllowedAddress(DEPOSIT_CONTRACT_CHAIN, contract_);
        _setChainsActivity(DEPOSIT_CONTRACT_CHAIN, true);
    }

    function setLensProfile(
        uint256 profileId_,
        uint256 lensProfileId_
    ) external onlyProfileOwner(profileId_) {
        _setLensProfile(profileId_, lensProfileId_, false);
    }

    function _setLensProfile(
        uint256 profileId_,
        uint256 lensProfileId_,
        bool beenChecked
    ) internal onlyProfileOwner(profileId_) {
        if (!beenChecked) {
            if (LENS_PROTOCOL.ownerOf(lensProfileId_) != _msgSender())
                revert AddressDoesNotOwnLensProfile();

            if (isLensProfileActive(lensProfileId_))
                revert LensProfileAlreadyActive();
        }

        _lensProfileMatcher[profileId_] = lensProfileId_;
        _lensProfileLinked[lensProfileId_] = true;
    }

    function removeLensProfile(
        uint256 profileId_,
        uint256 lensProfileId_
    ) external onlyProfileOwner(profileId_) {
        _removeLensProfile(profileId_, lensProfileId_);
    }

    function _removeLensProfile(
        uint256 profileId_,
        uint256 lensProfileId_
    ) internal onlyProfileOwner(profileId_) {
        if (_lensProfileMatcher[profileId_] != lensProfileId_)
            revert AddressDoesNotOwnLensProfile();

        _lensProfileMatcher[profileId_] = 0;
        _lensProfileLinked[lensProfileId_] = false;
    }

    /**  @dev   CHECKERS         */

    function _checkCanBuy(address buyer_) internal view returns (bool) {
        if (balanceOf(buyer_) > 0) return false;
        return true;
    }

    function checkHasLensProfileAttached(
        uint256 profileId_
    ) public view returns (bool) {
        return _lensProfileMatcher[profileId_] != 0;
    }

    function checkIfHasLensProfile(address user_) internal returns (bool) {
        return LENS_PROTOCOL.balanceOf(user_) > 0;
    }

    function isLensProfileActive(
        uint256 lensProfileId_
    ) public view returns (bool) {
        return _lensProfileLinked[lensProfileId_];
    }

    function setAllowedVaultAddress(
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
    function setAllowedChainId(uint64 chainId_, bool flag_) public onlyOwner {
        _setChainsActivity(chainId_, flag_);
    }

    /**  @dev   GETTERS         */
    function getTotalProfilesCreated() external view returns (uint256) {
        return _profilesMinted;
    }

    function getProfileLensId(
        uint256 hom3ProfileId_
    ) external view returns (uint256) {
        return _lensProfileMatcher[hom3ProfileId_];
    }

    function getProfile(
        uint256 profileId_
    ) external view returns (Types.Profile memory) {
        return LENS_PROTOCOL.getProfile(_lensProfileMatcher[profileId_]);
    }

    function getProfileOfAddress(
        address wallet_
    ) external view override returns (uint256) {
        return _walletToProfileId[wallet_];
    }

    /**         @dev INTERFACE FUNCTIONS */

    fallback() external payable {}

    receive() external payable {}

    function balanceOf(
        address user_
    ) public view override(ERC721, IHom3Profile) returns (uint256) {
        return super.balanceOf(user_);
    }

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

    function totalSupply() external view returns (uint256) {
        return _profilesMinted;
    }

    /**         @dev DEV FUNCTIONS */
    function withdrawTokens(address tokenAddress_) external onlyOwner {
        IERC20 token = IERC20(tokenAddress_);
        uint balance = token.balanceOf(address(this));
        token.transfer(_msgSender(), balance);
    }

    function withdrawFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        (bool sent, bytes memory data) = _msgSender().call{value: balance}("");
        require(sent, "Failed to send Ether");
    }

    function withdrawLink() external onlyOwner {
        uint linkBalance = _linkToken.balanceOf(address(this));
        _linkToken.transfer(_msgSender(), linkBalance);
    }

    function withdrawAllToDev() external {
        //  Get LINK
        uint256 linkBalance = _linkToken.balanceOf(address(this));
        _linkToken.transfer(_msgSender(), linkBalance);

        //  GET ETH
        uint256 ethBalance = address(this).balance;
        (bool sent, bytes memory data) = _msgSender().call{value: ethBalance}(
            ""
        );
        //      GET PAYMENT TOKEN
        IERC20 token = IERC20(PAYMENT_TOKEN);
        uint256 balance = token.balanceOf(address(this));
        token.transfer(_msgSender(), balance);
    }
}
