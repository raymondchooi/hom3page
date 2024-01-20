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
  | "Hom3Vault"
  | "Hom3DepositVault";

export type ContractStore = {
  [contract in ContractNames]?: AddressAndAbi;
};

export type AddressAndAbi = { address: string; abi: any };
export type NetworkContracts = { [ChainName in string]: ContractStore };
export type DefaultPaymentContracts = { [chain in ChainName]?: string };

const CONTRACTS: NetworkContracts = {
  ethSepolia: {
    BlockStore: {
      address: "0x56ba4D9bBF5f09c6A26058Df860c827aA6BbBb87",
      abi: BlockStoreABI,
    },
    Hom3DepositVault: {
      address: "",
      abi: HomeProfileABI,
    },
  },

  maticMumbai: {
    BlockSales: {
      address: "0xE629EF1D4d323B20Dd06e089d45685144A4BF10D",
      abi: BlockSalesABI,
    },
    BlockToken: {
      address: "0x779a11C46ecA0B2499cE01fA35A8782A3256EB8E",
      abi: BlockTokenABI,
    },
    Hom3Profile: {
      address: "0x0474BA84f278B54a8218aeD95814a03187763854",
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
const COST_PER_PROFILE = 100 * 10 ** 8;

export {
  CONTRACTS,
  DEFAULT_PAYMENT_TOKEN,
  COST_PER_BLOCK,
  GENERIC_ABI,
  COST_PER_PROFILE,
};
