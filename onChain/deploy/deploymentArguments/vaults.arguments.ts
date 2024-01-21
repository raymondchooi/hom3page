/** @format */
import {
  AddressLike,
  Addressable,
  BigNumberish,
  ZeroAddress,
  toBigInt,
} from "ethers";
import { ChainName, tokenAddress } from "../../bin/tokenAddress";
import deployedDCAContracts from "../../bin/deployedAddress";
import deployedContracts from "../../bin/deployedAddress";
import deploymentConfig from "../../bin/deployments.config";

export const Hom3PageVaultArguments = (
  deployer: string | Addressable,
  networkName: ChainName
) => {
  let netName: ChainName =
    networkName === "localhost" ? "hardhat" : networkName;

  const NFTAddress_ = deployedContracts[netName]?.BlockToken;
  const paymentToken_ = tokenAddress.usdc[netName];
  const ccipRouter_ = tokenAddress.ccipRouter[netName];
  const linkToken_ = tokenAddress.link[netName];

  return [paymentToken_, NFTAddress_, ccipRouter_, linkToken_];
};

export const Hom3PageDepositVaultArguments = (
  deployer: string | Addressable,
  networkName: ChainName
) => {
  let netName: ChainName =
    networkName === "localhost" ? "hardhat" : networkName;

  const paymentToken_ = tokenAddress.usdc[netName];
  const ccipRouter_ = tokenAddress.ccipRouter[netName];
  const linkToken_ = tokenAddress.link[netName];
  const masterContract_ = deployedContracts?.maticMumbai?.Hom3Profile;
  const masterChainId_ = "16015286601757825753";

  return [
    paymentToken_,
    masterContract_,
    ccipRouter_,
    linkToken_,
    masterChainId_,
  ];
};
