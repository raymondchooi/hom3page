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
      address: "0x818347992122e555d716f07Cbab4fd233196e9d3",
      abi: BlockStoreABI,
    },
    Hom3DepositVault: {
      address: "0x91eb7D4B947Cf4c507E9860BbA063f55a2820B11",
      abi: HomeProfileABI,
    },
  },

  maticMumbai: {
    BlockSales: {
      address: "0x22E50B8B4d7994532C5C3bbe542e7E4F03acd953",
      abi: BlockSalesABI,
    },
    BlockToken: {
      address: "0x8aE97C5D8e894F0955e33299F84444fCdcAf89Fb",
      abi: BlockTokenABI,
    },
    Hom3Profile: {
      address: "0xb4F61A23869ce63F411e17BDAe6Db5d08eeA2da1",
      abi: HomeProfileABI,
    },
  },
};

const DEFAULT_PAYMENT_TOKEN: DefaultPaymentContracts = {
  ethSepolia: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60",
  maticMumbai: "0x52D800ca262522580CeBAD275395ca6e7598C014",
};

const GENERIC_ABI = {
  ERC20: ERC20ABI,
  ERC721: ERC721Votes,
  ERC721Votes: ERC721Votes,
};

const COST_PER_BLOCK: { [chain in ChainName]?: number } = {
  maticMumbai: 100 * 10 ** 6,
  ethSepolia: 100 * 10 ** 18,
};
const COST_PER_PROFILE: { [chain in ChainName]?: number } = {
  maticMumbai: 100 * 10 ** 6,
  ethSepolia: 100 * 10 ** 18,
};

export {
  CONTRACTS,
  DEFAULT_PAYMENT_TOKEN,
  COST_PER_BLOCK,
  GENERIC_ABI,
  COST_PER_PROFILE,
};
