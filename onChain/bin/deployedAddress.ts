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
  },
  ethSepolia: {
    BlockToken: "",
    BlockStore: "0x7B3088FAf5647480aD814c68933e1bB025A70250",
  },
  opGoerli: {
    BlockToken: "",
    BlockSales: "",
  },
  maticMumbai: {
    BlockToken: "0x20Cc45aD3013387DE9a3B4FE3660A66B32461758",
    BlockSales: "0x5f4Ae9F3167f6cb4dc4e7711Ae8a6152a5926ccd",
    BlockStore: "",
  },
};

export type ContractNames =
  | "BlockToken"
  | "BlockSales"
  | "BlockStore"
  | "ProfileToken";
export default deployedContracts;
