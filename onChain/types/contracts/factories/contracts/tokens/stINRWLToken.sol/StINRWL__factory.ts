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
  StINRWL,
  StINRWLInterface,
} from "../../../../contracts/tokens/stINRWLToken.sol/StINRWL";

const _abi = [
  {
    inputs: [],
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
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
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

const _bytecode =
  "0x60806040526008805460ff60a01b1916600160a01b1790553480156200002457600080fd5b50336040518060400160405280601c81526020017f486f6d335061676520496e6e657277616c6c2047656e657261746f7200000000815250604051806040016040528060078152602001661cdd12539495d360ca1b81525081600290816200008d9190620001db565b5060036200009c8282620001db565b506000805550506001600160a01b038116620000d257604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b620000dd81620000e4565b50620002a7565b600880546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806200016157607f821691505b6020821081036200018257634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620001d657600081815260208120601f850160051c81016020861015620001b15750805b601f850160051c820191505b81811015620001d257828155600101620001bd565b5050505b505050565b81516001600160401b03811115620001f757620001f762000136565b6200020f816200020884546200014c565b8462000188565b602080601f8311600181146200024757600084156200022e5750858301515b600019600386901b1c1916600185901b178555620001d2565b600085815260208120601f198616915b82811015620002785788860151825594840194600190910190840162000257565b5085821015620002975787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61111e80620002b76000396000f3fe6080604052600436106101445760003560e01c806370a08231116100c0578063b88d4fde11610074578063c87b56dd11610059578063c87b56dd14610326578063e985e9c514610346578063f2fde38b1461038f57600080fd5b8063b88d4fde146102f3578063bfe22a011461030657600080fd5b80638da5cb5b116100a55780638da5cb5b146102a057806395d89b41146102be578063a22cb465146102d357600080fd5b806370a082311461026b578063715018a61461028b57600080fd5b80631249c58b1161011757806323b872dd116100fc57806323b872dd1461022557806342842e0e146102385780636352211e1461024b57600080fd5b80631249c58b146101ed57806318160ddd1461020257600080fd5b806301ffc9a71461014957806306fdde031461017e578063081812fc146101a0578063095ea7b3146101d8575b600080fd5b34801561015557600080fd5b50610169610164366004610d76565b6103af565b60405190151581526020015b60405180910390f35b34801561018a57600080fd5b5061019361044c565b6040516101759190610de3565b3480156101ac57600080fd5b506101c06101bb366004610df6565b6104de565b6040516001600160a01b039091168152602001610175565b6101eb6101e6366004610e2b565b61053b565b005b3480156101f957600080fd5b506101eb610601565b34801561020e57600080fd5b50600154600054035b604051908152602001610175565b6101eb610233366004610e55565b61060b565b6101eb610246366004610e55565b6107ef565b34801561025757600080fd5b506101c0610266366004610df6565b61080f565b34801561027757600080fd5b50610217610286366004610e91565b61081a565b34801561029757600080fd5b506101eb610882565b3480156102ac57600080fd5b506008546001600160a01b03166101c0565b3480156102ca57600080fd5b50610193610894565b3480156102df57600080fd5b506101eb6102ee366004610ebc565b6108a3565b6101eb610301366004610f05565b61090f565b34801561031257600080fd5b506101eb610321366004610fe1565b610959565b34801561033257600080fd5b50610193610341366004610df6565b61096d565b34801561035257600080fd5b50610169610361366004610ffc565b6001600160a01b03918216600090815260076020908152604080832093909416825291909152205460ff1690565b34801561039b57600080fd5b506101eb6103aa366004610e91565b610a17565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000006001600160e01b03198316148061041257507f80ac58cd000000000000000000000000000000000000000000000000000000006001600160e01b03198316145b8061044657507f5b5e139f000000000000000000000000000000000000000000000000000000006001600160e01b03198316145b92915050565b60606002805461045b90611026565b80601f016020809104026020016040519081016040528092919081815260200182805461048790611026565b80156104d45780601f106104a9576101008083540402835291602001916104d4565b820191906000526020600020905b8154815290600101906020018083116104b757829003601f168201915b5050505050905090565b60006104e982610a70565b61051f576040517fcf4700e400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b506000908152600660205260409020546001600160a01b031690565b60006105468261080f565b9050336001600160a01b03821614610598576105628133610361565b610598576040517fcfb3b94200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600082815260066020526040808220805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0387811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b610609610a97565b565b600061061682610add565b9050836001600160a01b0316816001600160a01b031614610663576040517fa114810000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008281526006602052604090208054338082146001600160a01b038816909114176106c9576106938633610361565b6106c9576040517f59c896be00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001600160a01b038516610709576040517fea553b3400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b801561071457600082555b6001600160a01b038681166000908152600560205260408082208054600019019055918716808252919020805460010190554260a01b17600160e11b17600085815260046020526040812091909155600160e11b841690036107a6576001840160008181526004602052604081205490036107a45760005481146107a45760008181526004602052604090208490555b505b83856001600160a01b0316876001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050505050565b61080a8383836040518060200160405280600081525061090f565b505050565b600061044682610add565b60006001600160a01b03821661085c576040517f8f4eb60400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b506001600160a01b031660009081526005602052604090205467ffffffffffffffff1690565b61088a610a97565b6106096000610b5d565b60606003805461045b90611026565b3360008181526007602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b61091a84848461060b565b6001600160a01b0383163b156109535761093684848484610bbc565b610953576040516368d2bf6b60e11b815260040160405180910390fd5b50505050565b610961610a97565b61096a81610ca7565b50565b606061097882610a70565b6109ae576040517fa14c4b5000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006109c560408051602081019091526000815290565b905080516000036109e55760405180602001604052806000815250610a10565b806109ef84610d1c565b604051602001610a00929190611060565b6040516020818303038152906040525b9392505050565b610a1f610a97565b6001600160a01b038116610a67576040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600060048201526024015b60405180910390fd5b61096a81610b5d565b6000805482108015610446575050600090815260046020526040902054600160e01b161590565b6008546001600160a01b03163314610609576040517f118cdaa7000000000000000000000000000000000000000000000000000000008152336004820152602401610a5e565b600081600054811015610b2b5760008181526004602052604081205490600160e01b82169003610b29575b80600003610a10575060001901600081815260046020526040902054610b08565b505b6040517fdf2d9b4200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600880546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b604051630a85bd0160e11b81526000906001600160a01b0385169063150b7a0290610bf190339089908890889060040161108f565b6020604051808303816000875af1925050508015610c2c575060408051601f3d908101601f19168201909252610c29918101906110cb565b60015b610c8a573d808015610c5a576040519150601f19603f3d011682016040523d82523d6000602084013e610c5f565b606091505b508051600003610c82576040516368d2bf6b60e11b815260040160405180910390fd5b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050949350505050565b600880547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff1674010000000000000000000000000000000000000000831515908102919091179091556040517fbdf1a3ee1d5eb15aa60ae1a81488107759732ead44999c8c807575100def058b90600090a250565b606060a06040510180604052602081039150506000815280825b600183039250600a81066030018353600a900480610d365750819003601f19909101908152919050565b6001600160e01b03198116811461096a57600080fd5b600060208284031215610d8857600080fd5b8135610a1081610d60565b60005b83811015610dae578181015183820152602001610d96565b50506000910152565b60008151808452610dcf816020860160208601610d93565b601f01601f19169290920160200192915050565b602081526000610a106020830184610db7565b600060208284031215610e0857600080fd5b5035919050565b80356001600160a01b0381168114610e2657600080fd5b919050565b60008060408385031215610e3e57600080fd5b610e4783610e0f565b946020939093013593505050565b600080600060608486031215610e6a57600080fd5b610e7384610e0f565b9250610e8160208501610e0f565b9150604084013590509250925092565b600060208284031215610ea357600080fd5b610a1082610e0f565b80358015158114610e2657600080fd5b60008060408385031215610ecf57600080fd5b610ed883610e0f565b9150610ee660208401610eac565b90509250929050565b634e487b7160e01b600052604160045260246000fd5b60008060008060808587031215610f1b57600080fd5b610f2485610e0f565b9350610f3260208601610e0f565b925060408501359150606085013567ffffffffffffffff80821115610f5657600080fd5b818701915087601f830112610f6a57600080fd5b813581811115610f7c57610f7c610eef565b604051601f8201601f19908116603f01168101908382118183101715610fa457610fa4610eef565b816040528281528a6020848701011115610fbd57600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b600060208284031215610ff357600080fd5b610a1082610eac565b6000806040838503121561100f57600080fd5b61101883610e0f565b9150610ee660208401610e0f565b600181811c9082168061103a57607f821691505b60208210810361105a57634e487b7160e01b600052602260045260246000fd5b50919050565b60008351611072818460208801610d93565b835190830190611086818360208801610d93565b01949350505050565b60006001600160a01b038087168352808616602084015250836040830152608060608301526110c16080830184610db7565b9695505050505050565b6000602082840312156110dd57600080fd5b8151610a1081610d6056fea2646970667358221220515f976ca3146207adf9adc8fd42858a2b8c443093a6ebc1644dff32090c0d7164736f6c63430008140033";

type StINRWLConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StINRWLConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class StINRWL__factory extends ContractFactory {
  constructor(...args: StINRWLConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      StINRWL & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): StINRWL__factory {
    return super.connect(runner) as StINRWL__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StINRWLInterface {
    return new Interface(_abi) as StINRWLInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): StINRWL {
    return new Contract(address, _abi, runner) as unknown as StINRWL;
  }
}
