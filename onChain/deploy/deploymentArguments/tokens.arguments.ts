/** @format */

import { AddressLike, Addressable, ZeroAddress } from "ethers";
import { ChainName, tokenAddress } from "../../bin/tokenAddress";
import deployedDCAContracts from "../../bin/deployedAddress";

export const BlockTokenArguments = () => {
  const name_: string = "Hom3Page Blocks";
  const symbol_: string = "HOM3";
  const version_: string = "1";

  return [name_, symbol_, version_];
};

export const BlockSalesArguments = (
  tokenAddress: string | Addressable,
  network: ChainName
) => [tokenAddress, tokenAddress.ghoToken[network]];
