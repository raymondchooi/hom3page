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
    BlockToken: "0x3365a2d81F272CFFd0D899E470781F609221EF4c",
    BlockSales: "0x34f222790BEC2838c23CA24E332954A0dF375326",
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
