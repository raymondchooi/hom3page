/** @format */

import { Addressable, toBigInt } from "ethers";
import { ChainName, tokenAddress } from "../../bin/tokenAddress";
import { ethers } from "ethers";

const FAUCET_CONTRACTS = {
  ethSepolia: {
    WBTC: "0x29f2D40B0605204364af54EC677bD022dA425d03",
    AAVE: "0x88541670E55cC00bEEFD87eB59EDd1b7C511AC9a",
    WETH: "0x0000000000000000000000000000000000000000",
    USDC: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",
  },
  maticMumbai: {
    WBTC: "0x2Fa2e7a6dEB7bb51B625336DBe1dA23511914a8A",
    AAVE: "0x1558c6FadDe1bEaf0f6628BDd1DFf3461185eA24",
    WETH: "0xc199807AF4fEDB02EE567Ed0FeB814A077de4802",
    USDC: "0x52D800ca262522580CeBAD275395ca6e7598C014",
  },
};

const TOKEN_LIMITS = {
  WBTC: 1,
  AAVE: 100,
  WETH: 10,
  USDC: 10000,
};

export const AaveFaucetbAppArguments = (
  deployer: string | Addressable,
  networkName: ChainName
) => {
  console.log("Max check", TOKEN_LIMITS);

  const TOKEN_ADDRESSES = FAUCET_CONTRACTS[networkName]!;
  const faucetAddress = tokenAddress.aaveFaucet[networkName];

  const network =
    networkName === "maticMumbai" ? 1 : networkName === "ethSepolia" ? 0 : 0;

  return [TOKEN_ADDRESSES, TOKEN_LIMITS, faucetAddress, network];
};
