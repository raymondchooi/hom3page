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
    BlockStore: "0x62000fDCb622922D81EC22Ebe661936e1E045BEa",
  },
  opGoerli: {
    BlockToken: "0xE9116726A47E9e8303Ba0d6F6a0fB3554448210d",
    BlockSales: "0xb69d2203cF8C4D3c0d8c1fB126D6d8C13cB263Ad",
  },
  maticMumbai: {
    BlockToken: "",
    BlockStore: "0x5859d10b0816898eDEca7757EbB4803363C3483F",
  },
};

export type ContractNames =
  | "BlockToken"
  | "BlockSales"
  | "BlockStore"
  | "ProfileToken";
export default deployedContracts;
