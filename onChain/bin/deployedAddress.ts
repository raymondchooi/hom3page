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
    BlockToken: "0xc416Ec65c420996c7B6081138AaCC241C8150f3d",
    BlockSales: "0xa6eF7147009E8F3E0613A6fEb231f94EE797379c",
  },
  maticMumbai: {
    BlockToken: "",
    BlockStore: "0x7a51d1a947CCbEae3457667c7D746038F6271f39",
  },
};

export type ContractNames =
  | "BlockToken"
  | "BlockSales"
  | "BlockStore"
  | "ProfileToken";
export default deployedContracts;
