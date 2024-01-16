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

  const NFTAddress_ = deployedContracts[netName]?.BlockToken;
  const paymentToken_ = tokenAddress.usdc[netName];
  const ccipRouter_ = tokenAddress.ccipRouter[netName];

  return [NFTAddress_, paymentToken_, ccipRouter_];
};

export const BlockStoreArguments = (
  deployer: string | Addressable,
  networkName: ChainName
) => {
  let netName: ChainName =
    networkName === "localhost" ? "hardhat" : networkName;

  const router_ = tokenAddress.ccipRouter[netName];
  const ghoTokenAddress_ = tokenAddress.usdc[netName];
  const blockSalesContract_ = deployedContracts.opGoerli?.BlockSales;

  return [router_, ghoTokenAddress_, blockSalesContract_];
};
