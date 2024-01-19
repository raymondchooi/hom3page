/** @format */

import { Addressable } from "ethers";
import { ChainName } from "./tokenAddress";

const deployedContracts: {
  [chain in ChainName]?: { [name in ContractNames]?: string | Addressable };
} = {
  hardhat: {
    BlockToken: "",
    BlockSales: "",
    BlockStore: "",
    Hom3Profile: "",
  },
  ethSepolia: {
    BlockToken: "",
    BlockStore: "0x56ba4D9bBF5f09c6A26058Df860c827aA6BbBb87",
    Hom3Profile: "",
    Hom3DepositVault: "",
  },
  opGoerli: {
    BlockToken: "",
    BlockSales: "",
    Hom3Profile: "",
  },
  maticMumbai: {
    BlockToken: "0x75BDd507A8ad2C8AE2bA502C85D96c1674a89730",
    BlockSales: "0xC4A39bAe63852a613eFf1a53d8d3C28fbbaDE6A6",
    BlockStore: "",
    Hom3Profile: "0xDF89c68491B07E221Ffb7334b5FD0a617Da8aA01",
    Hom3Vault: "",
  },
};

export type ContractNames =
  | "BlockToken"
  | "BlockSales"
  | "BlockStore"
  | "Hom3Profile"
  | "Hom3ProfileShadow"
  | "Hom3Vault"
  | "Hom3DepositVault";
export default deployedContracts;
