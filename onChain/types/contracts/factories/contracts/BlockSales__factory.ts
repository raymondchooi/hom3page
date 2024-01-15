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
import type { NonPayableOverrides } from "../../common";
import type {
  BlockSales,
  BlockSalesInterface,
} from "../../contracts/BlockSales";

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
        name: "ghoTokenAddress_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
    name: "GHO",
    outputs: [
      {
        internalType: "contract IGhoToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
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
        internalType: "address",
        name: "withdrawAddress_",
        type: "address",
      },
    ],
    name: "withdrawFunds",
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
  "0x60c06040526001805460ff60a01b1916600160a01b17905534801561002357600080fd5b506040516200133238038062001332833981016040819052610044916100fe565b6001600055338061006f57604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b61007881610090565b506001600160a01b039182166080521660a052610131565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b80516001600160a01b03811681146100f957600080fd5b919050565b6000806040838503121561011157600080fd5b61011a836100e2565b9150610128602084016100e2565b90509250929050565b60805160a05161119c6200019660003960008181610304015281816104e8015281816105cf015281816107bd0152818161087201528181610a5c0152610b4401526000818161026501528181610413015281816106ba0152610c26015261119c6000f3fe6080604052600436106100cb5760003560e01c80638da5cb5b11610074578063b8d008f31161004e578063b8d008f3146102f2578063bfe22a0114610326578063f2fde38b1461034657610143565b80638da5cb5b1461029f5780639d7b8e68146102bd578063a13157ca146102d257610143565b8063715018a6116100a5578063715018a61461021e57806372875c2d146102335780637c0b8de21461025357610143565b8063028acce4146101b157806354b58b1c146101dc57806368742da6146101fe57610143565b366101435760405162461bcd60e51b815260206004820152603060248201527f426c6f636b53616c6573203a205b726563656976655d202d20596f752063616e60448201527f206b65657020796f7520746f6b656e730000000000000000000000000000000060648201526084015b60405180910390fd5b60405162461bcd60e51b815260206004820152603060248201527f426c6f636b53616c6573203a205b66616c6c6261636b5d202d20576520646f6e60448201527f27742077616e7420796f75722045544800000000000000000000000000000000606482015260840161013a565b3480156101bd57600080fd5b5068056bc75e2d631000005b6040519081526020015b60405180910390f35b3480156101e857600080fd5b506101fc6101f7366004610f2f565b610366565b005b34801561020a57600080fd5b506101fc610219366004610f5d565b610784565b34801561022a57600080fd5b506101fc6108e6565b34801561023f57600080fd5b506101fc61024e366004610f81565b6108fa565b34801561025f57600080fd5b506102877f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b0390911681526020016101d3565b3480156102ab57600080fd5b506001546001600160a01b0316610287565b3480156102c957600080fd5b506002546101c9565b3480156102de57600080fd5b506101fc6102ed366004610fad565b610906565b3480156102fe57600080fd5b506102877f000000000000000000000000000000000000000000000000000000000000000081565b34801561033257600080fd5b506101fc610341366004611030565b610d73565b34801561035257600080fd5b506101fc610361366004610f5d565b610d84565b61036e610dd8565b600154600160a01b900460ff166103da5760405162461bcd60e51b815260206004820152602a60248201527f4f6e6c79416374697665203a205b69734163746976655d20436f6e7472616374604482015269081a5cc81c185d5cd95960b21b606482015260840161013a565b6040517f6352211e0000000000000000000000000000000000000000000000000000000081526004810182905230906001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690636352211e90602401602060405180830381865afa15801561045a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061047e919061104d565b6001600160a01b0316146104d45760405162461bcd60e51b815260206004820152601360248201527f546f6b656e206e6f7420617661696c61626c6500000000000000000000000000604482015260640161013a565b68056bc75e2d631000006001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000166370a08231336040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401602060405180830381865afa158015610552573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610576919061106a565b116105c35760405162461bcd60e51b815260206004820152601160248201527f496e636f7272656374207061796d656e74000000000000000000000000000000604482015260640161013a565b60006001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000166323b872dd336040516001600160e01b031960e084901b1681526001600160a01b03909116600482015230602482015268056bc75e2d6310000060448201526064016020604051808303816000875af1158015610650573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106749190611083565b9050801561077657604080517f23b872dd0000000000000000000000000000000000000000000000000000000081523060048201523360248201526044810184905290517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316916323b872dd91606480830192600092919082900301818387803b15801561070957600080fd5b505af115801561071d573d6000803e3d6000fd5b505060028054925090506000610732836110b6565b919050555060016107403390565b6001600160a01b03167fd2f6bcb84096add89355eeabc0fad0dd75080ff38db2b2daac437171cf7d9cfe60405160405180910390a35b506107816001600055565b50565b61078c610e1b565b6040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401602060405180830381865afa15801561080c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610830919061106a565b6040517fa9059cbb0000000000000000000000000000000000000000000000000000000081526001600160a01b038481166004830152602482018390529192507f00000000000000000000000000000000000000000000000000000000000000009091169063a9059cbb906044016020604051808303816000875af11580156108bd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108e19190611083565b505050565b6108ee610e1b565b6108f86000610e61565b565b610902610e1b565b5050565b61090e610dd8565b600154600160a01b900460ff1661097a5760405162461bcd60e51b815260206004820152602a60248201527f4f6e6c79416374697665203a205b69734163746976655d20436f6e7472616374604482015269081a5cc81c185d5cd95960b21b606482015260840161013a565b6000808260058111156109b9576040517f298ebe3c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600a831080156109c857508082105b156109ff578484838181106109df576109df6110cf565b90506020028101906109f191906110e5565b9350506001909101906109b9565b600a831115610a3a576040517f529a187000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000610a4f8468056bc75e2d63100000611136565b9050806001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000166370a08231336040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401602060405180830381865afa158015610ac6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610aea919061106a565b1015610b385760405162461bcd60e51b815260206004820152601260248201527f496e73756666696369656e742046756e64730000000000000000000000000000604482015260640161013a565b60006001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000166323b872dd336040516001600160e01b031960e084901b1681526001600160a01b039091166004820152306024820152604481018590526064016020604051808303816000875af1158015610bbd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610be19190611083565b90508015610d645760005b83811015610d1e5760005b888883818110610c0957610c096110cf565b9050602002810190610c1b91906110e5565b9050811015610d0b577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166323b872dd30338c8c87818110610c6757610c676110cf565b9050602002810190610c7991906110e5565b86818110610c8957610c896110cf565b6040516001600160e01b031960e088901b1681526001600160a01b03958616600482015294909316602485015250602090910201356044820152606401600060405180830381600087803b158015610ce057600080fd5b505af1158015610cf4573d6000803e3d6000fd5b505050508080610d03906110b6565b915050610bf7565b5080610d16816110b6565b915050610bec565b508460026000828254610d319190611153565b9091555050604051859033907fd2f6bcb84096add89355eeabc0fad0dd75080ff38db2b2daac437171cf7d9cfe90600090a35b50505050506109026001600055565b610d7b610e1b565b61078181610ecb565b610d8c610e1b565b6001600160a01b038116610dcf576040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526000600482015260240161013a565b61078181610e61565b600260005403610e14576040517f3ee5aeb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6002600055565b6001546001600160a01b031633146108f8576040517f118cdaa700000000000000000000000000000000000000000000000000000000815233600482015260240161013a565b600180546001600160a01b038381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600180547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff16600160a01b831515908102919091179091556040517fbdf1a3ee1d5eb15aa60ae1a81488107759732ead44999c8c807575100def058b90600090a250565b600060208284031215610f4157600080fd5b5035919050565b6001600160a01b038116811461078157600080fd5b600060208284031215610f6f57600080fd5b8135610f7a81610f48565b9392505050565b60008060408385031215610f9457600080fd5b8235610f9f81610f48565b946020939093013593505050565b60008060208385031215610fc057600080fd5b823567ffffffffffffffff80821115610fd857600080fd5b818501915085601f830112610fec57600080fd5b813581811115610ffb57600080fd5b8660208260051b850101111561101057600080fd5b60209290920196919550909350505050565b801515811461078157600080fd5b60006020828403121561104257600080fd5b8135610f7a81611022565b60006020828403121561105f57600080fd5b8151610f7a81610f48565b60006020828403121561107c57600080fd5b5051919050565b60006020828403121561109557600080fd5b8151610f7a81611022565b634e487b7160e01b600052601160045260246000fd5b6000600182016110c8576110c86110a0565b5060010190565b634e487b7160e01b600052603260045260246000fd5b6000808335601e198436030181126110fc57600080fd5b83018035915067ffffffffffffffff82111561111757600080fd5b6020019150600581901b360382131561112f57600080fd5b9250929050565b808202811582820484141761114d5761114d6110a0565b92915050565b8082018082111561114d5761114d6110a056fea2646970667358221220db80fabd5e85c49a9da6b5a15da6905862c44a098f745f2b218465316e54c8be64736f6c63430008140033";

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
    ghoTokenAddress_: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      NFTAddress_,
      ghoTokenAddress_,
      overrides || {}
    );
  }
  override deploy(
    NFTAddress_: AddressLike,
    ghoTokenAddress_: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      NFTAddress_,
      ghoTokenAddress_,
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
