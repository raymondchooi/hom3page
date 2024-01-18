/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IBlockSales,
  IBlockSalesInterface,
} from "../../../contracts/interfaces/IBlockSales";

const _abi = [
  {
    inputs: [],
    name: "OrderExceedsMaxAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "OrderToLargeMax10",
    type: "error",
  },
  {
    inputs: [],
    name: "ToManyElementsInBuyArray",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "messageId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "uint64",
        name: "sourceChainSelector",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        components: [
          {
            internalType: "uint256[][]",
            name: "tokens_",
            type: "uint256[][]",
          },
          {
            internalType: "uint256",
            name: "totalItems_",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "buyer_",
            type: "address",
          },
          {
            internalType: "bool",
            name: "multiBuy_",
            type: "bool",
          },
        ],
        indexed: false,
        internalType: "struct IBlockSales.Sale",
        name: "payload",
        type: "tuple",
      },
    ],
    name: "MessageReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "messageId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "uint64",
        name: "destinationChainSelector",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "MessageSent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint64",
        name: "chainId_",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "messageId_",
        type: "bytes32",
      },
    ],
    name: "SaleFailed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer_",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint64",
        name: "chainId_",
        type: "uint64",
      },
    ],
    name: "SaleMade",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256[][]",
        name: "tokenIds_",
        type: "uint256[][]",
      },
    ],
    name: "buyBatchBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "buyBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
    ],
    name: "withdrawBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress_",
        type: "address",
      },
    ],
    name: "withdrawTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IBlockSales__factory {
  static readonly abi = _abi;
  static createInterface(): IBlockSalesInterface {
    return new Interface(_abi) as IBlockSalesInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): IBlockSales {
    return new Contract(address, _abi, runner) as unknown as IBlockSales;
  }
}
