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
    BlockToken: "0x6cF261aFe4e3654d77bdb93aDa25A4C3FB4038CC",
    BlockSales: "0x146a9c4862086C96C87bEEe501410f5f8D3160FB",
    BlockStore: "",
  },
};

export type ContractNames =
  | "BlockToken"
  | "BlockSales"
  | "BlockStore"
  | "ProfileToken";
export default deployedContracts;
