/** @format */

import { ChainName } from "./tokenAddress";

const deployedContracts: {
  [chain in ChainName]?: { [name in ContractNames]?: string };
} = {
  hardhat: {
    BlockToken: "",
    BlockSales: "",
    InnerBlockToken: "",
    InnerBlockFactory: "",
  },
  ethSepolia: {
    BlockToken: "0x8414FDEd1f0033fDfBD87206d69723f2EE72dde1",
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
