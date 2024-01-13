/** @format */

import { ChainName } from "./tokenAddress";

const deployedDCAContracts: {
  [chain in ChainName]?: { [name in ContractNames]?: string };
} = {
  hardhat: {
    BlockToken: "",
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
export default deployedDCAContracts;
