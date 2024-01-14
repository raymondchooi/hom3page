/** @format */

import { ChainName } from "./tokenAddress";

const deployedContracts: {
  [chain in ChainName]?: { [name in ContractNames]?: string };
} = {
  hardhat: {
    BlockToken: "0xAE246E208ea35B3F23dE72b697D47044FC594D5F",
    BlockSales: "",
    InnerBlockToken: "",
    InnerBlockFactory: "",
  },
  ethSepolia: {
    BlockToken: "",
    BlockSales: "",
    InnerBlockToken: "",
    InnerBlockFactory: "",
  },
};

export type ContractNames =
  | "BlockToken"
  | "BlockSales"
  | "InnerBlockToken"
  | "InnerBlockFactory";
export default deployedContracts;
