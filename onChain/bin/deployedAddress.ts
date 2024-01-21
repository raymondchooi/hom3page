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
    BlockStore: "0x27b634838Bd398Ef06D691c749046414e81FA3eF",
    Hom3Profile: "",
    Hom3DepositVault: "0xd30e45e78c876964AC9FB591230659B3D6aF3e1D",
  },
  opGoerli: {
    BlockToken: "",
    BlockSales: "",
    Hom3Profile: "",
  },
  maticMumbai: {
    BlockToken: "0xaA15B19EE877F1e1bdb92f0B3C57c0bc5Ad6b960",
    BlockSales: "0x5fB3A6D132F8d8eA2B4b4D81230ffce81D9740eD",
    BlockStore: "",
    Hom3Profile: "0x82F1a21aa77b9d5AfAa62Fb310961055133B21Ff",
  },
};

export type ContractNames =
  | "BlockToken"
  | "BlockSales"
  | "BlockStore"
  | "Hom3Profile"
  | "Hom3DepositVault"
  | "AaveFaucetbApp";
export default deployedContracts;
