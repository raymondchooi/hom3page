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
    BlockToken: "0x8f0C795c4Fb88D101d36a523e06De22614D60858",
    BlockSales: "0xb3B9F8Fb41c70E680Ec46eb9DfF1803B2A31d352",
  },
  maticMumbai: {
    BlockToken: "",
    BlockSales: "",
  },
};

export type ContractNames =
  | "BlockToken"
  | "BlockSales"
  | "BlockStore"
  | "ProfileToken";
export default deployedContracts;
