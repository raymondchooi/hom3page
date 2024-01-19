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
    Hom3ProfileToken: "",
  },
  ethSepolia: {
    BlockToken: "",
    BlockStore: "0x94dEa8d83c4a1aFF7cc37E9E45A627C41C0b8d88",
    Hom3ProfileToken: "",
    Hom3DepositVault: "",
  },
  opGoerli: {
    BlockToken: "",
    BlockSales: "",
    Hom3ProfileToken: "",
  },
  maticMumbai: {
    BlockToken: "0xfc2897eaFDD649441c5061EBb80FB9a771C9b5Fa",
    BlockSales: "0xD6aE33cb1Bd308b7b56A9Dc52B457F69D3d1aaa4",
    BlockStore: "",
    Hom3ProfileToken: "",
    Hom3Vault: "",
  },
};

export type ContractNames =
  | "BlockToken"
  | "BlockSales"
  | "BlockStore"
  | "Hom3ProfileToken"
  | "Hom3ProfileShadow"
  | "Hom3Vault"
  | "Hom3DepositVault";
export default deployedContracts;
