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
    BlockStore: "0x5474EC7dfad8cB8c9F311023f39069DBe9406a3E",
    Hom3Profile: "",
    Hom3DepositVault: "",
  },
  opGoerli: {
    BlockToken: "",
    BlockSales: "",
    Hom3Profile: "",
  },
  maticMumbai: {
    BlockToken: "0x7f695dA9438304cab1Cf7586ae84e6d450B9364b",
    BlockSales: "0x6859b8eFB04Ef1AB3197795D17cBA84C91166eE3",
    BlockStore: "",
    Hom3Profile: "0x1aC6B6B30F4B5e074caBf8Ddc4F902992C57c3eA",
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
