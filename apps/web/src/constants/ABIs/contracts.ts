import BlockSalesABI from "./blockSales.abi.json";
import BlockStoreABI from "./blockSales.abi.json";
import BlockTokenABI from "./blockSales.abi.json";
import HomeProfileABI from "./blockSales.abi.json";
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
      address: "0xC4A39bAe63852a613eFf1a53d8d3C28fbbaDE6A6",
      abi: BlockSalesABI,
    },
    BlockToken: {
      address: "0x75BDd507A8ad2C8AE2bA502C85D96c1674a89730",
      abi: BlockTokenABI,
    },
    Hom3Profile: {
      address: "0xDF89c68491B07E221Ffb7334b5FD0a617Da8aA01",
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
