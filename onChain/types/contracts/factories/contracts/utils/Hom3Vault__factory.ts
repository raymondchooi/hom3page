/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  Hom3Vault,
  Hom3VaultInterface,
} from "../../../contracts/utils/Hom3Vault";

const _abi = [
  {
    inputs: [],
    name: "AllowanceToLow",
    type: "error",
  },
  {
    inputs: [],
    name: "BalanceToLow",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "note_",
        type: "string",
      },
    ],
    name: "DEVELOPMENT_ERROR",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "InvalidRouter",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractTringToMessage_",
        type: "address",
      },
    ],
    name: "MessageNotFromBlockSales",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "chainMessageOriginated",
        type: "uint64",
      },
    ],
    name: "MessageNotFromSalesChain",
    type: "error",
  },
  {
    inputs: [],
    name: "NotATrustedSpender",
    type: "error",
  },
  {
    inputs: [],
    name: "NotBlockSalesContract",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "currentBalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "calculatedFees",
        type: "uint256",
      },
    ],
    name: "NotEnoughBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "NotOwnerOfProfile",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "VaultBalanceToLow",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bool",
        name: "newState_",
        type: "bool",
      },
    ],
    name: "ContractActiveStateChange",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "profileId_",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "DepositedFunds",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "messageId_",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "profileId_",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "DepositedFundsRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "messageId_",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "sourceChainId_",
        type: "uint64",
      },
    ],
    name: "MessageReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "messageId_",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "destinationChain_",
        type: "uint64",
      },
    ],
    name: "MessageSent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "recipient_",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "messageId_",
        type: "bytes32",
      },
    ],
    name: "NewMessageSent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "profileId_",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to_",
        type: "address",
      },
    ],
    name: "ProfileOwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "profileId_",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "SetSpendAllowance",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "profileId_",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "spender_",
        type: "uint256",
      },
    ],
    name: "SetSpender",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "profileId_",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "spender_",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "SpendTriggered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "profileId_",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "WithdrewFunds",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "messageId_",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "profileId_",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "WithdrewFundsRequested",
    type: "event",
  },
  {
    inputs: [],
    name: "ETH_CHAIN_SELECTOR",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "HOM3_PROFILE",
    outputs: [
      {
        internalType: "contract IERC721A",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MATIC_CHAIN_SELECTOR",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "OP_CHAIN_SELECTOR",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SALES_CONTRACT_CHAIN",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "messageId",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "sourceChainSelector",
            type: "uint64",
          },
          {
            internalType: "bytes",
            name: "sender",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct Client.EVMTokenAmount[]",
            name: "destTokenAmounts",
            type: "tuple[]",
          },
        ],
        internalType: "struct Client.Any2EVMMessage",
        name: "message",
        type: "tuple",
      },
    ],
    name: "ccipReceive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId_",
        type: "uint256",
      },
    ],
    name: "getProfilesBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRouter",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId_",
        type: "uint256",
      },
    ],
    name: "getSpendBalanceOfProfile",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isActive",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId_",
        type: "uint256",
      },
    ],
    name: "removeSpend",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId_",
        type: "uint256",
      },
    ],
    name: "removeSpender",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "newState_",
        type: "bool",
      },
    ],
    name: "setActiveState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "setSpend",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "spender_",
        type: "uint256",
      },
    ],
    name: "setSpender",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "spender_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "calldata_",
        type: "bytes",
      },
    ],
    name: "spend",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class Hom3Vault__factory {
  static readonly abi = _abi;
  static createInterface(): Hom3VaultInterface {
    return new Interface(_abi) as Hom3VaultInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Hom3Vault {
    return new Contract(address, _abi, runner) as unknown as Hom3Vault;
  }
}
