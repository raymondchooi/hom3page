/** @format */

import { Addressable } from "ethers";
import { ChainName } from "../../bin/tokenAddress";

const FAUCET_CONTRACTS = {
  ethSepolia: {
    wbtc: "",
    aave: "",
    weth: "",
    usdc: "",
  },
  maticMumbai: {
    wbtc: "0x2Fa2e7a6dEB7bb51B625336DBe1dA23511914a8A",
    aave: "0x1558c6FadDe1bEaf0f6628BDd1DFf3461185eA24",
    weth: "0xc199807AF4fEDB02EE567Ed0FeB814A077de4802",
    usdc: "0x52D800ca262522580CeBAD275395ca6e7598C014",
  },
};

export const AaveFaucetbAppArguments = (
  deployer: string | Addressable,
  networkName: ChainName
) => {
  let netName: ChainName =
    networkName === "localhost" ? "hardhat" : networkName;

  const addresses = {};

  const max = {};

  const faucet = "";

  return [NFTAddress_, paymentToken_, ccipRouter_, linkToken_];
};
