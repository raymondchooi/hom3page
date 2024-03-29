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
} from "../../../common";

export declare namespace AaveFaucetbApp {
  export type TokenAddressesStruct = {
    WBTC: AddressLike;
    AAVE: AddressLike;
    WETH: AddressLike;
    USDC: AddressLike;
  };

  export type TokenAddressesStructOutput = [
    WBTC: string,
    AAVE: string,
    WETH: string,
    USDC: string
  ] & { WBTC: string; AAVE: string; WETH: string; USDC: string };

  export type MintAmountStruct = {
    WBTC: BigNumberish;
    AAVE: BigNumberish;
    WETH: BigNumberish;
    USDC: BigNumberish;
  };

  export type MintAmountStructOutput = [
    WBTC: bigint,
    AAVE: bigint,
    WETH: bigint,
    USDC: bigint
  ] & { WBTC: bigint; AAVE: bigint; WETH: bigint; USDC: bigint };
}

export interface AaveFaucetbAppInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "getAllTokenAddress"
      | "isActive"
      | "mint"
      | "owner"
      | "renounceOwnership"
      | "setActiveState"
      | "transferOwnership"
      | "updateAddresses"
      | "updateFaucetAddress"
      | "updateLimits"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "ContractActiveStateChange" | "OwnershipTransferred"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "getAllTokenAddress",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "isActive", values?: undefined): string;
  encodeFunctionData(functionFragment: "mint", values: [AddressLike]): string;
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
    functionFragment: "updateAddresses",
    values: [AaveFaucetbApp.TokenAddressesStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "updateFaucetAddress",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "updateLimits",
    values: [AaveFaucetbApp.MintAmountStruct]
  ): string;

  decodeFunctionResult(
    functionFragment: "getAllTokenAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isActive", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
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
    functionFragment: "updateAddresses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateFaucetAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateLimits",
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

export interface AaveFaucetbApp extends BaseContract {
  connect(runner?: ContractRunner | null): AaveFaucetbApp;
  waitForDeployment(): Promise<this>;

  interface: AaveFaucetbAppInterface;

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

  getAllTokenAddress: TypedContractMethod<
    [],
    [AaveFaucetbApp.TokenAddressesStructOutput],
    "view"
  >;

  isActive: TypedContractMethod<[], [boolean], "view">;

  mint: TypedContractMethod<[to_: AddressLike], [void], "nonpayable">;

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

  updateAddresses: TypedContractMethod<
    [newAddresses_: AaveFaucetbApp.TokenAddressesStruct],
    [void],
    "nonpayable"
  >;

  updateFaucetAddress: TypedContractMethod<
    [newAddress_: AddressLike],
    [void],
    "nonpayable"
  >;

  updateLimits: TypedContractMethod<
    [newAmounts_: AaveFaucetbApp.MintAmountStruct],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "getAllTokenAddress"
  ): TypedContractMethod<
    [],
    [AaveFaucetbApp.TokenAddressesStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "isActive"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "mint"
  ): TypedContractMethod<[to_: AddressLike], [void], "nonpayable">;
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
    nameOrSignature: "updateAddresses"
  ): TypedContractMethod<
    [newAddresses_: AaveFaucetbApp.TokenAddressesStruct],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "updateFaucetAddress"
  ): TypedContractMethod<[newAddress_: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "updateLimits"
  ): TypedContractMethod<
    [newAmounts_: AaveFaucetbApp.MintAmountStruct],
    [void],
    "nonpayable"
  >;

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
  };
}
