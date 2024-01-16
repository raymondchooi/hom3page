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
    BlockStore: "",
  },
  opGoerli: {
    BlockToken: "0x5E55Cb5919049e4a902db8C9D4729c6b11696DAD",
    BlockSales: "0x40BBFbb689A1445a3442259B45C26df52E3F19D2",
  },
};

export type ContractNames =
  | "BlockToken"
  | "BlockSales"
  | "BlockStore"
  | "ProfileToken";
export default deployedContracts;
