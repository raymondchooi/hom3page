
import BlockSalesABI from "./blockSales.abi.json"
import BlockStoreABI from "./blockSales.abi.json"
import BlockTokenABI from "./blockSales.abi.json"
import HomeProfileABI from "./blockSales.abi.json"


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
  | "Hom3ProfileToken"
  | "Hom3ProfileShadow"
  | "Hom3Vault"
  | "Hom3DepositVault";

  export type ContractStore = {[contract in ContractNames]?:  {address: string , abi: any}}
  export type NetworkContracts = {[ChainName in string]: ContractStore};
  export type DefaultPaymentContracts = {[chain in ChainName]?: string}

const CONTRACTS: NetworkContracts = {
    ethSepolia:  {
        BlockStore: {
                address: "0x03F09634Ca9Cd65999e4Dbd15bc558F757e67B00", abi:BlockStoreABI 
        }
    },
  
    maticMumbai:  {
        BlockSales: {
                address: "0xd569f2D569C7439c869208B533436c1F6474c397", abi:BlockSalesABI 
        },
         BlockToken: {
                address: "0x08a41fe84A22bf962559886A0c0957fc7E84af4D", abi:BlockTokenABI 
        },  
        Hom3ProfileToken: {
                address: "", abi:HomeProfileABI 
        }
    }
    
}

 const DEFAULT_PAYMENT_TOKEN: DefaultPaymentContracts = {
    ethSepolia:"0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",
   maticMumbai:"0x52D800ca262522580CeBAD275395ca6e7598C014"

}
    export  {CONTRACTS,DEFAULT_PAYMENT_TOKEN};


/**  {BlockToken: {},
    BlockSales: {},
    BlockStore: {},
    ProfileToken: {},
    Hom3Vault: {},
    Hom3ProfileToken:{} */