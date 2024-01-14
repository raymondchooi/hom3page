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
  BigNumberish,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  InnerBlockToken,
  InnerBlockTokenInterface,
} from "../../../contracts/tokens/InnerBlockToken";

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
      {
        internalType: "uint256",
        name: "motherBlock_",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "layer_",
        type: "uint8",
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
    inputs: [],
    name: "MOTHER_BLOCK",
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
    name: "WALL_LAYER",
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
    inputs: [
      {
        internalType: "uint256",
        name: "blockId_",
        type: "uint256",
      },
    ],
    name: "mintInnerWall",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "mintNBlock",
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
  "0x60c06040526008805460ff60a01b1916600160a01b1790553480156200002457600080fd5b5060405162001887380380620018878339810160408190526200004791620001d2565b3384846002620000588382620002ee565b506003620000678282620002ee565b506000805550506001600160a01b0381166200009d57604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b620000a881620000bb565b5060ff1660805260a05250620003ba9050565b600880546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200013557600080fd5b81516001600160401b03808211156200015257620001526200010d565b604051601f8301601f19908116603f011681019082821181831017156200017d576200017d6200010d565b816040528381526020925086838588010111156200019a57600080fd5b600091505b83821015620001be57858201830151818301840152908201906200019f565b600093810190920192909252949350505050565b60008060008060808587031215620001e957600080fd5b84516001600160401b03808211156200020157600080fd5b6200020f8883890162000123565b955060208701519150808211156200022657600080fd5b50620002358782880162000123565b93505060408501519150606085015160ff811681146200025457600080fd5b939692955090935050565b600181811c908216806200027457607f821691505b6020821081036200029557634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620002e957600081815260208120601f850160051c81016020861015620002c45750805b601f850160051c820191505b81811015620002e557828155600101620002d0565b5050505b505050565b81516001600160401b038111156200030a576200030a6200010d565b62000322816200031b84546200025f565b846200029b565b602080601f8311600181146200035a5760008415620003415750858301515b600019600386901b1c1916600185901b178555620002e5565b600085815260208120601f198616915b828110156200038b578886015182559484019460019091019084016200036a565b5085821015620003aa5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60805160a0516114a7620003e06000396000610342015260006102a601526114a76000f3fe6080604052600436106101755760003560e01c806370a08231116100cb578063a22cb4651161007f578063c87b56dd11610059578063c87b56dd146103ea578063e985e9c51461040a578063f2fde38b1461045357600080fd5b8063a22cb46514610397578063b88d4fde146103b7578063bfe22a01146103ca57600080fd5b8063852d7b4b116100b0578063852d7b4b146103305780638da5cb5b1461036457806395d89b411461038257600080fd5b806370a08231146102fb578063715018a61461031b57600080fd5b806318160ddd1161012d5780633afd6808116101075780633afd68081461029457806342842e0e146102c85780636352211e146102db57600080fd5b806318160ddd1461023e57806323b872dd146102615780632aa82bb41461027457600080fd5b8063081812fc1161015e578063081812fc146101d1578063095ea7b31461020957806313ec99e81461021e57600080fd5b806301ffc9a71461017a57806306fdde03146101af575b600080fd5b34801561018657600080fd5b5061019a6101953660046110de565b610473565b60405190151581526020015b60405180910390f35b3480156101bb57600080fd5b506101c4610510565b6040516101a6919061114b565b3480156101dd57600080fd5b506101f16101ec36600461115e565b6105a2565b6040516001600160a01b0390911681526020016101a6565b61021c610217366004611193565b6105ff565b005b34801561022a57600080fd5b5061021c61023936600461115e565b6106e2565b34801561024a57600080fd5b50600154600054035b6040519081526020016101a6565b61021c61026f3660046111bd565b6107ba565b34801561028057600080fd5b5061021c61028f36600461115e565b6109bb565b3480156102a057600080fd5b506102537f000000000000000000000000000000000000000000000000000000000000000081565b61021c6102d63660046111bd565b610a3d565b3480156102e757600080fd5b506101f16102f636600461115e565b610a5d565b34801561030757600080fd5b506102536103163660046111f9565b610a68565b34801561032757600080fd5b5061021c610ad0565b34801561033c57600080fd5b506102537f000000000000000000000000000000000000000000000000000000000000000081565b34801561037057600080fd5b506008546001600160a01b03166101f1565b34801561038e57600080fd5b506101c4610ae4565b3480156103a357600080fd5b5061021c6103b2366004611224565b610af3565b61021c6103c536600461126d565b610b5f565b3480156103d657600080fd5b5061021c6103e5366004611349565b610ba9565b3480156103f657600080fd5b506101c461040536600461115e565b610bba565b34801561041657600080fd5b5061019a610425366004611364565b6001600160a01b03918216600090815260076020908152604080832093909416825291909152205460ff1690565b34801561045f57600080fd5b5061021c61046e3660046111f9565b610c64565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000006001600160e01b0319831614806104d657507f80ac58cd000000000000000000000000000000000000000000000000000000006001600160e01b03198316145b8061050a57507f5b5e139f000000000000000000000000000000000000000000000000000000006001600160e01b03198316145b92915050565b60606002805461051f9061138e565b80601f016020809104026020016040519081016040528092919081815260200182805461054b9061138e565b80156105985780601f1061056d57610100808354040283529160200191610598565b820191906000526020600020905b81548152906001019060200180831161057b57829003601f168201915b5050505050905090565b60006105ad82610cb8565b6105e3576040517fcf4700e400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b506000908152600660205260409020546001600160a01b031690565b600061060a82610a5d565b9050336001600160a01b03821614610679576001600160a01b038116600090815260076020908152604080832033845290915290205460ff16610679576040517fcfb3b94200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600082815260066020526040808220805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0387811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b6106ea610cdf565b600854600160a81b900460ff161561070157600080fd5b6000816107116001546000540390565b61071b91906113c8565b90506101208111156107745760405162461bcd60e51b815260206004820152601660248201527f45786365656473204d6178696d756d20537570706c790000000000000000000060448201526064015b60405180910390fd5b61012081036107ac57600880547fffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffffff16600160a81b1790555b6107b63383610d25565b5050565b60006107c582610e56565b9050836001600160a01b0316816001600160a01b031614610812576040517fa114810000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008281526006602052604090208054338082146001600160a01b03881690911417610895576001600160a01b038616600090815260076020908152604080832033845290915290205460ff16610895576040517f59c896be00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001600160a01b0385166108d5576040517fea553b3400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80156108e057600082555b6001600160a01b038681166000908152600560205260408082208054600019019055918716808252919020805460010190554260a01b17600160e11b17600085815260046020526040812091909155600160e11b84169003610972576001840160008181526004602052604081205490036109705760005481146109705760008181526004602052604090208490555b505b83856001600160a01b0316876001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050505050565b600854600160a01b900460ff16610a3a5760405162461bcd60e51b815260206004820152602a60248201527f4f6e6c79416374697665203a205b69734163746976655d20436f6e747261637460448201527f2069732070617573656400000000000000000000000000000000000000000000606482015260840161076b565b50565b610a5883838360405180602001604052806000815250610b5f565b505050565b600061050a82610e56565b60006001600160a01b038216610aaa576040517f8f4eb60400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b506001600160a01b031660009081526005602052604090205467ffffffffffffffff1690565b610ad8610cdf565b610ae26000610ed6565b565b60606003805461051f9061138e565b3360008181526007602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b610b6a8484846107ba565b6001600160a01b0383163b15610ba357610b8684848484610f35565b610ba3576040516368d2bf6b60e11b815260040160405180910390fd5b50505050565b610bb1610cdf565b610a3a81611020565b6060610bc582610cb8565b610bfb576040517fa14c4b5000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000610c1260408051602081019091526000815290565b90508051600003610c325760405180602001604052806000815250610c5d565b80610c3c84611084565b604051602001610c4d9291906113e9565b6040516020818303038152906040525b9392505050565b610c6c610cdf565b6001600160a01b038116610caf576040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526000600482015260240161076b565b610a3a81610ed6565b600080548210801561050a575050600090815260046020526040902054600160e01b161590565b6008546001600160a01b03163314610ae2576040517f118cdaa700000000000000000000000000000000000000000000000000000000815233600482015260240161076b565b6000805490829003610d63576040517fb562e8dd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001600160a01b03831660008181526005602090815260408083208054680100000000000000018802019055848352600490915281206001851460e11b4260a01b178317905582840190839083907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8180a4600183015b818114610e1257808360007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef600080a4600101610dda565b5081600003610e4d576040517f2e07630000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005550505050565b600081600054811015610ea45760008181526004602052604081205490600160e01b82169003610ea2575b80600003610c5d575060001901600081815260046020526040902054610e81565b505b6040517fdf2d9b4200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600880546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b604051630a85bd0160e11b81526000906001600160a01b0385169063150b7a0290610f6a903390899088908890600401611418565b6020604051808303816000875af1925050508015610fa5575060408051601f3d908101601f19168201909252610fa291810190611454565b60015b611003573d808015610fd3576040519150601f19603f3d011682016040523d82523d6000602084013e610fd8565b606091505b508051600003610ffb576040516368d2bf6b60e11b815260040160405180910390fd5b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050949350505050565b600880547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff16600160a01b831515908102919091179091556040517fbdf1a3ee1d5eb15aa60ae1a81488107759732ead44999c8c807575100def058b90600090a250565b606060a06040510180604052602081039150506000815280825b600183039250600a81066030018353600a90048061109e5750819003601f19909101908152919050565b6001600160e01b031981168114610a3a57600080fd5b6000602082840312156110f057600080fd5b8135610c5d816110c8565b60005b838110156111165781810151838201526020016110fe565b50506000910152565b600081518084526111378160208601602086016110fb565b601f01601f19169290920160200192915050565b602081526000610c5d602083018461111f565b60006020828403121561117057600080fd5b5035919050565b80356001600160a01b038116811461118e57600080fd5b919050565b600080604083850312156111a657600080fd5b6111af83611177565b946020939093013593505050565b6000806000606084860312156111d257600080fd5b6111db84611177565b92506111e960208501611177565b9150604084013590509250925092565b60006020828403121561120b57600080fd5b610c5d82611177565b8035801515811461118e57600080fd5b6000806040838503121561123757600080fd5b61124083611177565b915061124e60208401611214565b90509250929050565b634e487b7160e01b600052604160045260246000fd5b6000806000806080858703121561128357600080fd5b61128c85611177565b935061129a60208601611177565b925060408501359150606085013567ffffffffffffffff808211156112be57600080fd5b818701915087601f8301126112d257600080fd5b8135818111156112e4576112e4611257565b604051601f8201601f19908116603f0116810190838211818310171561130c5761130c611257565b816040528281528a602084870101111561132557600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b60006020828403121561135b57600080fd5b610c5d82611214565b6000806040838503121561137757600080fd5b61138083611177565b915061124e60208401611177565b600181811c908216806113a257607f821691505b6020821081036113c257634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561050a57634e487b7160e01b600052601160045260246000fd5b600083516113fb8184602088016110fb565b83519083019061140f8183602088016110fb565b01949350505050565b60006001600160a01b0380871683528086166020840152508360408301526080606083015261144a608083018461111f565b9695505050505050565b60006020828403121561146657600080fd5b8151610c5d816110c856fea2646970667358221220e22b0fa3f340c50af424e512d55c4170d85a9383610f5d333b56a7d3ab9461c364736f6c63430008140033";

type InnerBlockTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: InnerBlockTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class InnerBlockToken__factory extends ContractFactory {
  constructor(...args: InnerBlockTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    name_: string,
    symbol_: string,
    motherBlock_: BigNumberish,
    layer_: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      name_,
      symbol_,
      motherBlock_,
      layer_,
      overrides || {}
    );
  }
  override deploy(
    name_: string,
    symbol_: string,
    motherBlock_: BigNumberish,
    layer_: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      name_,
      symbol_,
      motherBlock_,
      layer_,
      overrides || {}
    ) as Promise<
      InnerBlockToken & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): InnerBlockToken__factory {
    return super.connect(runner) as InnerBlockToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): InnerBlockTokenInterface {
    return new Interface(_abi) as InnerBlockTokenInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): InnerBlockToken {
    return new Contract(address, _abi, runner) as unknown as InnerBlockToken;
  }
}
