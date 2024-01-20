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
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  Hom3DepositVault,
  Hom3DepositVaultInterface,
} from "../../../contracts/utils/Hom3DepositVault";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "ghoToken_",
        type: "address",
      },
      {
        internalType: "address",
        name: "masterContract_",
        type: "address",
      },
      {
        internalType: "address",
        name: "ccipRouter_",
        type: "address",
      },
      {
        internalType: "address",
        name: "linkToken_",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "masterChainId_",
        type: "uint64",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
        internalType: "uint256",
        name: "userProfile_",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "messageId_",
        type: "bytes32",
      },
    ],
    name: "EscrowBalanceToLow",
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
    name: "MASTER_CHAIN",
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
    name: "PAYMENT_TOKEN",
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
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "depositFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "messageId_",
        type: "bytes32",
      },
    ],
    name: "getMessage",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "enum IVaultData.MessageActions",
                name: "action_",
                type: "uint8",
              },
              {
                internalType: "enum IVaultData.Errors",
                name: "errors_",
                type: "uint8",
              },
              {
                internalType: "string",
                name: "message_",
                type: "string",
              },
              {
                components: [
                  {
                    internalType: "uint256",
                    name: "profileId_",
                    type: "uint256",
                  },
                  {
                    internalType: "address",
                    name: "owner_",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "balance_",
                    type: "uint256",
                  },
                ],
                internalType: "struct IVaultData.UpdateMessage",
                name: "update_",
                type: "tuple",
              },
              {
                internalType: "bytes32",
                name: "returnMessageId_",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "value_",
                type: "uint256",
              },
            ],
            internalType: "struct IVaultData.Message",
            name: "message_",
            type: "tuple",
          },
          {
            internalType: "bool",
            name: "fullFilled_",
            type: "bool",
          },
        ],
        internalType: "struct IVaultData.PastMessage",
        name: "",
        type: "tuple",
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
    name: "getProfileDeposits",
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
        name: "profileId_",
        type: "uint256",
      },
    ],
    name: "getProfilesEscrowedBalance",
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
    inputs: [],
    name: "withdrawAllToDev",
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
    name: "withdrawFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60e06040526001805460ff60a01b1990811690915560048054909116600160a01b1790553480156200003057600080fd5b506040516200275438038062002754833981016040819052620000539162000192565b338284806001600160a01b03811662000087576040516335fdcccd60e21b8152600060048201526024015b60405180910390fd5b6001600160a01b03908116608052600080549282166001600160a01b031993841617905560018054938216939092169290921790558116620000e057604051631e4fbdf760e01b8152600060048201526024016200007e565b620000eb8162000123565b506001600160a01b0394851660a0526001600160401b031660c0525050600580546001600160a01b0319169190921617905562000212565b600480546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b80516001600160a01b03811681146200018d57600080fd5b919050565b600080600080600060a08688031215620001ab57600080fd5b620001b68662000175565b9450620001c66020870162000175565b9350620001d66040870162000175565b9250620001e66060870162000175565b60808701519092506001600160401b03811681146200020457600080fd5b809150509295509295909350565b60805160a05160c0516124e16200027360003960008181610312015281816106420152610a3b01526000818161025a015281816108d301528181610d9001528181610f3a0152610ff10152600081816102d601526107e301526124e16000f3fe608060405234801561001057600080fd5b506004361061016c5760003560e01c80639c7ed5d0116100cd578063d0ffd7a711610081578063e8a6b60f11610066578063e8a6b60f14610347578063ebfbaa6b1461034f578063f2fde38b1461035e57600080fd5b8063d0ffd7a7146102c5578063e52531051461033457600080fd5b8063b0f479a1116100b2578063b0f479a1146102d4578063bfe22a01146102fa578063ca65a4fe1461030d57600080fd5b80639c7ed5d0146102a5578063af54d669146102c557600080fd5b80636e0ed3e31161012457806385572ffb1161010957806385572ffb14610242578063877c86fb146102555780638da5cb5b1461029457600080fd5b80636e0ed3e31461020c578063715018a61461023a57600080fd5b806322f3e2d41161015557806322f3e2d4146101bd57806361638ed5146101cf5780636cf42b1d146101e457600080fd5b80630139a2211461017157806301ffc9a71461019a575b600080fd5b61018461017f366004611b92565b610371565b6040516101919190611ca8565b60405180910390f35b6101ad6101a8366004611cdc565b6104f4565b6040519015158152602001610191565b600454600160a01b900460ff166101ad565b6101e26101dd366004611d0d565b61055d565b005b6101f367de41ba4fc9d91ad981565b60405167ffffffffffffffff9091168152602001610191565b61022c61021a366004611b92565b60009081526007602052604090205490565b604051908152602001610191565b6101e26107c4565b6101e2610250366004611d2f565b6107d8565b61027c7f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b039091168152602001610191565b6004546001600160a01b031661027c565b61022c6102b3366004611b92565b60009081526006602052604090205490565b6101f367adecc60412ce25a581565b7f000000000000000000000000000000000000000000000000000000000000000061027c565b6101e2610308366004611d78565b610855565b6101f37f000000000000000000000000000000000000000000000000000000000000000081565b6101e2610342366004611d0d565b610866565b6101e2610bc7565b6101f36724f9b897ef58a92281565b6101e261036c366004611daa565b610e94565b610379611b10565b6000828152600b602052604090819020815161010081018352815490928391908201908390829060ff1660048111156103b4576103b4611bab565b60048111156103c5576103c5611bab565b81528154602090910190610100900460ff1660038111156103e8576103e8611bab565b60038111156103f9576103f9611bab565b815260200160018201805461040d90611dc7565b80601f016020809104026020016040519081016040528092919081815260200182805461043990611dc7565b80156104865780601f1061045b57610100808354040283529160200191610486565b820191906000526020600020905b81548152906001019060200180831161046957829003601f168201915b505050918352505060408051606080820183526002850154825260038501546001600160a01b0316602083810191909152600486015483850152808501929092526005850154928401929092526006909301549101529082526007929092015460ff16151591015292915050565b60006001600160e01b031982167f85572ffb00000000000000000000000000000000000000000000000000000000148061055757506001600160e01b031982167f01ffc9a700000000000000000000000000000000000000000000000000000000145b92915050565b8161056781610ee8565b61058457604051631925ad1360e11b815260040160405180910390fd5b8161058e33610f18565b10156105ad57604051633d57bedb60e01b815260040160405180910390fd5b60006105ba303385610fa7565b905080156107be57600084815260066020526040812080548592906105e0908490611e17565b90915550506040805160c0810182526000808252602080830182905283518082018552828152838501528351606081810186528982529181018390529384018290528201929092526080810182905260a08101859052600554909190610671907f0000000000000000000000000000000000000000000000000000000000000000906001600160a01b031684611068565b60408051808201825284815260006020808301829052848252600b905291909120815180518254949550929391929091839190829060ff191660018360048111156106be576106be611bab565b021790555060208201518154829061ff0019166101008360038111156106e6576106e6611bab565b0217905550604082015160018201906106ff9082611e8e565b506060828101518051600284015560208082015160038501805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0390921691909117905560409182015160048501556080850151600585015560a09094015160069093019290925593820151600793909301805460ff19169315159390931790925581518481529081018990529081018790527f70c7eee9b8e747679baa960bd18353b1ffbeb6e9c0d7cc60ee8610f9a1d4a438910160405180910390a150505b50505050565b6107cc611102565b6107d66000611148565b565b336001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614610841576040517fd7f733340000000000000000000000000000000000000000000000000000000081523360048201526024015b60405180910390fd5b61085261084d82612136565b6111a7565b50565b61085d611102565b61085281611306565b8161087081610ee8565b61088d57604051631925ad1360e11b815260040160405180910390fd5b6000838152600760205260409020548211156108bc57604051633d57bedb60e01b815260040160405180910390fd5b6040516370a0823160e01b815230600482015282907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401602060405180830381865afa158015610922573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061094691906121e3565b101561097e576040517f989867ee00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000838152600760205260408120805484929061099c9084906121fc565b9091555050600083815260066020526040812080548492906109bf908490611e17565b90915550506040805160c081019091526000908060018152602001600081526020016040518060200160405280600081525081526020016040518060600160405280878152602001610a0e3390565b6001600160a01b031681526020018681525081526020016000801b81526020018481525090506000610a767f0000000000000000000000000000000000000000000000000000000000000000600560009054906101000a90046001600160a01b031684611068565b60408051808201825284815260006020808301829052848252600b905291909120815180518254949550929391929091839190829060ff19166001836004811115610ac357610ac3611bab565b021790555060208201518154829061ff001916610100836003811115610aeb57610aeb611bab565b021790555060408201516001820190610b049082611e8e565b506060828101518051600284015560208082015160038501805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0390921691909117905560409182015160048501556080850151600585015560a09094015160069093019290925593820151600793909301805460ff19169315159390931790925581518481529081018890529081018690527f2eca46511d9aa3dc729c2822fabfc7bf95d45770fb6ab4c45862878568eb9fb9910160405180910390a15050505050565b6001546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a0823190602401602060405180830381865afa158015610c10573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c3491906121e3565b6001549091506001600160a01b031663a9059cbb336040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602481018490526044016020604051808303816000875af1158015610c96573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cba919061220f565b5047600080336001600160a01b03168360405160006040518083038185875af1925050503d8060008114610d0a576040519150601f19603f3d011682016040523d82523d6000602084013e610d0f565b606091505b509150915081610d7b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f4661696c656420746f2073656e642045746865720000000000000000000000006044820152606401610838565b6040516370a0823160e01b81523060048201527f0000000000000000000000000000000000000000000000000000000000000000906000906001600160a01b038316906370a0823190602401602060405180830381865afa158015610de4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e0891906121e3565b90506001600160a01b03821663a9059cbb336040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602481018490526044016020604051808303816000875af1158015610e67573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e8b919061220f565b50505050505050565b610e9c611102565b6001600160a01b038116610edf576040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260006004820152602401610838565b61085281611148565b6000818152600a6020526040812054336001600160a01b0390911603610f1057506001919050565b506000919050565b6040516370a0823160e01b81526001600160a01b0382811660048301526000917f0000000000000000000000000000000000000000000000000000000000000000909116906370a0823190602401602060405180830381865afa158015610f83573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061055791906121e3565b6040517f23b872dd0000000000000000000000000000000000000000000000000000000081526001600160a01b0384811660048301528381166024830152604482018390526000917f0000000000000000000000000000000000000000000000000000000000000000909116906323b872dd906064016020604051808303816000875af115801561103c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611060919061220f565b949350505050565b6000611072611102565b60006110a18484604051602001611089919061222c565b604051602081830303815290604052620f424061136a565b90506000806110b087846114c0565b6040805183815267ffffffffffffffff8b1660208201529294509092507f3d268d705c99ec99e84748365f374dea1d745080faad9ddfa8c2715d20b50cb0910160405180910390a15095945050505050565b6004546001600160a01b031633146107d6576040517f118cdaa7000000000000000000000000000000000000000000000000000000008152336004820152602401610838565b600480546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b806020015181604001518060200190518101906111c4919061223f565b67ffffffffffffffff821660009081526003602052604090205460ff16611222576040517e651a9900000000000000000000000000000000000000000000000000000000815267ffffffffffffffff83166004820152602401610838565b67ffffffffffffffff82166000908152600260205260409020546001600160a01b0382811691161461128a576040517e0e48e30000000000000000000000000000000000000000000000000000000081526001600160a01b0382166004820152602401610838565b600083606001518060200190518101906112a49190612315565b90507f556d717a59d7ef2969f5a9f2c6f9199f9a4e78cb7704aa4162ee70f7d2b771f1846000015185602001516040516112f292919091825267ffffffffffffffff16602082015260400190565b60405180910390a180516107be9085611818565b600480547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff16600160a01b831515908102919091179091556040517fbdf1a3ee1d5eb15aa60ae1a81488107759732ead44999c8c807575100def058b90600090a250565b6113a56040518060a0016040528060608152602001606081526020016060815260200160006001600160a01b03168152602001606081525090565b6040805160a081019091526001600160a01b03851660c08201528060e0810160408051808303601f19018152918152908252602080830187905281516000808252918101835292909101919061141d565b60408051808201909152600080825260208201528152602001906001900390816113f65790505b50815260200161142b611860565b6001600160a01b031681526020016114b660405180602001604052808681525060408051915160248084019190915281518084039091018152604490920190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f97a657c90000000000000000000000000000000000000000000000000000000017905290565b9052949350505050565b6000806000306001600160a01b031663b0f479a16040518163ffffffff1660e01b8152600401602060405180830381865afa158015611503573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611527919061223f565b6040517f20487ded0000000000000000000000000000000000000000000000000000000081529091506001600160a01b038216906320487ded9061157190889088906004016123d1565b602060405180830381865afa15801561158e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115b291906121e3565b600154909250600090600160a01b900460ff161561176c576001546040516370a0823160e01b81523060048201526001600160a01b03909116906370a0823190602401602060405180830381865afa158015611612573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061163691906121e3565b90508083111561166357604051634787a10360e11b81526004810182905260248101849052604401610838565b6001546040517f095ea7b30000000000000000000000000000000000000000000000000000000081526001600160a01b038481166004830152602482018690529091169063095ea7b3906044016020604051808303816000875af11580156116cf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116f3919061220f565b506040516396f4e9f960e01b81526001600160a01b038316906396f4e9f99061172290899089906004016123d1565b6020604051808303816000875af1158015611741573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061176591906121e3565b935061180f565b50478083111561179957604051634787a10360e11b81526004810182905260248101849052604401610838565b6040516396f4e9f960e01b81526001600160a01b038316906396f4e9f99085906117c9908a908a906004016123d1565b60206040518083038185885af11580156117e7573d6000803e3d6000fd5b50505050506040513d601f19601f8201168201806040525081019061180c91906121e3565b93505b50509250929050565b600382600481111561182c5761182c611bab565b0361183a5761183a8161188b565b600482600481111561184e5761184e611bab565b0361185c5761185c816118aa565b5050565b600154600090600160a01b900460ff161561188557506001546001600160a01b031690565b50600090565b600081606001518060200190518101906118a59190612315565b505050565b600081606001518060200190518101906118c49190612315565b60808101516000908152600b602052604090206007015490915060ff1661185c57600160808201516000908152600b602052604090205460ff16600481111561190f5761190f611bab565b0361191d5761185c81611953565b60808101516000908152600b602052604081205460ff16600481111561194557611945611bab565b0361185c5761185c81611a51565b60a081015160608201515160009081526006602052604090205410156119c05760608101515160808201516040517f83cf54fc35553325f6701d5b5cad0a31905633e5eee7982da99cf1aac4b2ec59926119b592908252602082015260400190565b60405180910390a150565b60a0810151606082015151600090815260066020526040812080549091906119e99084906121fc565b909155505060808101516000908152600b602052604090819020600701805460ff1916600117905560608201515160a083015191517fed88cc7705cbd208a6b78b0cd0db857cd891ddb78c9bbd919d80a47c9bf4dd8b926119b5928252602082015260400190565b60a081015160608201515160009081526006602052604081208054909190611a7a9084906121fc565b909155505060a081015160608201515160009081526007602052604081208054909190611aa8908490611e17565b909155505060808101516000908152600b602052604090819020600701805460ff1916600117905560608201515160a083015191517f5ae0ccc16edecce25abcf8ebe48fdc9c1d5d8f757495fb5783937817453ad250926119b5928252602082015260400190565b6040518060400160405280611b23611b30565b8152600060209091015290565b6040805160c0810190915280600081526020016000815260200160608152602001611b7e60405180606001604052806000815260200160006001600160a01b03168152602001600081525090565b815260006020820181905260409091015290565b600060208284031215611ba457600080fd5b5035919050565b634e487b7160e01b600052602160045260246000fd5b60005b83811015611bdc578181015183820152602001611bc4565b50506000910152565b60008151808452611bfd816020860160208601611bc1565b601f01601f19169290920160200192915050565b6000610100825160058110611c2857611c28611bab565b8452602083015160048110611c3f57611c3f611bab565b806020860152506040830151816040860152611c5d82860182611be5565b9150506060830151805160608601526001600160a01b036020820151166080860152604081015160a086015250608083015160c085015260a083015160e08501528091505092915050565b602081526000825160406020840152611cc46060840182611c11565b90506020840151151560408401528091505092915050565b600060208284031215611cee57600080fd5b81356001600160e01b031981168114611d0657600080fd5b9392505050565b60008060408385031215611d2057600080fd5b50508035926020909101359150565b600060208284031215611d4157600080fd5b813567ffffffffffffffff811115611d5857600080fd5b820160a08185031215611d0657600080fd5b801515811461085257600080fd5b600060208284031215611d8a57600080fd5b8135611d0681611d6a565b6001600160a01b038116811461085257600080fd5b600060208284031215611dbc57600080fd5b8135611d0681611d95565b600181811c90821680611ddb57607f821691505b602082108103611dfb57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b8082018082111561055757610557611e01565b634e487b7160e01b600052604160045260246000fd5b601f8211156118a557600081815260208120601f850160051c81016020861015611e675750805b601f850160051c820191505b81811015611e8657828155600101611e73565b505050505050565b815167ffffffffffffffff811115611ea857611ea8611e2a565b611ebc81611eb68454611dc7565b84611e40565b602080601f831160018114611ef15760008415611ed95750858301515b600019600386901b1c1916600185901b178555611e86565b600085815260208120601f198616915b82811015611f2057888601518255948401946001909101908401611f01565b5085821015611f3e5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6040805190810167ffffffffffffffff81118282101715611f7157611f71611e2a565b60405290565b60405160a0810167ffffffffffffffff81118282101715611f7157611f71611e2a565b60405160c0810167ffffffffffffffff81118282101715611f7157611f71611e2a565b604051601f8201601f1916810167ffffffffffffffff81118282101715611fe657611fe6611e2a565b604052919050565b803567ffffffffffffffff8116811461200657600080fd5b919050565b600067ffffffffffffffff82111561202557612025611e2a565b50601f01601f191660200190565b600082601f83011261204457600080fd5b81356120576120528261200b565b611fbd565b81815284602083860101111561206c57600080fd5b816020850160208301376000918101602001919091529392505050565b600082601f83011261209a57600080fd5b8135602067ffffffffffffffff8211156120b6576120b6611e2a565b6120c4818360051b01611fbd565b82815260069290921b840181019181810190868411156120e357600080fd5b8286015b8481101561212b57604081890312156121005760008081fd5b612108611f4e565b813561211381611d95565b815281850135858201528352918301916040016120e7565b509695505050505050565b600060a0823603121561214857600080fd5b612150611f77565b8235815261216060208401611fee565b6020820152604083013567ffffffffffffffff8082111561218057600080fd5b61218c36838701612033565b604084015260608501359150808211156121a557600080fd5b6121b136838701612033565b606084015260808501359150808211156121ca57600080fd5b506121d736828601612089565b60808301525092915050565b6000602082840312156121f557600080fd5b5051919050565b8181038181111561055757610557611e01565b60006020828403121561222157600080fd5b8151611d0681611d6a565b602081526000611d066020830184611c11565b60006020828403121561225157600080fd5b8151611d0681611d95565b80516004811061200657600080fd5b600082601f83011261227c57600080fd5b815161228a6120528261200b565b81815284602083860101111561229f57600080fd5b611060826020830160208701611bc1565b6000606082840312156122c257600080fd5b6040516060810181811067ffffffffffffffff821117156122e5576122e5611e2a565b80604052508091508251815260208301516122ff81611d95565b6020820152604092830151920191909152919050565b60006020828403121561232757600080fd5b815167ffffffffffffffff8082111561233f57600080fd5b90830190610100828603121561235457600080fd5b61235c611f9a565b82516005811061236b57600080fd5b81526123796020840161225c565b602082015260408301518281111561239057600080fd5b61239c8782860161226b565b6040830152506123af86606085016122b0565b606082015260c0830151608082015260e09092015160a0830152509392505050565b6000604067ffffffffffffffff8516835260208181850152845160a0838601526123fe60e0860182611be5565b905081860151603f198087840301606088015261241b8383611be5565b88860151888203830160808a01528051808352908601945060009350908501905b8084101561246e57845180516001600160a01b031683528601518683015293850193600193909301929086019061243c565b5060608901516001600160a01b031660a08901526080890151888203830160c08a0152955061249d8187611be5565b9a995050505050505050505056fea2646970667358221220b902abb13639fd597f15aaaabbb67188f7de79fee8252fb82ed79b0d340aadea64736f6c63430008140033";

type Hom3DepositVaultConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: Hom3DepositVaultConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Hom3DepositVault__factory extends ContractFactory {
  constructor(...args: Hom3DepositVaultConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    ghoToken_: AddressLike,
    masterContract_: AddressLike,
    ccipRouter_: AddressLike,
    linkToken_: AddressLike,
    masterChainId_: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      ghoToken_,
      masterContract_,
      ccipRouter_,
      linkToken_,
      masterChainId_,
      overrides || {}
    );
  }
  override deploy(
    ghoToken_: AddressLike,
    masterContract_: AddressLike,
    ccipRouter_: AddressLike,
    linkToken_: AddressLike,
    masterChainId_: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      ghoToken_,
      masterContract_,
      ccipRouter_,
      linkToken_,
      masterChainId_,
      overrides || {}
    ) as Promise<
      Hom3DepositVault & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Hom3DepositVault__factory {
    return super.connect(runner) as Hom3DepositVault__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Hom3DepositVaultInterface {
    return new Interface(_abi) as Hom3DepositVaultInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): Hom3DepositVault {
    return new Contract(address, _abi, runner) as unknown as Hom3DepositVault;
  }
}
