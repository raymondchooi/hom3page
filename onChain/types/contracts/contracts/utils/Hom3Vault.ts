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

export declare namespace Client {
  export type EVMTokenAmountStruct = {
    token: AddressLike;
    amount: BigNumberish;
  };

  export type EVMTokenAmountStructOutput = [token: string, amount: bigint] & {
    token: string;
    amount: bigint;
  };

  export type Any2EVMMessageStruct = {
    messageId: BytesLike;
    sourceChainSelector: BigNumberish;
    sender: BytesLike;
    data: BytesLike;
    destTokenAmounts: Client.EVMTokenAmountStruct[];
  };

  export type Any2EVMMessageStructOutput = [
    messageId: string,
    sourceChainSelector: bigint,
    sender: string,
    data: string,
    destTokenAmounts: Client.EVMTokenAmountStructOutput[]
  ] & {
    messageId: string;
    sourceChainSelector: bigint;
    sender: string;
    data: string;
    destTokenAmounts: Client.EVMTokenAmountStructOutput[];
  };
}

export interface Hom3VaultInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "HOM3_PROFILE"
      | "LINK_TOKEN"
      | "PAYMENT_TOKEN"
      | "ccipReceive"
      | "depositFunds"
      | "getProfilesBalance"
      | "getRouter"
      | "getSpendBalanceOfProfile"
      | "isActive"
      | "owner"
      | "removeSpend"
      | "removeSpender"
      | "renounceOwnership"
      | "setActiveState"
      | "setSpend"
      | "setSpender"
      | "spend"
      | "supportsInterface"
      | "transferOwnership"
      | "withdrawAllToDev"
      | "withdrawFunds"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "ContractActiveStateChange"
      | "DepositedFunds"
      | "OwnershipTransferred"
      | "SetSpendAllowance"
      | "SetSpender"
      | "WithdrewFunds"
      | "WithdrewFundsRequested"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "HOM3_PROFILE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "LINK_TOKEN",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "PAYMENT_TOKEN",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ccipReceive",
    values: [Client.Any2EVMMessageStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "depositFunds",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getProfilesBalance",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "getRouter", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getSpendBalanceOfProfile",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "isActive", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "removeSpend",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "removeSpender",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setActiveState",
    values: [boolean]
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
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawAllToDev",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawFunds",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "HOM3_PROFILE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "LINK_TOKEN", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "PAYMENT_TOKEN",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ccipReceive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositFunds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getProfilesBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getRouter", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getSpendBalanceOfProfile",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isActive", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeSpend",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeSpender",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setActiveState",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setSpend", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setSpender", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "spend", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawAllToDev",
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

export interface Hom3Vault extends BaseContract {
  connect(runner?: ContractRunner | null): Hom3Vault;
  waitForDeployment(): Promise<this>;

  interface: Hom3VaultInterface;

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

  HOM3_PROFILE: TypedContractMethod<[], [string], "view">;

  LINK_TOKEN: TypedContractMethod<[], [string], "view">;

  PAYMENT_TOKEN: TypedContractMethod<[], [string], "view">;

  ccipReceive: TypedContractMethod<
    [message: Client.Any2EVMMessageStruct],
    [void],
    "nonpayable"
  >;

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

  getRouter: TypedContractMethod<[], [string], "view">;

  getSpendBalanceOfProfile: TypedContractMethod<
    [profileId_: BigNumberish],
    [bigint],
    "view"
  >;

  isActive: TypedContractMethod<[], [boolean], "view">;

  owner: TypedContractMethod<[], [string], "view">;

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

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  setActiveState: TypedContractMethod<
    [newState_: boolean],
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

  supportsInterface: TypedContractMethod<
    [interfaceId: BytesLike],
    [boolean],
    "view"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  withdrawAllToDev: TypedContractMethod<[], [void], "nonpayable">;

  withdrawFunds: TypedContractMethod<
    [profileId_: BigNumberish, amount_: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "HOM3_PROFILE"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "LINK_TOKEN"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "PAYMENT_TOKEN"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "ccipReceive"
  ): TypedContractMethod<
    [message: Client.Any2EVMMessageStruct],
    [void],
    "nonpayable"
  >;
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
    nameOrSignature: "getRouter"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getSpendBalanceOfProfile"
  ): TypedContractMethod<[profileId_: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "isActive"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "removeSpend"
  ): TypedContractMethod<[profileId_: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "removeSpender"
  ): TypedContractMethod<[profileId_: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setActiveState"
  ): TypedContractMethod<[newState_: boolean], [void], "nonpayable">;
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
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdrawAllToDev"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdrawFunds"
  ): TypedContractMethod<
    [profileId_: BigNumberish, amount_: BigNumberish],
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
    key: "DepositedFunds"
  ): TypedContractEvent<
    DepositedFundsEvent.InputTuple,
    DepositedFundsEvent.OutputTuple,
    DepositedFundsEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
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
