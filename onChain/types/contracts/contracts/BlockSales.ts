/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface BlockSalesInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "GHO"
      | "NFT"
      | "buyBatchBlock"
      | "buyBlock"
      | "getBlockCost"
      | "getTotalSold"
      | "owner"
      | "renounceOwnership"
      | "setActiveState"
      | "transferOwnership"
      | "withdrawBlock"
      | "withdrawFunds"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "ContractActiveStateChange"
      | "OwnershipTransferred"
      | "SaleMade"
  ): EventFragment;

  encodeFunctionData(functionFragment: "GHO", values?: undefined): string;
  encodeFunctionData(functionFragment: "NFT", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "buyBatchBlock",
    values: [BigNumberish[][]]
  ): string;
  encodeFunctionData(
    functionFragment: "buyBlock",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getBlockCost",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalSold",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setActiveState",
    values: [boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawBlock",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawFunds",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "GHO", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "NFT", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "buyBatchBlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "buyBlock", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getBlockCost",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTotalSold",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setActiveState",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawBlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawFunds",
    data: BytesLike
  ): Result;
}

export namespace ContractActiveStateChangeEvent {
  export type InputTuple = [newState_: boolean];
  export type OutputTuple = [newState_: boolean];
  export interface OutputObject {
    newState_: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SaleMadeEvent {
  export type InputTuple = [buyer_: AddressLike, amount_: BigNumberish];
  export type OutputTuple = [buyer_: string, amount_: bigint];
  export interface OutputObject {
    buyer_: string;
    amount_: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface BlockSales extends BaseContract {
  connect(runner?: ContractRunner | null): BlockSales;
  waitForDeployment(): Promise<this>;

  interface: BlockSalesInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  GHO: TypedContractMethod<[], [string], "view">;

  NFT: TypedContractMethod<[], [string], "view">;

  buyBatchBlock: TypedContractMethod<
    [tokenIds_: BigNumberish[][]],
    [void],
    "nonpayable"
  >;

  buyBlock: TypedContractMethod<[tokenId: BigNumberish], [void], "nonpayable">;

  getBlockCost: TypedContractMethod<[], [bigint], "view">;

  getTotalSold: TypedContractMethod<[], [bigint], "view">;

  owner: TypedContractMethod<[], [string], "view">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  setActiveState: TypedContractMethod<
    [newState_: boolean],
    [void],
    "nonpayable"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  withdrawBlock: TypedContractMethod<
    [withdrawAddress_: AddressLike, tokenId_: BigNumberish],
    [void],
    "nonpayable"
  >;

  withdrawFunds: TypedContractMethod<
    [withdrawAddress_: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "GHO"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "NFT"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "buyBatchBlock"
  ): TypedContractMethod<[tokenIds_: BigNumberish[][]], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "buyBlock"
  ): TypedContractMethod<[tokenId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getBlockCost"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getTotalSold"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setActiveState"
  ): TypedContractMethod<[newState_: boolean], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdrawBlock"
  ): TypedContractMethod<
    [withdrawAddress_: AddressLike, tokenId_: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "withdrawFunds"
  ): TypedContractMethod<[withdrawAddress_: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "ContractActiveStateChange"
  ): TypedContractEvent<
    ContractActiveStateChangeEvent.InputTuple,
    ContractActiveStateChangeEvent.OutputTuple,
    ContractActiveStateChangeEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "SaleMade"
  ): TypedContractEvent<
    SaleMadeEvent.InputTuple,
    SaleMadeEvent.OutputTuple,
    SaleMadeEvent.OutputObject
  >;

  filters: {
    "ContractActiveStateChange(bool)": TypedContractEvent<
      ContractActiveStateChangeEvent.InputTuple,
      ContractActiveStateChangeEvent.OutputTuple,
      ContractActiveStateChangeEvent.OutputObject
    >;
    ContractActiveStateChange: TypedContractEvent<
      ContractActiveStateChangeEvent.InputTuple,
      ContractActiveStateChangeEvent.OutputTuple,
      ContractActiveStateChangeEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "SaleMade(address,uint256)": TypedContractEvent<
      SaleMadeEvent.InputTuple,
      SaleMadeEvent.OutputTuple,
      SaleMadeEvent.OutputObject
    >;
    SaleMade: TypedContractEvent<
      SaleMadeEvent.InputTuple,
      SaleMadeEvent.OutputTuple,
      SaleMadeEvent.OutputObject
    >;
  };
}
