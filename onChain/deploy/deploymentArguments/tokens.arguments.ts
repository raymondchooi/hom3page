/** @format */
import { AddressLike, Addressable, ZeroAddress } from "ethers";
import { ChainName, tokenAddress } from "../../bin/tokenAddress";
import deployedDCAContracts from "../../bin/deployedAddress";
import deployedContracts from "../../bin/deployedAddress";

export const BlockTokenArguments = (
  deployer?: string | Addressable,
  networkName?: string
) => {
  const name_: string = "Hom3Page Blocks";
  const symbol_: string = "BLOCK";
  const version_: string = "1";

  return [name_, symbol_, version_];
};

export const ProfileTokenArguments = (
  deployer?: string | Addressable,
  networkName?: string
) => {
  const name_: string = "Hom3Page Profile";
  const symbol_: string = "HOM3";
  const version_: string = "1";

  const paymentToken_ = tokenAddress.usdc[networkName as ChainName];
  const ccipRouter_ = tokenAddress.ccipRouter[networkName as ChainName];
  const linkToken_ = tokenAddress.link[networkName as ChainName];
  const lensProtocolContract_ = "0x4fbffF20302F3326B20052ab9C217C44F6480900";

  return [
    name_,
    symbol_,
    version_,
    paymentToken_,
    ccipRouter_,
    linkToken_,
    lensProtocolContract_,
  ];
};
