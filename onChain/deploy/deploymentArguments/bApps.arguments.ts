/** @format */

import { Addressable, toBigInt } from "ethers";
import { ChainName, tokenAddress } from "../../bin/tokenAddress";
import { ethers } from "ethers";

const FAUCET_CONTRACTS = {
  ethSepolia: {
    WBTC: "",
    AAVE: "",
    WETH: "",
    USDC: "",
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
  let netName: ChainName =
    networkName === "localhost" ? "hardhat" : networkName;

  console.log("Max check", TOKEN_LIMITS);

  const TOKEN_ADDRESSES = FAUCET_CONTRACTS[netName]!;
  const faucetAddress = tokenAddress.aaveFaucet[netName];

  return [TOKEN_ADDRESSES, TOKEN_LIMITS, faucetAddress];
};
