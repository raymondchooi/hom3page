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
    BlockStore: "0xCCAC7A50c50a997CF3fa5bC6c4022eC4441c3F87",
    Hom3Profile: "",
    Hom3DepositVault: "",
  },
  opGoerli: {
    BlockToken: "",
    BlockSales: "",
    Hom3Profile: "",
  },
  maticMumbai: {
    BlockToken: "0x9C39352Cf68f13D2FF6a493B082E5f4947e6e5cC",
    BlockSales: "0xC964770ff56B5F4E2F96A76A59c5a2789A243e97",
    BlockStore: "",
    Hom3Profile: "0x1c600755f35bDd47852f0B458371E4D36DcED0d6",
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
