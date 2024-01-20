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
    BlockStore: "0x0F279624F44F3FaC67BA1547A165457913DeD7cf",
    Hom3Profile: "",
    Hom3DepositVault: "",
  },
  opGoerli: {
    BlockToken: "",
    BlockSales: "",
    Hom3Profile: "",
  },
  maticMumbai: {
    BlockToken: "0xa50A72E53175B6a1e7dE552221D960B38584713F",
    BlockSales: "0x074Df023e2c8c72F24f1F3d7381B71824408ABE3",
    BlockStore: "",
    Hom3Profile: "0x63AF5474c1a626036352b28B33094004385F2590",
    Hom3Vault: "",
  },
};

export type ContractNames =
  | "BlockToken"
  | "BlockSales"
  | "BlockStore"
  | "Hom3Profile"
  | "Hom3ProfileShadow"
  | "Hom3Vault"
  | "Hom3DepositVault"
  | "AaveFaucetbApp";
export default deployedContracts;
