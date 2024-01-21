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
    Hom3Profile: "",
  },
  ethSepolia: {
    BlockToken: "",
    BlockStore: "0xA965C4feE7935a846A5b097b398B5Bb8BcbcD60A",
    Hom3Profile: "",
    Hom3DepositVault: "0xb3AE95217103d8DFccbbAa99d9b47B65c6b69B53",
  },
  opGoerli: {
    BlockToken: "",
    BlockSales: "",
    Hom3Profile: "",
  },
  maticMumbai: {
    BlockToken: "0xE20D33EFD7CfE8258efbb6BdaE6c149941e7dac9",
    BlockSales: "0xF3A175F048Bb83f5F519a251628dBa123DE7DB77",
    BlockStore: "",
    Hom3Profile: "0xd6fBf2bFed1330E8B8859cA3a72170fFE9c99256",
  },
};

export type ContractNames =
  | "BlockToken"
  | "BlockSales"
  | "BlockStore"
  | "Hom3Profile"
  | "Hom3DepositVault"
  | "AaveFaucetbApp";
export default deployedContracts;
