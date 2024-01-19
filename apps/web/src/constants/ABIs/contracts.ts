import BlockSalesABI from "./blockSales.abi.json";
import BlockStoreABI from "./blockSales.abi.json";
import BlockTokenABI from "./blockSales.abi.json";
import HomeProfileABI from "./blockSales.abi.json";
import ERC20ABI from "./erc20.abi.json";
import ERC721Votes from "./ERC721Votes.abi.json";

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
      address: "0xCCAC7A50c50a997CF3fa5bC6c4022eC4441c3F87",
      abi: BlockStoreABI,
    },
    Hom3DepositVault: {
      address: "",
      abi: HomeProfileABI,
    },
  },

  maticMumbai: {
    BlockSales: {
      address: "0xC964770ff56B5F4E2F96A76A59c5a2789A243e97",
      abi: BlockSalesABI,
    },
    BlockToken: {
      address: "0x9C39352Cf68f13D2FF6a493B082E5f4947e6e5cC",
      abi: BlockTokenABI,
    },
    Hom3Profile: {
      address: "0x1c600755f35bDd47852f0B458371E4D36DcED0d6",
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

export { CONTRACTS, DEFAULT_PAYMENT_TOKEN, COST_PER_BLOCK, GENERIC_ABI };
