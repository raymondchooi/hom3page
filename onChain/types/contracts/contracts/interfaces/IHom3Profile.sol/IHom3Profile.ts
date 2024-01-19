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

export interface IHom3ProfileInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "_setLensProfile"
      | "blockPurchaseMint"
      | "signUpAndCreateLens"
      | "signUpWithLens"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "ProfileCreated"): EventFragment;

  encodeFunctionData(
    functionFragment: "_setLensProfile",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "blockPurchaseMint",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "signUpAndCreateLens",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "signUpWithLens",
    values: [AddressLike, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "_setLensProfile",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "blockPurchaseMint",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "signUpAndCreateLens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "signUpWithLens",
    data: BytesLike
  ): Result;
}

export namespace ProfileCreatedEvent {
  export type InputTuple = [owner_: AddressLike, profileId_: BigNumberish];
  export type OutputTuple = [owner_: string, profileId_: bigint];
  export interface OutputObject {
    owner_: string;
    profileId_: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IHom3Profile extends BaseContract {
  connect(runner?: ContractRunner | null): IHom3Profile;
  waitForDeployment(): Promise<this>;

  interface: IHom3ProfileInterface;

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

  _setLensProfile: TypedContractMethod<
    [profileId_: BigNumberish, lensProfileId_: BigNumberish],
    [void],
    "nonpayable"
  >;

  blockPurchaseMint: TypedContractMethod<
    [owner_: AddressLike],
    [void],
    "nonpayable"
  >;

  signUpAndCreateLens: TypedContractMethod<
    [owner_: AddressLike],
    [void],
    "nonpayable"
  >;

  signUpWithLens: TypedContractMethod<
    [owner_: AddressLike, lensProfileId_: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "_setLensProfile"
  ): TypedContractMethod<
    [profileId_: BigNumberish, lensProfileId_: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "blockPurchaseMint"
  ): TypedContractMethod<[owner_: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "signUpAndCreateLens"
  ): TypedContractMethod<[owner_: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "signUpWithLens"
  ): TypedContractMethod<
    [owner_: AddressLike, lensProfileId_: BigNumberish],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "ProfileCreated"
  ): TypedContractEvent<
    ProfileCreatedEvent.InputTuple,
    ProfileCreatedEvent.OutputTuple,
    ProfileCreatedEvent.OutputObject
  >;

  filters: {
    "ProfileCreated(address,uint256)": TypedContractEvent<
      ProfileCreatedEvent.InputTuple,
      ProfileCreatedEvent.OutputTuple,
      ProfileCreatedEvent.OutputObject
    >;
    ProfileCreated: TypedContractEvent<
      ProfileCreatedEvent.InputTuple,
      ProfileCreatedEvent.OutputTuple,
      ProfileCreatedEvent.OutputObject
    >;
  };
}
