/** @format */

import { Addressable } from "ethers";
import { ChainName } from "./tokenAddress";

const deployedContracts: {
  [chain in ChainName]?: { [name in ContractNames]?: string | Addressable };
} = {
  hardhat: {
    BlockToken: "",
    BlockSales: "",
    BlockStore: "",
  },
  ethSepolia: {
    BlockToken: "",
    BlockStore: "0x7B3088FAf5647480aD814c68933e1bB025A70250",
  },
  opGoerli: {
    BlockToken: "",
    BlockSales: "",
  },
  maticMumbai: {
    BlockToken: "0xfC188d60Db347E24056878492253574E36c00fce",
    BlockSales: "0xB83F4A0ECa3384986de75113D119FEa5C462F42f",
    BlockStore: "",
  },
};

export type ContractNames =
  | "BlockToken"
  | "BlockSales"
  | "BlockStore"
  | "ProfileToken";
export default deployedContracts;
