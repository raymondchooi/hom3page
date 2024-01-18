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
    ProfileToken: "",
  },
  ethSepolia: {
    BlockToken: "",
    BlockStore: "0x03F09634Ca9Cd65999e4Dbd15bc558F757e67B00",
    ProfileToken: "",
    Hom3DepositVault: "",
  },
  opGoerli: {
    BlockToken: "",
    BlockSales: "",
    ProfileToken: "",
  },
  maticMumbai: {
    BlockToken: "0x08a41fe84A22bf962559886A0c0957fc7E84af4D",
    BlockSales: "0xd569f2D569C7439c869208B533436c1F6474c397",
    BlockStore: "",
    ProfileToken: "",
    Hom3Vault: "",
  },
};

export type ContractNames =
  | "BlockToken"
  | "BlockSales"
  | "BlockStore"
  | "ProfileToken"
  | "Hom3Vault"
  | "Hom3DepositVault";
export default deployedContracts;
