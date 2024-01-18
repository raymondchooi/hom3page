/** @format */

import { ChainName } from "./tokenAddress";

const deployedContracts: {
  [chain in ChainName]?: { [name in ContractNames]?: string };
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
    BlockToken: "0x5efceC35dE2612EFE9489AC8022BB8e1E7924D4D",
    BlockSales: "0x05B45a4EA7dB5dc72c1a9089cD9D2FF4612308BA",
    BlockStore: "",
  },
};

export type ContractNames =
  | "BlockToken"
  | "BlockSales"
  | "BlockStore"
  | "ProfileToken";
export default deployedContracts;
