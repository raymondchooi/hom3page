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
    BlockStore: "0x818347992122e555d716f07Cbab4fd233196e9d3",
    Hom3Profile: "",
    Hom3DepositVault: "0x91eb7D4B947Cf4c507E9860BbA063f55a2820B11",
  },
  opGoerli: {
    BlockToken: "",
    BlockSales: "",
    Hom3Profile: "",
  },
  maticMumbai: {
    BlockToken: "0x8aE97C5D8e894F0955e33299F84444fCdcAf89Fb",
    BlockSales: "0x22E50B8B4d7994532C5C3bbe542e7E4F03acd953",
    BlockStore: "",
    Hom3Profile: "0xb4F61A23869ce63F411e17BDAe6Db5d08eeA2da1",
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
