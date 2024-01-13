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
    inputs: [],
    name: "COST_PER_BLOCK",
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
    name: "GHO",
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
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
    ],
    name: "buyBatchNFTs",
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
    name: "buyNFT",
    outputs: [],
    stateMutability: "nonpayable",
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
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60c06040526001805460ff60a01b1916600160a01b17905534801561002357600080fd5b50604051611033380380611033833981016040819052610042916100fc565b6001600055338061006d57604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b6100768161008e565b506001600160a01b039182166080521660a05261012f565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b80516001600160a01b03811681146100f757600080fd5b919050565b6000806040838503121561010f57600080fd5b610118836100e0565b9150610126602084016100e0565b90509250929050565b60805160a051610e9961019a600039600081816101600152818161026101528181610348015281816105ff015281816106b4015281816108aa015261099101526000818161010b015281816103f5015281816104f2015281816107d50152610a790152610e996000f3fe608060405234801561001057600080fd5b50600436106100be5760003560e01c80638da5cb5b11610076578063b9673ccd1161005b578063b9673ccd14610182578063bfe22a01146101a0578063f2fde38b146101b357600080fd5b80638da5cb5b1461014a578063b8d008f31461015b57600080fd5b806351ed8288116100a757806351ed8288146100eb578063715018a6146100fe5780637c0b8de21461010657600080fd5b80633cb47cfe146100c357806351cff8d9146100d8575b600080fd5b6100d66100d1366004610cbc565b6101c6565b005b6100d66100e6366004610d46565b6105c6565b6100d66100f9366004610d6a565b610728565b6100d6610aec565b61012d7f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b0390911681526020015b60405180910390f35b6001546001600160a01b031661012d565b61012d7f000000000000000000000000000000000000000000000000000000000000000081565b61019268056bc75e2d6310000081565b604051908152602001610141565b6100d66101ae366004610d91565b610b00565b6100d66101c1366004610d46565b610b11565b6101ce610b65565b600154600160a01b900460ff1661023f5760405162461bcd60e51b815260206004820152602a60248201527f4f6e6c79416374697665203a205b69734163746976655d20436f6e7472616374604482015269081a5cc81c185d5cd95960b21b60648201526084015b60405180910390fd5b60006102548268056bc75e2d63100000610dc4565b9050806001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000166370a08231336040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401602060405180830381865afa1580156102cb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102ef9190610de1565b1161033c5760405162461bcd60e51b815260206004820152601160248201527f496e636f7272656374207061796d656e740000000000000000000000000000006044820152606401610236565b60006001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000166323b872dd336040516001600160e01b031960e084901b1681526001600160a01b039091166004820152306024820152604481018590526064016020604051808303816000875af11580156103c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103e59190610dfa565b905060005b838110156105b557307f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316636352211e87878581811061043457610434610e17565b905060200201356040518263ffffffff1660e01b815260040161045991815260200190565b602060405180830381865afa158015610476573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061049a9190610e2d565b6001600160a01b0316146104f05760405162461bcd60e51b815260206004820152601360248201527f546f6b656e206e6f7420617661696c61626c65000000000000000000000000006044820152606401610236565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166323b872dd303388888681811061053357610533610e17565b6040516001600160e01b031960e088901b1681526001600160a01b03958616600482015294909316602485015250602090910201356044820152606401600060405180830381600087803b15801561058a57600080fd5b505af115801561059e573d6000803e3d6000fd5b5050505080806105ad90610e4a565b9150506103ea565b5050506105c26001600055565b5050565b6105ce610ba8565b6040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401602060405180830381865afa15801561064e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106729190610de1565b6040517fa9059cbb0000000000000000000000000000000000000000000000000000000081526001600160a01b038481166004830152602482018390529192507f00000000000000000000000000000000000000000000000000000000000000009091169063a9059cbb906044016020604051808303816000875af11580156106ff573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107239190610dfa565b505050565b610730610b65565b600154600160a01b900460ff1661079c5760405162461bcd60e51b815260206004820152602a60248201527f4f6e6c79416374697665203a205b69734163746976655d20436f6e7472616374604482015269081a5cc81c185d5cd95960b21b6064820152608401610236565b6040517f6352211e0000000000000000000000000000000000000000000000000000000081526004810182905230906001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690636352211e90602401602060405180830381865afa15801561081c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108409190610e2d565b6001600160a01b0316146108965760405162461bcd60e51b815260206004820152601360248201527f546f6b656e206e6f7420617661696c61626c65000000000000000000000000006044820152606401610236565b68056bc75e2d631000006001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000166370a08231336040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401602060405180830381865afa158015610914573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109389190610de1565b116109855760405162461bcd60e51b815260206004820152601160248201527f496e636f7272656374207061796d656e740000000000000000000000000000006044820152606401610236565b60006001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000166323b872dd336040516001600160e01b031960e084901b1681526001600160a01b03909116600482015230602482015268056bc75e2d6310000060448201526064016020604051808303816000875af1158015610a12573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a369190610dfa565b90508015610ade576040517f23b872dd000000000000000000000000000000000000000000000000000000008152306004820152336024820152604481018390527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906323b872dd90606401600060405180830381600087803b158015610ac557600080fd5b505af1158015610ad9573d6000803e3d6000fd5b505050505b50610ae96001600055565b50565b610af4610ba8565b610afe6000610bee565b565b610b08610ba8565b610ae981610c58565b610b19610ba8565b6001600160a01b038116610b5c576040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260006004820152602401610236565b610ae981610bee565b600260005403610ba1576040517f3ee5aeb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6002600055565b6001546001600160a01b03163314610afe576040517f118cdaa7000000000000000000000000000000000000000000000000000000008152336004820152602401610236565b600180546001600160a01b038381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600180547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff16600160a01b831515908102919091179091556040517fbdf1a3ee1d5eb15aa60ae1a81488107759732ead44999c8c807575100def058b90600090a250565b60008060208385031215610ccf57600080fd5b823567ffffffffffffffff80821115610ce757600080fd5b818501915085601f830112610cfb57600080fd5b813581811115610d0a57600080fd5b8660208260051b8501011115610d1f57600080fd5b60209290920196919550909350505050565b6001600160a01b0381168114610ae957600080fd5b600060208284031215610d5857600080fd5b8135610d6381610d31565b9392505050565b600060208284031215610d7c57600080fd5b5035919050565b8015158114610ae957600080fd5b600060208284031215610da357600080fd5b8135610d6381610d83565b634e487b7160e01b600052601160045260246000fd5b8082028115828204841417610ddb57610ddb610dae565b92915050565b600060208284031215610df357600080fd5b5051919050565b600060208284031215610e0c57600080fd5b8151610d6381610d83565b634e487b7160e01b600052603260045260246000fd5b600060208284031215610e3f57600080fd5b8151610d6381610d31565b600060018201610e5c57610e5c610dae565b506001019056fea2646970667358221220b5862fad6e0ed5ff5d3049d720d0eb8eeea8b34e535e18e2f2df33963d5333c564736f6c63430008140033";

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
