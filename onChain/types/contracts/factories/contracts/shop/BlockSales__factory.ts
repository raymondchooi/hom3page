/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  BlockSales,
  BlockSalesInterface,
} from "../../../contracts/shop/BlockSales";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "NFTAddress_",
        type: "address",
      },
      {
        internalType: "address",
        name: "paymentToken_",
        type: "address",
      },
      {
        internalType: "address",
        name: "ccipRouter_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
    name: "OrderExceedsMaxAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "OrderToLargeMax10",
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
    name: "ReentrancyGuardReentrantCall",
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
      {
        components: [
          {
            internalType: "bytes32",
            name: "salesMessageId_",
            type: "bytes32",
          },
          {
            internalType: "bool",
            name: "success",
            type: "bool",
          },
        ],
        indexed: false,
        internalType: "struct IBlockSales.SaleRecipe",
        name: "payload",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "address",
        name: "feeToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fees",
        type: "uint256",
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
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "NFT",
    outputs: [
      {
        internalType: "contract IERC721",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PAYMENT_TOKEN",
    outputs: [
      {
        internalType: "contract IERC20",
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
    inputs: [],
    name: "getBlockCost",
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
        internalType: "uint64",
        name: "chainId_",
        type: "uint64",
      },
    ],
    name: "getChainBlockStore",
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
    inputs: [],
    name: "getTotalSold",
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
        internalType: "uint64",
        name: "chainId_",
        type: "uint64",
      },
      {
        internalType: "address",
        name: "contractAddress_",
        type: "address",
      },
    ],
    name: "setBlockStore",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "chainId_",
        type: "uint64",
      },
      {
        internalType: "bool",
        name: "flag_",
        type: "bool",
      },
    ],
    name: "setBlockStoreActive",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "withdrawAddress_",
        type: "address",
      },
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
    inputs: [
      {
        internalType: "address payable",
        name: "withdrawAddress_",
        type: "address",
      },
    ],
    name: "withdrawFunds",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "withdrawAddress_",
        type: "address",
      },
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
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x60e06040526001805460ff60a01b1916600160a01b1790553480156200002457600080fd5b506040516200216938038062002169833981016040819052620000479162000157565b33816001600160a01b03811662000079576040516335fdcccd60e21b8152600060048201526024015b60405180910390fd5b6001600160a01b0390811660805260016000558116620000b057604051631e4fbdf760e01b81526000600482015260240162000070565b620000bb81620000e8565b50600280546001600160a01b0319166001600160a01b0392831617905591821660a0521660c052620001a1565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b80516001600160a01b03811681146200015257600080fd5b919050565b6000806000606084860312156200016d57600080fd5b62000178846200013a565b925062000188602085016200013a565b915062000198604085016200013a565b90509250925092565b60805160a05160c051611f4462000225600039600081816102af01528181610609015281816106f001528181610cd60152610dbe01526000818161024301528181610539015281816107bd0152818161097101528181610a5e01528181610ea0015281816114e201526115f70152600081816103730152610ac90152611f446000f3fe60806040526004361061014b5760003560e01c80638b8fb480116100b4578063b0f479a11161006e578063bfe22a0111610056578063bfe22a01146103b7578063d2aac3b7146103d7578063f2fde38b1461041757005b8063b0f479a114610364578063bfac0b461461039757005b80639d7b8e681161009c5780639d7b8e681461030f578063a13157ca14610324578063a522ad251461034457005b80638b8fb480146102d15780638da5cb5b146102f157005b8063715018a6116101055780637c0b8de2116100ed5780637c0b8de21461023157806385572ffb1461027d578063877c86fb1461029d57005b8063715018a6146101fc57806372875c2d1461021157005b806322f3e2d41161013357806322f3e2d4146101aa57806354b58b1c146101c957806368742da6146101e957005b806301ffc9a714610154578063028acce41461018957005b3661015257005b005b34801561016057600080fd5b5061017461016f3660046116ed565b610437565b60405190151581526020015b60405180910390f35b34801561019557600080fd5b506305f5e1005b604051908152602001610180565b3480156101b657600080fd5b50600154600160a01b900460ff16610174565b3480156101d557600080fd5b506101526101e436600461171e565b6104a0565b6101526101f736600461174c565b610881565b34801561020857600080fd5b50610152610935565b34801561021d57600080fd5b5061015261022c366004611769565b610949565b34801561023d57600080fd5b506102657f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b039091168152602001610180565b34801561028957600080fd5b50610152610298366004611795565b610abe565b3480156102a957600080fd5b506102657f000000000000000000000000000000000000000000000000000000000000000081565b3480156102dd57600080fd5b506101526102ec3660046117ed565b610b33565b3480156102fd57600080fd5b506001546001600160a01b0316610265565b34801561031b57600080fd5b5060055461019c565b34801561033057600080fd5b5061015261033f366004611824565b610b82565b34801561035057600080fd5b5061015261035f366004611899565b610ffb565b34801561037057600080fd5b507f0000000000000000000000000000000000000000000000000000000000000000610265565b3480156103a357600080fd5b506101526103b23660046118c5565b611120565b3480156103c357600080fd5b506101526103d23660046118f1565b611154565b3480156103e357600080fd5b506102656103f236600461190e565b67ffffffffffffffff166000908152600360205260409020546001600160a01b031690565b34801561042357600080fd5b5061015261043236600461174c565b611165565b60006001600160e01b031982167f85572ffb00000000000000000000000000000000000000000000000000000000148061049a57506001600160e01b031982167f01ffc9a700000000000000000000000000000000000000000000000000000000145b92915050565b6104a86111b9565b600154600160a01b900460ff166105195760405162461bcd60e51b815260206004820152602a60248201527f4f6e6c79416374697665203a205b69734163746976655d20436f6e7472616374604482015269081a5cc81c185d5cd95960b21b60648201526084015b60405180910390fd5b6040516331a9108f60e11b81526004810182905230906001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690636352211e90602401602060405180830381865afa158015610580573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105a49190611934565b6001600160a01b0316146105fa5760405162461bcd60e51b815260206004820152601360248201527f546f6b656e206e6f7420617661696c61626c65000000000000000000000000006044820152606401610510565b6305f5e1006001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000166370a08231336040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401602060405180830381865afa158015610673573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106979190611951565b116106e45760405162461bcd60e51b815260206004820152601160248201527f496e636f7272656374207061796d656e740000000000000000000000000000006044820152606401610510565b60006001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000166323b872dd336040516001600160e01b031960e084901b1681526001600160a01b0390911660048201523060248201526305f5e10060448201526064016020604051808303816000875af115801561076c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107909190611975565b9050801561087357604080516323b872dd60e01b81523060048201523360248201526044810184905290517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316916323b872dd91606480830192600092919082900301818387803b15801561080c57600080fd5b505af1158015610820573d6000803e3d6000fd5b505060058054925090506000610835836119a8565b90915550506040516724f9b897ef58a9229060019033907f047841b20d72ff4d89c31178c8efbca759323fd200d8b7694334bccc3fb99ad290600090a45b5061087e6001600055565b50565b6108896111fc565b604051479060009081906001600160a01b0385169084908381818185875af1925050503d80600081146108d8576040519150601f19603f3d011682016040523d82523d6000602084013e6108dd565b606091505b50915091508161092f5760405162461bcd60e51b815260206004820152601460248201527f4661696c656420746f2073656e642045746865720000000000000000000000006044820152606401610510565b50505050565b61093d6111fc565b6109476000611242565b565b6109516111fc565b6040516331a9108f60e11b81526004810182905230906001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690636352211e90602401602060405180830381865afa1580156109b8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109dc9190611934565b6001600160a01b031614610a325760405162461bcd60e51b815260206004820152601360248201527f546f6b656e206e6f7420617661696c61626c65000000000000000000000000006044820152606401610510565b6040516323b872dd60e01b81523060048201526001600160a01b038381166024830152604482018390527f000000000000000000000000000000000000000000000000000000000000000016906323b872dd90606401600060405180830381600087803b158015610aa257600080fd5b505af1158015610ab6573d6000803e3d6000fd5b505050505050565b336001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614610b22576040517fd7f73334000000000000000000000000000000000000000000000000000000008152336004820152602401610510565b61087e610b2e82611ba3565b6112a1565b610b3b6111fc565b67ffffffffffffffff919091166000908152600360205260409020805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03909216919091179055565b610b8a6111b9565b600154600160a01b900460ff16610bf65760405162461bcd60e51b815260206004820152602a60248201527f4f6e6c79416374697665203a205b69734163746976655d20436f6e7472616374604482015269081a5cc81c185d5cd95960b21b6064820152608401610510565b600080826005811115610c35576040517f298ebe3c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600a83108015610c4457508082105b15610c7e57848483818110610c5b57610c5b611c50565b9050602002810190610c6d9190611c66565b939093019250600190910190610c35565b600a831115610cb9576040517f529a187000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000610cc9846305f5e100611cb7565b9050806001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000166370a08231336040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401602060405180830381865afa158015610d40573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d649190611951565b1015610db25760405162461bcd60e51b815260206004820152601260248201527f496e73756666696369656e742046756e647300000000000000000000000000006044820152606401610510565b60006001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000166323b872dd336040516001600160e01b031960e084901b1681526001600160a01b039091166004820152306024820152604481018590526064016020604051808303816000875af1158015610e37573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e5b9190611975565b90508015610fe85760005b83811015610f985760005b888883818110610e8357610e83611c50565b9050602002810190610e959190611c66565b9050811015610f85577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166323b872dd30338c8c87818110610ee157610ee1611c50565b9050602002810190610ef39190611c66565b86818110610f0357610f03611c50565b6040516001600160e01b031960e088901b1681526001600160a01b03958616600482015294909316602485015250602090910201356044820152606401600060405180830381600087803b158015610f5a57600080fd5b505af1158015610f6e573d6000803e3d6000fd5b505050508080610f7d906119a8565b915050610e71565b5080610f90816119a8565b915050610e66565b508460056000828254610fab9190611cce565b90915550506040516724f9b897ef58a92290869033907f047841b20d72ff4d89c31178c8efbca759323fd200d8b7694334bccc3fb99ad290600090a45b5050505050610ff76001600055565b5050565b6110036111fc565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015281906000906001600160a01b038316906370a0823190602401602060405180830381865afa158015611065573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110899190611951565b6040517fa9059cbb0000000000000000000000000000000000000000000000000000000081526001600160a01b038681166004830152602482018390529192509083169063a9059cbb906044016020604051808303816000875af11580156110f5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111199190611975565b5050505050565b6111286111fc565b67ffffffffffffffff919091166000908152600460205260409020805460ff1916911515919091179055565b61115c6111fc565b61087e81611467565b61116d6111fc565b6001600160a01b0381166111b0576040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260006004820152602401610510565b61087e81611242565b6002600054036111f5576040517f3ee5aeb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6002600055565b6001546001600160a01b03163314610947576040517f118cdaa7000000000000000000000000000000000000000000000000000000008152336004820152602401610510565b600180546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b806020015181604001518060200190518101906112be9190611934565b67ffffffffffffffff821660009081526004602052604090205460ff1661131c576040517e651a9900000000000000000000000000000000000000000000000000000000815267ffffffffffffffff83166004820152602401610510565b67ffffffffffffffff82166000908152600360205260409020546001600160a01b03828116911614611384576040517e0e48e30000000000000000000000000000000000000000000000000000000081526001600160a01b0382166004820152602401610510565b82516020808501516060860151805191926000926113a89290810182019101611ce1565b90508167ffffffffffffffff16837ff1f456df9618defccc7e2efcf6e0ecba13d5b393128e586fdf16120664b2e36b88604001518060200190518101906113ef9190611934565b846040516113fe929190611e3c565b60405180910390a3600061141b82600001518360600151156114cb565b82515160405191925060009167ffffffffffffffff861690839033907f047841b20d72ff4d89c31178c8efbca759323fd200d8b7694334bccc3fb99ad2908390a4505050505050505050565b600180547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff16600160a01b831515908102919091179091556040517fbdf1a3ee1d5eb15aa60ae1a81488107759732ead44999c8c807575100def058b90600090a250565b815160009082156116e357306001600160a01b03167f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316636352211e8660008151811061152257611522611c50565b602002602001015160008151811061153c5761153c611c50565b60200260200101516040518263ffffffff1660e01b815260040161156291815260200190565b602060405180830381865afa15801561157f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115a39190611934565b6001600160a01b0316146115bb57600091505061049a565b60005b818110156116e15760005b8582815181106115db576115db611c50565b6020026020010151518110156116d857306001600160a01b03167f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316636352211e88858151811061163657611636611c50565b6020026020010151848151811061164f5761164f611c50565b60200260200101516040518263ffffffff1660e01b815260040161167591815260200190565b602060405180830381865afa158015611692573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116b69190611934565b6001600160a01b0316146116d0576000935050505061049a565b6001016115c9565b506001016115be565b505b5060019392505050565b6000602082840312156116ff57600080fd5b81356001600160e01b03198116811461171757600080fd5b9392505050565b60006020828403121561173057600080fd5b5035919050565b6001600160a01b038116811461087e57600080fd5b60006020828403121561175e57600080fd5b813561171781611737565b6000806040838503121561177c57600080fd5b823561178781611737565b946020939093013593505050565b6000602082840312156117a757600080fd5b813567ffffffffffffffff8111156117be57600080fd5b820160a0818503121561171757600080fd5b803567ffffffffffffffff811681146117e857600080fd5b919050565b6000806040838503121561180057600080fd5b611809836117d0565b9150602083013561181981611737565b809150509250929050565b6000806020838503121561183757600080fd5b823567ffffffffffffffff8082111561184f57600080fd5b818501915085601f83011261186357600080fd5b81358181111561187257600080fd5b8660208260051b850101111561188757600080fd5b60209290920196919550909350505050565b600080604083850312156118ac57600080fd5b823561180981611737565b801515811461087e57600080fd5b600080604083850312156118d857600080fd5b6118e1836117d0565b91506020830135611819816118b7565b60006020828403121561190357600080fd5b8135611717816118b7565b60006020828403121561192057600080fd5b611717826117d0565b80516117e881611737565b60006020828403121561194657600080fd5b815161171781611737565b60006020828403121561196357600080fd5b5051919050565b80516117e8816118b7565b60006020828403121561198757600080fd5b8151611717816118b7565b634e487b7160e01b600052601160045260246000fd5b6000600182016119ba576119ba611992565b5060010190565b634e487b7160e01b600052604160045260246000fd5b6040805190810167ffffffffffffffff811182821017156119fa576119fa6119c1565b60405290565b60405160a0810167ffffffffffffffff811182821017156119fa576119fa6119c1565b6040516080810167ffffffffffffffff811182821017156119fa576119fa6119c1565b604051601f8201601f1916810167ffffffffffffffff81118282101715611a6f57611a6f6119c1565b604052919050565b600082601f830112611a8857600080fd5b813567ffffffffffffffff811115611aa257611aa26119c1565b611ab5601f8201601f1916602001611a46565b818152846020838601011115611aca57600080fd5b816020850160208301376000918101602001919091529392505050565b600067ffffffffffffffff821115611b0157611b016119c1565b5060051b60200190565b600082601f830112611b1c57600080fd5b81356020611b31611b2c83611ae7565b611a46565b82815260069290921b84018101918181019086841115611b5057600080fd5b8286015b84811015611b985760408189031215611b6d5760008081fd5b611b756119d7565b8135611b8081611737565b81528185013585820152835291830191604001611b54565b509695505050505050565b600060a08236031215611bb557600080fd5b611bbd611a00565b82358152611bcd602084016117d0565b6020820152604083013567ffffffffffffffff80821115611bed57600080fd5b611bf936838701611a77565b60408401526060850135915080821115611c1257600080fd5b611c1e36838701611a77565b60608401526080850135915080821115611c3757600080fd5b50611c4436828601611b0b565b60808301525092915050565b634e487b7160e01b600052603260045260246000fd5b6000808335601e19843603018112611c7d57600080fd5b83018035915067ffffffffffffffff821115611c9857600080fd5b6020019150600581901b3603821315611cb057600080fd5b9250929050565b808202811582820484141761049a5761049a611992565b8082018082111561049a5761049a611992565b60006020808385031215611cf457600080fd5b825167ffffffffffffffff80821115611d0c57600080fd5b9084019060808287031215611d2057600080fd5b611d28611a23565b825182811115611d3757600080fd5b8301601f81018813611d4857600080fd5b8051611d56611b2c82611ae7565b81815260059190911b8201860190868101908a831115611d7557600080fd5b8784015b83811015611e0257805187811115611d9057600080fd5b8501603f81018d13611da157600080fd5b89810151611db1611b2c82611ae7565b81815260059190911b8201604001908b8101908f831115611dd25760008081fd5b6040840193505b82841015611df25783518252928c0192908c0190611dd9565b8652505050918801918801611d79565b5084525050508284015184820152611e1c60408401611929565b6040820152611e2d6060840161196a565b60608201529695505050505050565b6001600160a01b03831681526000602060408184015260c0830184516080604086015281815180845260e08701915060e08160051b880101935084830192506000805b82811015611ed35788860360df19018452845180518088529088019088880190845b81811015611ebd5783518352928a0192918a0191600101611ea1565b5090975050509386019392860192600101611e7f565b5050505091850151606085015260408501516001600160a01b03811660808601529150606085015180151560a086015291509594505050505056fea2646970667358221220c1924a15e1190e937a2dd57bd0f648f41175ea2134acfdb5ccb8342276faee3d64736f6c63430008140033";

type BlockSalesConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BlockSalesConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BlockSales__factory extends ContractFactory {
  constructor(...args: BlockSalesConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    NFTAddress_: AddressLike,
    paymentToken_: AddressLike,
    ccipRouter_: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      NFTAddress_,
      paymentToken_,
      ccipRouter_,
      overrides || {}
    );
  }
  override deploy(
    NFTAddress_: AddressLike,
    paymentToken_: AddressLike,
    ccipRouter_: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      NFTAddress_,
      paymentToken_,
      ccipRouter_,
      overrides || {}
    ) as Promise<
      BlockSales & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): BlockSales__factory {
    return super.connect(runner) as BlockSales__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BlockSalesInterface {
    return new Interface(_abi) as BlockSalesInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): BlockSales {
    return new Contract(address, _abi, runner) as unknown as BlockSales;
  }
}
