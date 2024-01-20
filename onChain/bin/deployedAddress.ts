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
    BlockStore: "0x2192D1F6Bf04FC9aabCdA6bB6B5F446d47Cb3A99",
    Hom3Profile: "",
    Hom3DepositVault: "",
  },
  opGoerli: {
    BlockToken: "",
    BlockSales: "",
    Hom3Profile: "",
  },
  maticMumbai: {
    BlockToken: "0x003Da1a9fC274cD91b5CD3203771630F465D8310",
    BlockSales: "0x0EaDb8e668783EE144A60b8D80BEBe9cD9D07681",
    BlockStore: "",
    Hom3Profile: "0x975771292A4e55839cd1bf68a33c2be045D173ae",
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
