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
} from "../../common";

export interface IHom3DepositVaultInterface extends Interface {
  getFunction(
    nameOrSignature: "depositFunds" | "getProfileDeposits" | "withdrawFunds"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "DepositedFunds"
      | "DepositedFundsRequested"
      | "EscrowBalanceToLow"
      | "ProfileOwnershipTransferred"
      | "WithdrewFunds"
      | "WithdrewFundsRequested"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "depositFunds",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getProfileDeposits",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawFunds",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "depositFunds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getProfileDeposits",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawFunds",
    data: BytesLike
  ): Result;
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

export namespace EscrowBalanceToLowEvent {
  export type InputTuple = [userProfile_: BigNumberish, messageId_: BytesLike];
  export type OutputTuple = [userProfile_: bigint, messageId_: string];
  export interface OutputObject {
    userProfile_: bigint;
    messageId_: string;
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

export interface IHom3DepositVault extends BaseContract {
  connect(runner?: ContractRunner | null): IHom3DepositVault;
  waitForDeployment(): Promise<this>;

  interface: IHom3DepositVaultInterface;

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

  depositFunds: TypedContractMethod<
    [profileId_: BigNumberish, amount_: BigNumberish],
    [void],
    "nonpayable"
  >;

  getProfileDeposits: TypedContractMethod<
    [profileId_: BigNumberish],
    [bigint],
    "view"
  >;

  withdrawFunds: TypedContractMethod<
    [profileId_: BigNumberish, amount_: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "depositFunds"
  ): TypedContractMethod<
    [profileId_: BigNumberish, amount_: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getProfileDeposits"
  ): TypedContractMethod<[profileId_: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "withdrawFunds"
  ): TypedContractMethod<
    [profileId_: BigNumberish, amount_: BigNumberish],
    [void],
    "nonpayable"
  >;

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
    key: "EscrowBalanceToLow"
  ): TypedContractEvent<
    EscrowBalanceToLowEvent.InputTuple,
    EscrowBalanceToLowEvent.OutputTuple,
    EscrowBalanceToLowEvent.OutputObject
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

    "EscrowBalanceToLow(uint256,bytes32)": TypedContractEvent<
      EscrowBalanceToLowEvent.InputTuple,
      EscrowBalanceToLowEvent.OutputTuple,
      EscrowBalanceToLowEvent.OutputObject
    >;
    EscrowBalanceToLow: TypedContractEvent<
      EscrowBalanceToLowEvent.InputTuple,
      EscrowBalanceToLowEvent.OutputTuple,
      EscrowBalanceToLowEvent.OutputObject
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
