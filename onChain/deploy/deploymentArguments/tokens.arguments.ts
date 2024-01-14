/** @format */

import { AddressLike, Addressable, ZeroAddress } from "ethers";
import { ChainName, tokenAddress } from "../../bin/tokenAddress";
import deployedDCAContracts from "../../bin/deployedAddress";

export const BlockTokenArguments = (
  deployer?: string | Addressable,
  networkName?: string
) => {
  const name_: string = "Hom3Page Blocks";
  const symbol_: string = "HOM3";
  const version_: string = "1";

  return [name_, symbol_, version_];
};

export const BlockSalesArguments = (
  deployer?: string | Addressable,
  networkName?: ChainName
) => {
  const tokenContract = "0xAE246E208ea35B3F23dE72b697D47044FC594D5F";
  return [tokenContract, tokenAddress.ghoToken[networkName]];
};
