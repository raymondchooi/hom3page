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

export interface IHom3VaultInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "depositFunds"
      | "getProfilesBalance"
      | "getSpendBalanceOfProfile"
      | "removeSpend"
      | "removeSpender"
      | "setSpend"
      | "setSpender"
      | "spend"
      | "withdrawFunds"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "DepositedFunds"
      | "SetSpendAllowance"
      | "SetSpender"
      | "WithdrewFunds"
      | "WithdrewFundsRequested"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "depositFunds",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getProfilesBalance",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getSpendBalanceOfProfile",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "removeSpend",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "removeSpender",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setSpend",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setSpender",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "spend",
    values: [BigNumberish, BigNumberish, BytesLike]
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
    functionFragment: "getProfilesBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSpendBalanceOfProfile",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeSpend",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeSpender",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setSpend", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setSpender", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "spend", data: BytesLike): Result;
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

export namespace SetSpendAllowanceEvent {
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

export namespace SetSpenderEvent {
  export type InputTuple = [profileId_: BigNumberish, spender_: AddressLike];
  export type OutputTuple = [profileId_: bigint, spender_: string];
  export interface OutputObject {
    profileId_: bigint;
    spender_: string;
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

export interface IHom3Vault extends BaseContract {
  connect(runner?: ContractRunner | null): IHom3Vault;
  waitForDeployment(): Promise<this>;

  interface: IHom3VaultInterface;

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

  getProfilesBalance: TypedContractMethod<
    [profileId_: BigNumberish],
    [bigint],
    "view"
  >;

  getSpendBalanceOfProfile: TypedContractMethod<
    [profileId: BigNumberish],
    [bigint],
    "view"
  >;

  removeSpend: TypedContractMethod<
    [profileId_: BigNumberish],
    [void],
    "nonpayable"
  >;

  removeSpender: TypedContractMethod<
    [profileId_: BigNumberish],
    [void],
    "nonpayable"
  >;

  setSpend: TypedContractMethod<
    [profileId_: BigNumberish, amount_: BigNumberish],
    [void],
    "nonpayable"
  >;

  setSpender: TypedContractMethod<
    [profileId_: BigNumberish, spender_: AddressLike],
    [void],
    "nonpayable"
  >;

  spend: TypedContractMethod<
    [profileId_: BigNumberish, amount_: BigNumberish, calldata_: BytesLike],
    [void],
    "nonpayable"
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
    nameOrSignature: "getProfilesBalance"
  ): TypedContractMethod<[profileId_: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "getSpendBalanceOfProfile"
  ): TypedContractMethod<[profileId: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "removeSpend"
  ): TypedContractMethod<[profileId_: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "removeSpender"
  ): TypedContractMethod<[profileId_: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setSpend"
  ): TypedContractMethod<
    [profileId_: BigNumberish, amount_: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setSpender"
  ): TypedContractMethod<
    [profileId_: BigNumberish, spender_: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "spend"
  ): TypedContractMethod<
    [profileId_: BigNumberish, amount_: BigNumberish, calldata_: BytesLike],
    [void],
    "nonpayable"
  >;
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
    key: "SetSpendAllowance"
  ): TypedContractEvent<
    SetSpendAllowanceEvent.InputTuple,
    SetSpendAllowanceEvent.OutputTuple,
    SetSpendAllowanceEvent.OutputObject
  >;
  getEvent(
    key: "SetSpender"
  ): TypedContractEvent<
    SetSpenderEvent.InputTuple,
    SetSpenderEvent.OutputTuple,
    SetSpenderEvent.OutputObject
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

    "SetSpendAllowance(uint256,uint256)": TypedContractEvent<
      SetSpendAllowanceEvent.InputTuple,
      SetSpendAllowanceEvent.OutputTuple,
      SetSpendAllowanceEvent.OutputObject
    >;
    SetSpendAllowance: TypedContractEvent<
      SetSpendAllowanceEvent.InputTuple,
      SetSpendAllowanceEvent.OutputTuple,
      SetSpendAllowanceEvent.OutputObject
    >;

    "SetSpender(uint256,address)": TypedContractEvent<
      SetSpenderEvent.InputTuple,
      SetSpenderEvent.OutputTuple,
      SetSpenderEvent.OutputObject
    >;
    SetSpender: TypedContractEvent<
      SetSpenderEvent.InputTuple,
      SetSpenderEvent.OutputTuple,
      SetSpenderEvent.OutputObject
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
