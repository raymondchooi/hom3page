/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  DeployContractOptions,
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomicfoundation/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "IVotes",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IVotes__factory>;
    getContractFactory(
      name: "Votes",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Votes__factory>;
    getContractFactory(
      name: "IERC5267",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC5267__factory>;
    getContractFactory(
      name: "IERC5805",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC5805__factory>;
    getContractFactory(
      name: "IERC6372",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC6372__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721__factory>;
    getContractFactory(
      name: "ECDSA",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ECDSA__factory>;
    getContractFactory(
      name: "EIP712",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.EIP712__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "Math",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Math__factory>;
    getContractFactory(
      name: "SafeCast",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SafeCast__factory>;
    getContractFactory(
      name: "Nonces",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Nonces__factory>;
    getContractFactory(
      name: "ReentrancyGuard",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ReentrancyGuard__factory>;
    getContractFactory(
      name: "ShortStrings",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ShortStrings__factory>;
    getContractFactory(
      name: "Strings",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Strings__factory>;
    getContractFactory(
      name: "Checkpoints",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Checkpoints__factory>;
    getContractFactory(
      name: "BlockSales",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BlockSales__factory>;
    getContractFactory(
      name: "WallGenerator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WallGenerator__factory>;
    getContractFactory(
      name: "IBlockSale",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBlockSale__factory>;
    getContractFactory(
      name: "IBlockToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBlockToken__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "IWallGenerator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWallGenerator__factory>;
    getContractFactory(
      name: "OnlyActive",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OnlyActive__factory>;
    getContractFactory(
      name: "BlockToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BlockToken__factory>;
    getContractFactory(
      name: "InnerBlockToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.InnerBlockToken__factory>;
    getContractFactory(
      name: "StINRWLToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StINRWLToken__factory>;
    getContractFactory(
      name: "ERC721AVotes",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721AVotes__factory>;
    getContractFactory(
      name: "ERC721A__IERC721Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721A__IERC721Receiver__factory>;
    getContractFactory(
      name: "ERC721A",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721A__factory>;
    getContractFactory(
      name: "IERC721A",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721A__factory>;

    getContractAt(
      name: "Ownable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "IVotes",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IVotes>;
    getContractAt(
      name: "Votes",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Votes>;
    getContractAt(
      name: "IERC5267",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC5267>;
    getContractAt(
      name: "IERC5805",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC5805>;
    getContractAt(
      name: "IERC6372",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC6372>;
    getContractAt(
      name: "IERC20",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "IERC721",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721>;
    getContractAt(
      name: "ECDSA",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ECDSA>;
    getContractAt(
      name: "EIP712",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.EIP712>;
    getContractAt(
      name: "IERC165",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "Math",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Math>;
    getContractAt(
      name: "SafeCast",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.SafeCast>;
    getContractAt(
      name: "Nonces",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Nonces>;
    getContractAt(
      name: "ReentrancyGuard",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ReentrancyGuard>;
    getContractAt(
      name: "ShortStrings",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ShortStrings>;
    getContractAt(
      name: "Strings",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Strings>;
    getContractAt(
      name: "Checkpoints",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Checkpoints>;
    getContractAt(
      name: "BlockSales",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.BlockSales>;
    getContractAt(
      name: "WallGenerator",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.WallGenerator>;
    getContractAt(
      name: "IBlockSale",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IBlockSale>;
    getContractAt(
      name: "IBlockToken",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IBlockToken>;
    getContractAt(
      name: "IERC20",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "IWallGenerator",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IWallGenerator>;
    getContractAt(
      name: "OnlyActive",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.OnlyActive>;
    getContractAt(
      name: "BlockToken",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.BlockToken>;
    getContractAt(
      name: "InnerBlockToken",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.InnerBlockToken>;
    getContractAt(
      name: "StINRWLToken",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.StINRWLToken>;
    getContractAt(
      name: "ERC721AVotes",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721AVotes>;
    getContractAt(
      name: "ERC721A__IERC721Receiver",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721A__IERC721Receiver>;
    getContractAt(
      name: "ERC721A",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721A>;
    getContractAt(
      name: "IERC721A",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721A>;

    deployContract(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Ownable>;
    deployContract(
      name: "IVotes",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IVotes>;
    deployContract(
      name: "Votes",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Votes>;
    deployContract(
      name: "IERC5267",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC5267>;
    deployContract(
      name: "IERC5805",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC5805>;
    deployContract(
      name: "IERC6372",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC6372>;
    deployContract(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20>;
    deployContract(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721>;
    deployContract(
      name: "ECDSA",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ECDSA>;
    deployContract(
      name: "EIP712",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.EIP712>;
    deployContract(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC165>;
    deployContract(
      name: "Math",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Math>;
    deployContract(
      name: "SafeCast",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.SafeCast>;
    deployContract(
      name: "Nonces",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Nonces>;
    deployContract(
      name: "ReentrancyGuard",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ReentrancyGuard>;
    deployContract(
      name: "ShortStrings",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ShortStrings>;
    deployContract(
      name: "Strings",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Strings>;
    deployContract(
      name: "Checkpoints",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Checkpoints>;
    deployContract(
      name: "BlockSales",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.BlockSales>;
    deployContract(
      name: "WallGenerator",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WallGenerator>;
    deployContract(
      name: "IBlockSale",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IBlockSale>;
    deployContract(
      name: "IBlockToken",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IBlockToken>;
    deployContract(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20>;
    deployContract(
      name: "IWallGenerator",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWallGenerator>;
    deployContract(
      name: "OnlyActive",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.OnlyActive>;
    deployContract(
      name: "BlockToken",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.BlockToken>;
    deployContract(
      name: "InnerBlockToken",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.InnerBlockToken>;
    deployContract(
      name: "StINRWLToken",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.StINRWLToken>;
    deployContract(
      name: "ERC721AVotes",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC721AVotes>;
    deployContract(
      name: "ERC721A__IERC721Receiver",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC721A__IERC721Receiver>;
    deployContract(
      name: "ERC721A",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC721A>;
    deployContract(
      name: "IERC721A",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721A>;

    deployContract(
      name: "Ownable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Ownable>;
    deployContract(
      name: "IVotes",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IVotes>;
    deployContract(
      name: "Votes",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Votes>;
    deployContract(
      name: "IERC5267",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC5267>;
    deployContract(
      name: "IERC5805",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC5805>;
    deployContract(
      name: "IERC6372",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC6372>;
    deployContract(
      name: "IERC20",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20>;
    deployContract(
      name: "IERC721",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721>;
    deployContract(
      name: "ECDSA",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ECDSA>;
    deployContract(
      name: "EIP712",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.EIP712>;
    deployContract(
      name: "IERC165",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC165>;
    deployContract(
      name: "Math",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Math>;
    deployContract(
      name: "SafeCast",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.SafeCast>;
    deployContract(
      name: "Nonces",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Nonces>;
    deployContract(
      name: "ReentrancyGuard",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ReentrancyGuard>;
    deployContract(
      name: "ShortStrings",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ShortStrings>;
    deployContract(
      name: "Strings",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Strings>;
    deployContract(
      name: "Checkpoints",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Checkpoints>;
    deployContract(
      name: "BlockSales",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.BlockSales>;
    deployContract(
      name: "WallGenerator",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WallGenerator>;
    deployContract(
      name: "IBlockSale",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IBlockSale>;
    deployContract(
      name: "IBlockToken",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IBlockToken>;
    deployContract(
      name: "IERC20",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20>;
    deployContract(
      name: "IWallGenerator",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWallGenerator>;
    deployContract(
      name: "OnlyActive",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.OnlyActive>;
    deployContract(
      name: "BlockToken",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.BlockToken>;
    deployContract(
      name: "InnerBlockToken",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.InnerBlockToken>;
    deployContract(
      name: "StINRWLToken",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.StINRWLToken>;
    deployContract(
      name: "ERC721AVotes",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC721AVotes>;
    deployContract(
      name: "ERC721A__IERC721Receiver",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC721A__IERC721Receiver>;
    deployContract(
      name: "ERC721A",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC721A>;
    deployContract(
      name: "IERC721A",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721A>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
  }
}
