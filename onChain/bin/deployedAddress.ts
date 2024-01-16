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
    BlockToken: "0xD08487f956Ba89A3dd70ad37DeF5822f61B9d63a",
    BlockSales: "0x50c89A3BA32E91d57B277296F486F4C270f585e2",
  },
};

export type ContractNames =
  | "BlockToken"
  | "BlockSales"
  | "BlockStore"
  | "ProfileToken";
export default deployedContracts;
