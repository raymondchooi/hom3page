/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IAaveFaucet,
  IAaveFaucetInterface,
} from "../../../../contracts/apps/aaveFaucet.sol/IAaveFaucet";

const _abi = [
  {
    inputs: [],
    name: "MAX_MINT_AMOUNT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "value",
        type: "bool",
      },
    ],
    name: "setPermissioned",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IAaveFaucet__factory {
  static readonly abi = _abi;
  static createInterface(): IAaveFaucetInterface {
    return new Interface(_abi) as IAaveFaucetInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): IAaveFaucet {
    return new Contract(address, _abi, runner) as unknown as IAaveFaucet;
  }
}
