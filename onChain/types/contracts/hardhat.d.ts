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
      name: "CCIPReceiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CCIPReceiver__factory>;
    getContractFactory(
      name: "IAny2EVMMessageReceiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAny2EVMMessageReceiver__factory>;
    getContractFactory(
      name: "IRouterClient",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRouterClient__factory>;
    getContractFactory(
      name: "Client",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Client__factory>;
    getContractFactory(
      name: "ConfirmedOwner",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ConfirmedOwner__factory>;
    getContractFactory(
      name: "ConfirmedOwnerWithProposal",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ConfirmedOwnerWithProposal__factory>;
    getContractFactory(
      name: "OwnerIsCreator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OwnerIsCreator__factory>;
    getContractFactory(
      name: "IOwnable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IOwnable__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "LinkTokenInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LinkTokenInterface__factory>;
    getContractFactory(
      name: "IAccessControl",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAccessControl__factory>;
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
      name: "IERC1155Errors",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155Errors__factory>;
    getContractFactory(
      name: "IERC20Errors",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Errors__factory>;
    getContractFactory(
      name: "IERC721Errors",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Errors__factory>;
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
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
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
      name: "WallGenerator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WallGenerator__factory>;
    getContractFactory(
      name: "IBlockSales",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBlockSales__factory>;
    getContractFactory(
      name: "IBlockStore",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBlockStore__factory>;
    getContractFactory(
      name: "IBlockToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBlockToken__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "IGhoToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IGhoToken__factory>;
    getContractFactory(
      name: "IWallGenerator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWallGenerator__factory>;
    getContractFactory(
      name: "OnlyActive",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OnlyActive__factory>;
    getContractFactory(
      name: "BlockSales",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BlockSales__factory>;
    getContractFactory(
      name: "BlockStore",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BlockStore__factory>;
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
      name: "CCIPReceiver",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.CCIPReceiver>;
    getContractAt(
      name: "IAny2EVMMessageReceiver",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IAny2EVMMessageReceiver>;
    getContractAt(
      name: "IRouterClient",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IRouterClient>;
    getContractAt(
      name: "Client",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Client>;
    getContractAt(
      name: "ConfirmedOwner",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ConfirmedOwner>;
    getContractAt(
      name: "ConfirmedOwnerWithProposal",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ConfirmedOwnerWithProposal>;
    getContractAt(
      name: "OwnerIsCreator",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.OwnerIsCreator>;
    getContractAt(
      name: "IOwnable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IOwnable>;
    getContractAt(
      name: "IERC165",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "LinkTokenInterface",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.LinkTokenInterface>;
    getContractAt(
      name: "IAccessControl",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IAccessControl>;
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
      name: "IERC1155Errors",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155Errors>;
    getContractAt(
      name: "IERC20Errors",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Errors>;
    getContractAt(
      name: "IERC721Errors",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Errors>;
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
      name: "ERC20",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "IERC20Metadata",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
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
      name: "WallGenerator",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.WallGenerator>;
    getContractAt(
      name: "IBlockSales",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IBlockSales>;
    getContractAt(
      name: "IBlockStore",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IBlockStore>;
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
      name: "IGhoToken",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IGhoToken>;
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
      name: "BlockSales",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.BlockSales>;
    getContractAt(
      name: "BlockStore",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.BlockStore>;
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
      name: "CCIPReceiver",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.CCIPReceiver>;
    deployContract(
      name: "IAny2EVMMessageReceiver",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IAny2EVMMessageReceiver>;
    deployContract(
      name: "IRouterClient",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IRouterClient>;
    deployContract(
      name: "Client",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Client>;
    deployContract(
      name: "ConfirmedOwner",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ConfirmedOwner>;
    deployContract(
      name: "ConfirmedOwnerWithProposal",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ConfirmedOwnerWithProposal>;
    deployContract(
      name: "OwnerIsCreator",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.OwnerIsCreator>;
    deployContract(
      name: "IOwnable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IOwnable>;
    deployContract(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC165>;
    deployContract(
      name: "LinkTokenInterface",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.LinkTokenInterface>;
    deployContract(
      name: "IAccessControl",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IAccessControl>;
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
      name: "IERC1155Errors",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC1155Errors>;
    deployContract(
      name: "IERC20Errors",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Errors>;
    deployContract(
      name: "IERC721Errors",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721Errors>;
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
      name: "ERC20",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC20>;
    deployContract(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Metadata>;
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
      name: "WallGenerator",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WallGenerator>;
    deployContract(
      name: "IBlockSales",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IBlockSales>;
    deployContract(
      name: "IBlockStore",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IBlockStore>;
    deployContract(
      name: "IBlockToken",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IBlockToken>;
    deployContract(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20>;
    deployContract(
      name: "IGhoToken",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IGhoToken>;
    deployContract(
      name: "IWallGenerator",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWallGenerator>;
    deployContract(
      name: "OnlyActive",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.OnlyActive>;
    deployContract(
      name: "BlockSales",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.BlockSales>;
    deployContract(
      name: "BlockStore",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.BlockStore>;
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
      name: "CCIPReceiver",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.CCIPReceiver>;
    deployContract(
      name: "IAny2EVMMessageReceiver",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IAny2EVMMessageReceiver>;
    deployContract(
      name: "IRouterClient",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IRouterClient>;
    deployContract(
      name: "Client",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Client>;
    deployContract(
      name: "ConfirmedOwner",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ConfirmedOwner>;
    deployContract(
      name: "ConfirmedOwnerWithProposal",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ConfirmedOwnerWithProposal>;
    deployContract(
      name: "OwnerIsCreator",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.OwnerIsCreator>;
    deployContract(
      name: "IOwnable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IOwnable>;
    deployContract(
      name: "IERC165",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC165>;
    deployContract(
      name: "LinkTokenInterface",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.LinkTokenInterface>;
    deployContract(
      name: "IAccessControl",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IAccessControl>;
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
      name: "IERC1155Errors",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC1155Errors>;
    deployContract(
      name: "IERC20Errors",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Errors>;
    deployContract(
      name: "IERC721Errors",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721Errors>;
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
      name: "ERC20",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC20>;
    deployContract(
      name: "IERC20Metadata",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Metadata>;
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
      name: "WallGenerator",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WallGenerator>;
    deployContract(
      name: "IBlockSales",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IBlockSales>;
    deployContract(
      name: "IBlockStore",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IBlockStore>;
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
      name: "IGhoToken",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IGhoToken>;
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
      name: "BlockSales",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.BlockSales>;
    deployContract(
      name: "BlockStore",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.BlockStore>;
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
