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
    BlockToken: "0xB5d3e7b9Bd563A8dCD803586508517Cde1f1C0f2",
    BlockSales: "0x0796C75Bc29BD3d866479E1f696f4E4C863a6d95",
  },
  maticMumbai: {
    BlockToken: "",
    BlockStore: "0x4Fc11247084757e8789B3572f4A0BE41a8d3fF1a",
  },
};

export type ContractNames =
  | "BlockToken"
  | "BlockSales"
  | "BlockStore"
  | "ProfileToken";
export default deployedContracts;
