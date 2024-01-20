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
import type { NonPayableOverrides } from "../../../../common";
import type {
  AaveFaucetbApp,
  AaveFaucetbAppInterface,
} from "../../../../contracts/apps/aaveFaucet.sol/AaveFaucetbApp";

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "WBTC",
            type: "address",
          },
          {
            internalType: "address",
            name: "AAVE",
            type: "address",
          },
          {
            internalType: "address",
            name: "WETH",
            type: "address",
          },
          {
            internalType: "address",
            name: "USDC",
            type: "address",
          },
        ],
        internalType: "struct AaveFaucetbApp.TokenAddresses",
        name: "addresses_",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "WBTC",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "AAVE",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "WETH",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "USDC",
            type: "uint256",
          },
        ],
        internalType: "struct AaveFaucetbApp.MintAmount",
        name: "mintCaps_",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "aaveFaucetAddress_",
        type: "address",
      },
      {
        internalType: "enum AaveFaucetbApp.Network",
        name: "network_",
        type: "uint8",
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
    name: "getAllTokenAddress",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "WBTC",
            type: "address",
          },
          {
            internalType: "address",
            name: "AAVE",
            type: "address",
          },
          {
            internalType: "address",
            name: "WETH",
            type: "address",
          },
          {
            internalType: "address",
            name: "USDC",
            type: "address",
          },
        ],
        internalType: "struct AaveFaucetbApp.TokenAddresses",
        name: "",
        type: "tuple",
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
    inputs: [
      {
        internalType: "address",
        name: "to_",
        type: "address",
      },
    ],
    name: "mint",
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
        components: [
          {
            internalType: "address",
            name: "WBTC",
            type: "address",
          },
          {
            internalType: "address",
            name: "AAVE",
            type: "address",
          },
          {
            internalType: "address",
            name: "WETH",
            type: "address",
          },
          {
            internalType: "address",
            name: "USDC",
            type: "address",
          },
        ],
        internalType: "struct AaveFaucetbApp.TokenAddresses",
        name: "newAddresses_",
        type: "tuple",
      },
    ],
    name: "updateAddresses",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newAddress_",
        type: "address",
      },
    ],
    name: "updateFaucetAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "WBTC",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "AAVE",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "WETH",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "USDC",
            type: "uint256",
          },
        ],
        internalType: "struct AaveFaucetbApp.MintAmount",
        name: "newAmounts_",
        type: "tuple",
      },
    ],
    name: "updateLimits",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a06040526000805460ff60a01b1916600160a01b1790553480156200002457600080fd5b5060405162000c1238038062000c128339810160408190526200004791620001ef565b33806200006e57604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b62000079816200013b565b508351600180546001600160a01b03199081166001600160a01b039384161782556020808801516002805484169186169190911790556040808901516003805485169187169190911790556060808a015160048054861691881691909117905588516005559188015160065587015160075586015160085560098054909116928516929092179091558190811115620001165762000116620002d9565b60808160018111156200012d576200012d620002d9565b8152505050505050620002ef565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b604051608081016001600160401b0381118282101715620001bc57634e487b7160e01b600052604160045260246000fd5b60405290565b80516001600160a01b0381168114620001da57600080fd5b919050565b805160028110620001da57600080fd5b6000806000808486036101408112156200020857600080fd5b60808112156200021757600080fd5b620002216200018b565b6200022c87620001c2565b81526200023c60208801620001c2565b60208201526200024f60408801620001c2565b60408201526200026260608801620001c2565b606082015294506080607f19820112156200027c57600080fd5b50620002876200018b565b6080860151815260a0860151602082015260c0860151604082015260e086015160608201529250620002bd6101008601620001c2565b9150620002ce6101208601620001df565b905092959194509250565b634e487b7160e01b600052602160045260246000fd5b6080516109076200030b600039600061045a01526109076000f3fe608060405234801561001057600080fd5b50600436106100be5760003560e01c80639dd0cc1011610076578063c23b313e1161005b578063c23b313e14610156578063f2fde38b14610169578063fab1d0491461017c57600080fd5b80639dd0cc1014610130578063bfe22a011461014357600080fd5b8063715018a6116100a7578063715018a6146100fa5780638da5cb5b14610102578063957d6ba01461011d57600080fd5b806322f3e2d4146100c35780636a627842146100e5575b600080fd5b600054600160a01b900460ff1660405190151581526020015b60405180910390f35b6100f86100f3366004610782565b610225565b005b6100f8610519565b6000546040516001600160a01b0390911681526020016100dc565b6100f861012b3660046107db565b61052d565b6100f861013e366004610782565b61059f565b6100f861015136600461083a565b6105d6565b6100f861016436600461085c565b6105e7565b6100f8610177366004610782565b61060d565b6101e260408051608081018252600080825260208201819052918101829052606081019190915250604080516080810182526001546001600160a01b03908116825260025481166020830152600354811692820192909252600454909116606082015290565b6040516100dc919081516001600160a01b039081168252602080840151821690830152604080840151821690830152606092830151169181019190915260800190565b600054600160a01b900460ff166102c3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f4f6e6c79416374697665203a205b69734163746976655d20436f6e747261637460448201527f206973207061757365640000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b600954600154600554604051636361ddf360e11b81526001600160a01b0392831660048201528483166024820152604481019190915291169063c6c3bbe6906064016020604051808303816000875af1158015610324573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061034891906108a2565b50600954600254600654604051636361ddf360e11b81526001600160a01b0392831660048201528483166024820152604481019190915291169063c6c3bbe6906064016020604051808303816000875af11580156103aa573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103ce91906108a2565b5060095460048054600854604051636361ddf360e11b81526001600160a01b0392831693810193909352848216602484015260448301529091169063c6c3bbe6906064016020604051808303816000875af1158015610431573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061045591906108a2565b5060017f0000000000000000000000000000000000000000000000000000000000000000600181111561048a5761048a6108bb565b0361051657600954600354600754604051636361ddf360e11b81526001600160a01b0392831660048201528483166024820152604481019190915291169063c6c3bbe6906064016020604051808303816000875af11580156104f0573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061051491906108a2565b505b50565b610521610661565b61052b60006106a7565b565b610535610661565b80516001805473ffffffffffffffffffffffffffffffffffffffff199081166001600160a01b039384161790915560208301516002805483169184169190911790556040830151600380548316918416919091179055606090920151600480549093169116179055565b6105a7610661565b6009805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b6105de610661565b61051681610704565b6105ef610661565b80516005556020810151600655604081015160075560600151600855565b610615610661565b6001600160a01b038116610658576040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600060048201526024016102ba565b610516816106a7565b6000546001600160a01b0316331461052b576040517f118cdaa70000000000000000000000000000000000000000000000000000000081523360048201526024016102ba565b600080546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600080547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff16600160a01b83151590810291909117825560405190917fbdf1a3ee1d5eb15aa60ae1a81488107759732ead44999c8c807575100def058b91a250565b80356001600160a01b038116811461077d57600080fd5b919050565b60006020828403121561079457600080fd5b61079d82610766565b9392505050565b6040516080810167ffffffffffffffff811182821017156107d557634e487b7160e01b600052604160045260246000fd5b60405290565b6000608082840312156107ed57600080fd5b6107f56107a4565b6107fe83610766565b815261080c60208401610766565b602082015261081d60408401610766565b604082015261082e60608401610766565b60608201529392505050565b60006020828403121561084c57600080fd5b8135801515811461079d57600080fd5b60006080828403121561086e57600080fd5b6108766107a4565b823581526020830135602082015260408301356040820152606083013560608201528091505092915050565b6000602082840312156108b457600080fd5b5051919050565b634e487b7160e01b600052602160045260246000fdfea26469706673582212209cd94606f9bf30e978e302e9d76d5fd3fff2c2d53b6958ccf3ddbf9162858a3b64736f6c63430008140033";

type AaveFaucetbAppConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AaveFaucetbAppConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AaveFaucetbApp__factory extends ContractFactory {
  constructor(...args: AaveFaucetbAppConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    addresses_: AaveFaucetbApp.TokenAddressesStruct,
    mintCaps_: AaveFaucetbApp.MintAmountStruct,
    aaveFaucetAddress_: AddressLike,
    network_: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      addresses_,
      mintCaps_,
      aaveFaucetAddress_,
      network_,
      overrides || {}
    );
  }
  override deploy(
    addresses_: AaveFaucetbApp.TokenAddressesStruct,
    mintCaps_: AaveFaucetbApp.MintAmountStruct,
    aaveFaucetAddress_: AddressLike,
    network_: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      addresses_,
      mintCaps_,
      aaveFaucetAddress_,
      network_,
      overrides || {}
    ) as Promise<
      AaveFaucetbApp & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): AaveFaucetbApp__factory {
    return super.connect(runner) as AaveFaucetbApp__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AaveFaucetbAppInterface {
    return new Interface(_abi) as AaveFaucetbAppInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): AaveFaucetbApp {
    return new Contract(address, _abi, runner) as unknown as AaveFaucetbApp;
  }
}
