/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
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
} from "../../common";

export interface IVaultDataInterface extends Interface {
  getEvent(
    nameOrSignatureOrTopic:
      | "DepositedFunds"
      | "DepositedFundsRequested"
      | "ProfileOwnershipTransferred"
      | "WithdrewFunds"
      | "WithdrewFundsRequested"
  ): EventFragment;
}

export namespace DepositedFundsEvent {
  export type InputTuple = [profileId_: BigNumberish, amount_: BigNumberish];
  export type OutputTuple = [profileId_: bigint, amount_: bigint];
  export interface OutputObject {
    profileId_: bigint;
    amount_: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DepositedFundsRequestedEvent {
  export type InputTuple = [
    messageId_: BytesLike,
    profileId_: BigNumberish,
    amount_: BigNumberish
  ];
  export type OutputTuple = [
    messageId_: string,
    profileId_: bigint,
    amount_: bigint
  ];
  export interface OutputObject {
    messageId_: string;
    profileId_: bigint;
    amount_: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ProfileOwnershipTransferredEvent {
  export type InputTuple = [profileId_: BigNumberish, to_: AddressLike];
  export type OutputTuple = [profileId_: bigint, to_: string];
  export interface OutputObject {
    profileId_: bigint;
    to_: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace WithdrewFundsEvent {
  export type InputTuple = [profileId_: BigNumberish, amount_: BigNumberish];
  export type OutputTuple = [profileId_: bigint, amount_: bigint];
  export interface OutputObject {
    profileId_: bigint;
    amount_: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace WithdrewFundsRequestedEvent {
  export type InputTuple = [
    messageId_: BytesLike,
    profileId_: BigNumberish,
    amount_: BigNumberish
  ];
  export type OutputTuple = [
    messageId_: string,
    profileId_: bigint,
    amount_: bigint
  ];
  export interface OutputObject {
    messageId_: string;
    profileId_: bigint;
    amount_: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IVaultData extends BaseContract {
  connect(runner?: ContractRunner | null): IVaultData;
  waitForDeployment(): Promise<this>;

  interface: IVaultDataInterface;

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

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getEvent(
    key: "DepositedFunds"
  ): TypedContractEvent<
    DepositedFundsEvent.InputTuple,
    DepositedFundsEvent.OutputTuple,
    DepositedFundsEvent.OutputObject
  >;
  getEvent(
    key: "DepositedFundsRequested"
  ): TypedContractEvent<
    DepositedFundsRequestedEvent.InputTuple,
    DepositedFundsRequestedEvent.OutputTuple,
    DepositedFundsRequestedEvent.OutputObject
  >;
  getEvent(
    key: "ProfileOwnershipTransferred"
  ): TypedContractEvent<
    ProfileOwnershipTransferredEvent.InputTuple,
    ProfileOwnershipTransferredEvent.OutputTuple,
    ProfileOwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "WithdrewFunds"
  ): TypedContractEvent<
    WithdrewFundsEvent.InputTuple,
    WithdrewFundsEvent.OutputTuple,
    WithdrewFundsEvent.OutputObject
  >;
  getEvent(
    key: "WithdrewFundsRequested"
  ): TypedContractEvent<
    WithdrewFundsRequestedEvent.InputTuple,
    WithdrewFundsRequestedEvent.OutputTuple,
    WithdrewFundsRequestedEvent.OutputObject
  >;

  filters: {
    "DepositedFunds(uint256,uint256)": TypedContractEvent<
      DepositedFundsEvent.InputTuple,
      DepositedFundsEvent.OutputTuple,
      DepositedFundsEvent.OutputObject
    >;
    DepositedFunds: TypedContractEvent<
      DepositedFundsEvent.InputTuple,
      DepositedFundsEvent.OutputTuple,
      DepositedFundsEvent.OutputObject
    >;

    "DepositedFundsRequested(bytes32,uint256,uint256)": TypedContractEvent<
      DepositedFundsRequestedEvent.InputTuple,
      DepositedFundsRequestedEvent.OutputTuple,
      DepositedFundsRequestedEvent.OutputObject
    >;
    DepositedFundsRequested: TypedContractEvent<
      DepositedFundsRequestedEvent.InputTuple,
      DepositedFundsRequestedEvent.OutputTuple,
      DepositedFundsRequestedEvent.OutputObject
    >;

    "ProfileOwnershipTransferred(uint256,address)": TypedContractEvent<
      ProfileOwnershipTransferredEvent.InputTuple,
      ProfileOwnershipTransferredEvent.OutputTuple,
      ProfileOwnershipTransferredEvent.OutputObject
    >;
    ProfileOwnershipTransferred: TypedContractEvent<
      ProfileOwnershipTransferredEvent.InputTuple,
      ProfileOwnershipTransferredEvent.OutputTuple,
      ProfileOwnershipTransferredEvent.OutputObject
    >;

    "WithdrewFunds(uint256,uint256)": TypedContractEvent<
      WithdrewFundsEvent.InputTuple,
      WithdrewFundsEvent.OutputTuple,
      WithdrewFundsEvent.OutputObject
    >;
    WithdrewFunds: TypedContractEvent<
      WithdrewFundsEvent.InputTuple,
      WithdrewFundsEvent.OutputTuple,
      WithdrewFundsEvent.OutputObject
    >;

    "WithdrewFundsRequested(bytes32,uint256,uint256)": TypedContractEvent<
      WithdrewFundsRequestedEvent.InputTuple,
      WithdrewFundsRequestedEvent.OutputTuple,
      WithdrewFundsRequestedEvent.OutputObject
    >;
    WithdrewFundsRequested: TypedContractEvent<
      WithdrewFundsRequestedEvent.InputTuple,
      WithdrewFundsRequestedEvent.OutputTuple,
      WithdrewFundsRequestedEvent.OutputObject
    >;
  };
}
