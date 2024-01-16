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
    BlockToken: "0x53DcCd9886eCeEDDEA1373B1A579BEE93bbf9DF3",
    BlockSales: "0xb1F04B3631073dffE5CDFfF5D26fc913b5e9B252",
  },
  maticMumbai: {
    BlockToken: "",
    BlockStore: "0x5C2DF78bDEE5f7682Af16C226b0A0A9f9832580D",
  },
};

export type ContractNames =
  | "BlockToken"
  | "BlockSales"
  | "BlockStore"
  | "ProfileToken";
export default deployedContracts;
