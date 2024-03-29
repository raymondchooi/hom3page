// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {OnlyActive, Ownable, Context} from "../security/onlyActive.sol";

interface IAaveFaucet {
    /**
     * @notice Returns the maximum amount of tokens per mint allowed
     * @return The maximum amount of tokens per mint allowed
     */
    function MAX_MINT_AMOUNT() external pure returns (uint256);

    /**
     * @notice Function to mint Testnet tokens to the destination address
     * @param token The address of the token to perform the mint
     * @param to The address to send the minted tokens
     * @param amount The amount of tokens to mint
     * @return The amount minted
     **/
    function mint(
        address token,
        address to,
        uint256 amount
    ) external returns (uint256);

    /**
     * @notice Enable or disable the need of authentication to call `mint` function
     * @param value If true, ask for authentication at `mint` function, if false, disable the authentication
     */
    function setPermissioned(bool value) external;
}

contract AaveFaucetbApp is OnlyActive {
    struct TokenAddresses {
        address WBTC;
        address AAVE;
        address WETH;
        address USDC;
    }

    struct MintAmount {
        uint256 WBTC;
        uint256 AAVE;
        uint256 WETH;
        uint256 USDC;
    }

    enum AllowedTokens {
        WBTC,
        AAVE,
        WETH,
        USDC
    }

    enum Network {
        SPEOLIA,
        MUMBAI
    }

    TokenAddresses private _TOKEN_ADDRESSES;
    MintAmount private _MINT_CAPS;
    IAaveFaucet private FAUCET;

    Network immutable DEPLOYED_NETWORK;

    constructor(
        TokenAddresses memory addresses_,
        MintAmount memory mintCaps_,
        address aaveFaucetAddress_,
        Network network_
    ) Ownable(msg.sender) {
        _TOKEN_ADDRESSES = addresses_;
        _MINT_CAPS = mintCaps_;
        FAUCET = IAaveFaucet(aaveFaucetAddress_);
        DEPLOYED_NETWORK = network_;
    }

    function mint(address to_) external is_active {
        FAUCET.mint(_TOKEN_ADDRESSES.WBTC, to_, _MINT_CAPS.WBTC);
        FAUCET.mint(_TOKEN_ADDRESSES.AAVE, to_, _MINT_CAPS.AAVE);
        FAUCET.mint(_TOKEN_ADDRESSES.USDC, to_, _MINT_CAPS.USDC);

        if (DEPLOYED_NETWORK == Network.MUMBAI)
            FAUCET.mint(_TOKEN_ADDRESSES.WETH, to_, _MINT_CAPS.WETH);
    }

    function getAllTokenAddress() public view returns (TokenAddresses memory) {
        return _TOKEN_ADDRESSES;
    }

    function updateAddresses(
        TokenAddresses memory newAddresses_
    ) external onlyOwner {
        _TOKEN_ADDRESSES = newAddresses_;
    }

    function updateLimits(MintAmount memory newAmounts_) external onlyOwner {
        _MINT_CAPS = newAmounts_;
    }

    function updateFaucetAddress(address newAddress_) external onlyOwner {
        FAUCET = IAaveFaucet(newAddress_);
    }
}
