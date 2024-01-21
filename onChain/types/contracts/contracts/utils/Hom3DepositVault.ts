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

export declare namespace IVaultData {
  export type UpdateMessageStruct = {
    profileId_: BigNumberish;
    owner_: AddressLike;
    balance_: BigNumberish;
  };

  export type UpdateMessageStructOutput = [
    profileId_: bigint,
    owner_: string,
    balance_: bigint
  ] & { profileId_: bigint; owner_: string; balance_: bigint };

  export type MessageStruct = {
    action_: BigNumberish;
    errors_: BigNumberish;
    message_: string;
    update_: IVaultData.UpdateMessageStruct;
    returnMessageId_: BytesLike;
    value_: BigNumberish;
  };

  export type MessageStructOutput = [
    action_: bigint,
    errors_: bigint,
    message_: string,
    update_: IVaultData.UpdateMessageStructOutput,
    returnMessageId_: string,
    value_: bigint
  ] & {
    action_: bigint;
    errors_: bigint;
    message_: string;
    update_: IVaultData.UpdateMessageStructOutput;
    returnMessageId_: string;
    value_: bigint;
  };

  export type PastMessageStruct = {
    message_: IVaultData.MessageStruct;
    fullFilled_: boolean;
  };

  export type PastMessageStructOutput = [
    message_: IVaultData.MessageStructOutput,
    fullFilled_: boolean
  ] & { message_: IVaultData.MessageStructOutput; fullFilled_: boolean };
}

export interface Hom3DepositVaultInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "ETH_CHAIN_SELECTOR"
      | "MASTER_CHAIN"
      | "MATIC_CHAIN_SELECTOR"
      | "OP_CHAIN_SELECTOR"
      | "PAYMENT_TOKEN"
      | "SALES_CONTRACT_CHAIN"
      | "ccipReceive"
      | "depositFunds"
      | "getMessage"
      | "getProfileDeposits"
      | "getProfilesEscrowedBalance"
      | "getRouter"
      | "isActive"
      | "owner"
      | "renounceOwnership"
      | "setActiveState"
      | "setAllowedChainId"
      | "setAllowedVaultAddress"
      | "supportsInterface"
      | "transferOwnership"
      | "withdrawAllToDev"
      | "withdrawFunds"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "ContractActiveStateChange"
      | "DepositedFunds"
      | "DepositedFundsRequested"
      | "EscrowBalanceToLow"
      | "MessageReceived"
      | "MessageSent"
      | "NewMessageSent"
      | "OwnershipTransferred"
      | "ProfileOwnershipTransferred"
      | "WithdrewFunds"
      | "WithdrewFundsRequested"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "ETH_CHAIN_SELECTOR",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MASTER_CHAIN",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MATIC_CHAIN_SELECTOR",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "OP_CHAIN_SELECTOR",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "PAYMENT_TOKEN",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SALES_CONTRACT_CHAIN",
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
    functionFragment: "getMessage",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getProfileDeposits",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getProfilesEscrowedBalance",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "getRouter", values?: undefined): string;
  encodeFunctionData(functionFragment: "isActive", values?: undefined): string;
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
    functionFragment: "setAllowedChainId",
    values: [BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setAllowedVaultAddress",
    values: [BigNumberish, AddressLike]
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
    functionFragment: "ETH_CHAIN_SELECTOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MASTER_CHAIN",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MATIC_CHAIN_SELECTOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "OP_CHAIN_SELECTOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "PAYMENT_TOKEN",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SALES_CONTRACT_CHAIN",
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
  decodeFunctionResult(functionFragment: "getMessage", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getProfileDeposits",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getProfilesEscrowedBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getRouter", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isActive", data: BytesLike): Result;
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
    functionFragment: "setAllowedChainId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAllowedVaultAddress",
    data: BytesLike
  ): Result;
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

export namespace MessageReceivedEvent {
  export type InputTuple = [
    messageId_: BytesLike,
    sourceChainId_: BigNumberish
  ];
  export type OutputTuple = [messageId_: string, sourceChainId_: bigint];
  export interface OutputObject {
    messageId_: string;
    sourceChainId_: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace MessageSentEvent {
  export type InputTuple = [
    messageId_: BytesLike,
    destinationChain_: BigNumberish
  ];
  export type OutputTuple = [messageId_: string, destinationChain_: bigint];
  export interface OutputObject {
    messageId_: string;
    destinationChain_: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace NewMessageSentEvent {
  export type InputTuple = [recipient_: AddressLike, messageId_: BytesLike];
  export type OutputTuple = [recipient_: string, messageId_: string];
  export interface OutputObject {
    recipient_: string;
    messageId_: string;
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

export interface Hom3DepositVault extends BaseContract {
  connect(runner?: ContractRunner | null): Hom3DepositVault;
  waitForDeployment(): Promise<this>;

  interface: Hom3DepositVaultInterface;

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

  ETH_CHAIN_SELECTOR: TypedContractMethod<[], [bigint], "view">;

  MASTER_CHAIN: TypedContractMethod<[], [bigint], "view">;

  MATIC_CHAIN_SELECTOR: TypedContractMethod<[], [bigint], "view">;

  OP_CHAIN_SELECTOR: TypedContractMethod<[], [bigint], "view">;

  PAYMENT_TOKEN: TypedContractMethod<[], [string], "view">;

  SALES_CONTRACT_CHAIN: TypedContractMethod<[], [bigint], "view">;

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

  getMessage: TypedContractMethod<
    [messageId_: BytesLike],
    [IVaultData.PastMessageStructOutput],
    "view"
  >;

  getProfileDeposits: TypedContractMethod<
    [profileId_: BigNumberish],
    [bigint],
    "view"
  >;

  getProfilesEscrowedBalance: TypedContractMethod<
    [profileId_: BigNumberish],
    [bigint],
    "view"
  >;

  getRouter: TypedContractMethod<[], [string], "view">;

  isActive: TypedContractMethod<[], [boolean], "view">;

  owner: TypedContractMethod<[], [string], "view">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  setActiveState: TypedContractMethod<
    [newState_: boolean],
    [void],
    "nonpayable"
  >;

  setAllowedChainId: TypedContractMethod<
    [chainId_: BigNumberish, flag_: boolean],
    [void],
    "nonpayable"
  >;

  setAllowedVaultAddress: TypedContractMethod<
    [chainId_: BigNumberish, contractAddress_: AddressLike],
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
    nameOrSignature: "ETH_CHAIN_SELECTOR"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "MASTER_CHAIN"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "MATIC_CHAIN_SELECTOR"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "OP_CHAIN_SELECTOR"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "PAYMENT_TOKEN"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "SALES_CONTRACT_CHAIN"
  ): TypedContractMethod<[], [bigint], "view">;
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
    nameOrSignature: "getMessage"
  ): TypedContractMethod<
    [messageId_: BytesLike],
    [IVaultData.PastMessageStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getProfileDeposits"
  ): TypedContractMethod<[profileId_: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "getProfilesEscrowedBalance"
  ): TypedContractMethod<[profileId_: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "getRouter"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "isActive"
  ): TypedContractMethod<[], [boolean], "view">;
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
    nameOrSignature: "setAllowedChainId"
  ): TypedContractMethod<
    [chainId_: BigNumberish, flag_: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setAllowedVaultAddress"
  ): TypedContractMethod<
    [chainId_: BigNumberish, contractAddress_: AddressLike],
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
    key: "MessageReceived"
  ): TypedContractEvent<
    MessageReceivedEvent.InputTuple,
    MessageReceivedEvent.OutputTuple,
    MessageReceivedEvent.OutputObject
  >;
  getEvent(
    key: "MessageSent"
  ): TypedContractEvent<
    MessageSentEvent.InputTuple,
    MessageSentEvent.OutputTuple,
    MessageSentEvent.OutputObject
  >;
  getEvent(
    key: "NewMessageSent"
  ): TypedContractEvent<
    NewMessageSentEvent.InputTuple,
    NewMessageSentEvent.OutputTuple,
    NewMessageSentEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
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

    "MessageReceived(bytes32,uint64)": TypedContractEvent<
      MessageReceivedEvent.InputTuple,
      MessageReceivedEvent.OutputTuple,
      MessageReceivedEvent.OutputObject
    >;
    MessageReceived: TypedContractEvent<
      MessageReceivedEvent.InputTuple,
      MessageReceivedEvent.OutputTuple,
      MessageReceivedEvent.OutputObject
    >;

    "MessageSent(bytes32,uint64)": TypedContractEvent<
      MessageSentEvent.InputTuple,
      MessageSentEvent.OutputTuple,
      MessageSentEvent.OutputObject
    >;
    MessageSent: TypedContractEvent<
      MessageSentEvent.InputTuple,
      MessageSentEvent.OutputTuple,
      MessageSentEvent.OutputObject
    >;

    "NewMessageSent(address,bytes32)": TypedContractEvent<
      NewMessageSentEvent.InputTuple,
      NewMessageSentEvent.OutputTuple,
      NewMessageSentEvent.OutputObject
    >;
    NewMessageSent: TypedContractEvent<
      NewMessageSentEvent.InputTuple,
      NewMessageSentEvent.OutputTuple,
      NewMessageSentEvent.OutputObject
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
