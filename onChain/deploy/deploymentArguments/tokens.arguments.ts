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
  const tokenContract = "";
  return [tokenContract, tokenAddress.ghoToken[networkName!]];
};