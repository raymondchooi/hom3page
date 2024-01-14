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
    BlockSales: "0x20B78b7a1f59692AAf1f02eAADAB851b588e8121",
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
