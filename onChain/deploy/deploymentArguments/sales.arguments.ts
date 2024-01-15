/** @format */
import { AddressLike, Addressable, ZeroAddress } from "ethers";
import { ChainName, tokenAddress } from "../../bin/tokenAddress";
import deployedDCAContracts from "../../bin/deployedAddress";
import deployedContracts from "../../bin/deployedAddress";

export const BlockSalesArguments = (
  deployer: string | Addressable,
  networkName: ChainName
) => {
  let netName: ChainName =
    networkName === "localhost" ? "hardhat" : networkName;

  const tokenContract = deployedContracts[netName]?.BlockToken;
  return [tokenContract, tokenAddress.gho[netName]];
};

export const BlockStoreArguments = (
  deployer: string | Addressable,
  networkName: ChainName
) => {
  let netName: ChainName =
    networkName === "localhost" ? "hardhat" : networkName;

  const router_ = tokenAddress.ccipRouter[netName];
  const ghoTokenAddress_ = tokenAddress.gho[netName];
  const blockSalesContract_ = deployedContracts[netName]?.BlockToken;

  return [router_, ghoTokenAddress_, blockSalesContract_];
};
