/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type {
  ERC721A,
  ERC721AInterface,
} from "../../../../erc721a/contracts/ERC721A.sol/ERC721A";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ApprovalCallerNotOwnerNorApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "ApprovalQueryForNonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "BalanceQueryForZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "MintERC2309QuantityExceedsLimit",
    type: "error",
  },
  {
    inputs: [],
    name: "MintToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "MintZeroQuantity",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnerQueryForNonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnershipNotInitializedForExtraData",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferCallerNotOwnerNorApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferFromIncorrectOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToNonERC721ReceiverImplementer",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "URIQueryForNonexistentToken",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "fromTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "toTokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "ConsecutiveTransfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
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
    name: "ownerOf",
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
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
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
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
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
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200117938038062001179833981016040819052620000349162000123565b60026200004283826200021c565b5060036200005182826200021c565b50506000805550620002e8565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200008657600080fd5b81516001600160401b0380821115620000a357620000a36200005e565b604051601f8301601f19908116603f01168101908282118183101715620000ce57620000ce6200005e565b81604052838152602092508683858801011115620000eb57600080fd5b600091505b838210156200010f5785820183015181830184015290820190620000f0565b600093810190920192909252949350505050565b600080604083850312156200013757600080fd5b82516001600160401b03808211156200014f57600080fd5b6200015d8683870162000074565b935060208501519150808211156200017457600080fd5b50620001838582860162000074565b9150509250929050565b600181811c90821680620001a257607f821691505b602082108103620001c357634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200021757600081815260208120601f850160051c81016020861015620001f25750805b601f850160051c820191505b818110156200021357828155600101620001fe565b5050505b505050565b81516001600160401b038111156200023857620002386200005e565b62000250816200024984546200018d565b84620001c9565b602080601f8311600181146200028857600084156200026f5750858301515b600019600386901b1c1916600185901b17855562000213565b600085815260208120601f198616915b82811015620002b95788860151825594840194600190910190840162000298565b5085821015620002d85787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b610e8180620002f86000396000f3fe6080604052600436106100dd5760003560e01c80636352211e1161007f578063a22cb46511610059578063a22cb46514610224578063b88d4fde14610244578063c87b56dd14610257578063e985e9c51461027757600080fd5b80636352211e146101cf57806370a08231146101ef57806395d89b411461020f57600080fd5b8063095ea7b3116100bb578063095ea7b31461017157806318160ddd1461018657806323b872dd146101a957806342842e0e146101bc57600080fd5b806301ffc9a7146100e257806306fdde0314610117578063081812fc14610139575b600080fd5b3480156100ee57600080fd5b506101026100fd366004610af2565b6102c0565b60405190151581526020015b60405180910390f35b34801561012357600080fd5b5061012c61035d565b60405161010e9190610b5f565b34801561014557600080fd5b50610159610154366004610b72565b6103ef565b6040516001600160a01b03909116815260200161010e565b61018461017f366004610ba7565b61044c565b005b34801561019257600080fd5b50600154600054035b60405190815260200161010e565b6101846101b7366004610bd1565b61051d565b6101846101ca366004610bd1565b610701565b3480156101db57600080fd5b506101596101ea366004610b72565b610721565b3480156101fb57600080fd5b5061019b61020a366004610c0d565b61072c565b34801561021b57600080fd5b5061012c610794565b34801561023057600080fd5b5061018461023f366004610c28565b6107a3565b610184610252366004610c7a565b61080f565b34801561026357600080fd5b5061012c610272366004610b72565b610859565b34801561028357600080fd5b50610102610292366004610d56565b6001600160a01b03918216600090815260076020908152604080832093909416825291909152205460ff1690565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000006001600160e01b03198316148061032357507f80ac58cd000000000000000000000000000000000000000000000000000000006001600160e01b03198316145b8061035757507f5b5e139f000000000000000000000000000000000000000000000000000000006001600160e01b03198316145b92915050565b60606002805461036c90610d89565b80601f016020809104026020016040519081016040528092919081815260200182805461039890610d89565b80156103e55780601f106103ba576101008083540402835291602001916103e5565b820191906000526020600020905b8154815290600101906020018083116103c857829003601f168201915b5050505050905090565b60006103fa82610903565b610430576040517fcf4700e400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b506000908152600660205260409020546001600160a01b031690565b600061045782610721565b9050336001600160a01b038216146104a9576104738133610292565b6104a9576040517fcfb3b94200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008281526006602052604080822080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0387811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b60006105288261092a565b9050836001600160a01b0316816001600160a01b031614610575576040517fa114810000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008281526006602052604090208054338082146001600160a01b038816909114176105db576105a58633610292565b6105db576040517f59c896be00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001600160a01b03851661061b576040517fea553b3400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b801561062657600082555b6001600160a01b038681166000908152600560205260408082208054600019019055918716808252919020805460010190554260a01b17600160e11b17600085815260046020526040812091909155600160e11b841690036106b8576001840160008181526004602052604081205490036106b65760005481146106b65760008181526004602052604090208490555b505b83856001600160a01b0316876001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050505050565b61071c8383836040518060200160405280600081525061080f565b505050565b60006103578261092a565b60006001600160a01b03821661076e576040517f8f4eb60400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b506001600160a01b031660009081526005602052604090205467ffffffffffffffff1690565b60606003805461036c90610d89565b3360008181526007602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b61081a84848461051d565b6001600160a01b0383163b1561085357610836848484846109aa565b610853576040516368d2bf6b60e11b815260040160405180910390fd5b50505050565b606061086482610903565b61089a576040517fa14c4b5000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006108b160408051602081019091526000815290565b905080516000036108d157604051806020016040528060008152506108fc565b806108db84610a95565b6040516020016108ec929190610dc3565b6040516020818303038152906040525b9392505050565b6000805482108015610357575050600090815260046020526040902054600160e01b161590565b6000816000548110156109785760008181526004602052604081205490600160e01b82169003610976575b806000036108fc575060001901600081815260046020526040902054610955565b505b6040517fdf2d9b4200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b604051630a85bd0160e11b81526000906001600160a01b0385169063150b7a02906109df903390899088908890600401610df2565b6020604051808303816000875af1925050508015610a1a575060408051601f3d908101601f19168201909252610a1791810190610e2e565b60015b610a78573d808015610a48576040519150601f19603f3d011682016040523d82523d6000602084013e610a4d565b606091505b508051600003610a70576040516368d2bf6b60e11b815260040160405180910390fd5b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050949350505050565b606060a06040510180604052602081039150506000815280825b600183039250600a81066030018353600a900480610aaf5750819003601f19909101908152919050565b6001600160e01b031981168114610aef57600080fd5b50565b600060208284031215610b0457600080fd5b81356108fc81610ad9565b60005b83811015610b2a578181015183820152602001610b12565b50506000910152565b60008151808452610b4b816020860160208601610b0f565b601f01601f19169290920160200192915050565b6020815260006108fc6020830184610b33565b600060208284031215610b8457600080fd5b5035919050565b80356001600160a01b0381168114610ba257600080fd5b919050565b60008060408385031215610bba57600080fd5b610bc383610b8b565b946020939093013593505050565b600080600060608486031215610be657600080fd5b610bef84610b8b565b9250610bfd60208501610b8b565b9150604084013590509250925092565b600060208284031215610c1f57600080fd5b6108fc82610b8b565b60008060408385031215610c3b57600080fd5b610c4483610b8b565b915060208301358015158114610c5957600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b60008060008060808587031215610c9057600080fd5b610c9985610b8b565b9350610ca760208601610b8b565b925060408501359150606085013567ffffffffffffffff80821115610ccb57600080fd5b818701915087601f830112610cdf57600080fd5b813581811115610cf157610cf1610c64565b604051601f8201601f19908116603f01168101908382118183101715610d1957610d19610c64565b816040528281528a6020848701011115610d3257600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b60008060408385031215610d6957600080fd5b610d7283610b8b565b9150610d8060208401610b8b565b90509250929050565b600181811c90821680610d9d57607f821691505b602082108103610dbd57634e487b7160e01b600052602260045260246000fd5b50919050565b60008351610dd5818460208801610b0f565b835190830190610de9818360208801610b0f565b01949350505050565b60006001600160a01b03808716835280861660208401525083604083015260806060830152610e246080830184610b33565b9695505050505050565b600060208284031215610e4057600080fd5b81516108fc81610ad956fea264697066735822122059af692694dac544f206d36732e83cd38493c40eb60becaad7ca26c9a6475a0964736f6c63430008140033";

type ERC721AConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721AConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721A__factory extends ContractFactory {
  constructor(...args: ERC721AConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    name_: string,
    symbol_: string,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  override deploy(
    name_: string,
    symbol_: string,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(name_, symbol_, overrides || {}) as Promise<
      ERC721A & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ERC721A__factory {
    return super.connect(runner) as ERC721A__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721AInterface {
    return new Interface(_abi) as ERC721AInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): ERC721A {
    return new Contract(address, _abi, runner) as unknown as ERC721A;
  }
}