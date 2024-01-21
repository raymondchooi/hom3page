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
      address: "0x27b634838Bd398Ef06D691c749046414e81FA3eF",
      abi: BlockStoreABI,
    },
    Hom3DepositVault: {
      address: "0xd30e45e78c876964AC9FB591230659B3D6aF3e1D",
      abi: HomeProfileABI,
    },
  },

  maticMumbai: {
    BlockSales: {
      address: "0x5fB3A6D132F8d8eA2B4b4D81230ffce81D9740eD",
      abi: BlockSalesABI,
    },
    BlockToken: {
      address: "0xaA15B19EE877F1e1bdb92f0B3C57c0bc5Ad6b960",
      abi: BlockTokenABI,
    },
    Hom3Profile: {
      address: "0x82F1a21aa77b9d5AfAa62Fb310961055133B21Ff",
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
