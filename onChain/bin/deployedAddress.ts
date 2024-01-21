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
    Hom3DepositVault: "0x24aFE650dfD67042E6Ae214d498dC44A9CdB49c0",
  },
  opGoerli: {
    BlockToken: "",
    BlockSales: "",
    Hom3Profile: "",
  },
  maticMumbai: {
    BlockToken: "0xaA15B19EE877F1e1bdb92f0B3C57c0bc5Ad6b960",
    BlockSales: "0x5fB3A6D132F8d8eA2B4b4D81230ffce81D9740eD",
    BlockStore: "",
    Hom3Profile: "0x82F1a21aa77b9d5AfAa62Fb310961055133B21Ff",
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
