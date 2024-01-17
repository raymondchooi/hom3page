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
    BlockToken: "0x7dD5125bDbE07DaA9CEAF95F2A1C8F3F4cCbd6ed",
    BlockSales: "0x1C78c73D0feA80e8Dab372688f1f98D7F1f464C9",
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
