import BlockSalesABI from "./blockSales.abi.json";
import BlockStoreABI from "./blockStore.sbi.json";
import BlockTokenABI from "./blockToken.abi.json";
import HomeProfileABI from "./hom3Profile.abi.json";
import ERC20ABI from "./erc20.abi.json";
import ERC721Votes from "./erc721Votes.abi.json";

export type ChainName =
  | "eth"
  | "ethGoerli"
  | "ethSepolia"
  | "arbitrum"
  | "arbGoerli"
  | "arbSepolia"
  | "optimism"
  | "opGoerli"
  | "matic"
  | "maticMumbai"
  | "baseGoerli"
  | "hardhat"
  | "localhost";

export type ContractNames =
  | "BlockToken"
  | "BlockSales"
  | "BlockStore"
  | "Hom3Profile"
  | "Hom3DepositVault"
  | "AaveFaucetbApp";

export type ContractStore = {
  [contract in ContractNames]?: AddressAndAbi;
};

export type AddressAndAbi = { address: string; abi: any };
export type NetworkContracts = { [ChainName in string]: ContractStore };
export type DefaultPaymentContracts = { [chain in ChainName]?: string };

const CONTRACTS: NetworkContracts = {
  ethSepolia: {
    BlockStore: {
      address: "0xA965C4feE7935a846A5b097b398B5Bb8BcbcD60A",
      abi: BlockStoreABI,
    },
    Hom3DepositVault: {
      address: "0x24aFE650dfD67042E6Ae214d498dC44A9CdB49c0",
      abi: HomeProfileABI,
    },
  },

  maticMumbai: {
    BlockSales: {
      address: "0xF3A175F048Bb83f5F519a251628dBa123DE7DB77",
      abi: BlockSalesABI,
    },
    BlockToken: {
      address: "0xE20D33EFD7CfE8258efbb6BdaE6c149941e7dac9",
      abi: BlockTokenABI,
    },
    Hom3Profile: {
      address: "0xd6fBf2bFed1330E8B8859cA3a72170fFE9c99256",
      abi: HomeProfileABI,
    },
  },
};

const DEFAULT_PAYMENT_TOKEN: DefaultPaymentContracts = {
  ethSepolia: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",
  maticMumbai: "0x52D800ca262522580CeBAD275395ca6e7598C014",
};

const GENERIC_ABI = {
  ERC20: ERC20ABI,
  ERC721: ERC721Votes,
  ERC721Votes: ERC721Votes,
};

const COST_PER_BLOCK = 100 * 10 ** 6;
const COST_PER_PROFILE = 100 * 10 ** 6;

export {
  CONTRACTS,
  DEFAULT_PAYMENT_TOKEN,
  COST_PER_BLOCK,
  GENERIC_ABI,
  COST_PER_PROFILE,
};
