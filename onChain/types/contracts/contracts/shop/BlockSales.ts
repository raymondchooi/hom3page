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

export declare namespace IBlockSales {
  export type SaleStruct = {
    tokens_: BigNumberish[][];
    totalItems_: BigNumberish;
    buyer_: AddressLike;
    multiBuy_: boolean;
  };

  export type SaleStructOutput = [
    tokens_: bigint[][],
    totalItems_: bigint,
    buyer_: string,
    multiBuy_: boolean
  ] & {
    tokens_: bigint[][];
    totalItems_: bigint;
    buyer_: string;
    multiBuy_: boolean;
  };
}

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

export interface BlockSalesInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "ETH_CHAIN_SELECTOR"
      | "MATIC_CHAIN_SELECTOR"
      | "NFT"
      | "OP_CHAIN_SELECTOR"
      | "PAYMENT_TOKEN"
      | "PAYMENT_TOKEN_DECIMALS"
      | "SALES_CONTRACT_CHAIN"
      | "buyBlock"
      | "ccipReceive"
      | "getBlockCost"
      | "getChainBlockStore"
      | "getProfileCOntract"
      | "getRouter"
      | "getTotalSold"
      | "isActive"
      | "owner"
      | "renounceOwnership"
      | "setActiveState"
      | "setBlockStore"
      | "setBlockStoreActive"
      | "setProfileAddress"
      | "supportsInterface"
      | "transferOwnership"
      | "withdrawAllToDev"
      | "withdrawBlock"
      | "withdrawFunds"
      | "withdrawLink"
      | "withdrawTokens"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "ContractActiveStateChange"
      | "MessageReceived(bytes32,uint64)"
      | "MessageReceived(bytes32,uint64,address,tuple)"
      | "MessageSent(bytes32,uint64)"
      | "MessageSent(bytes32,uint64,address)"
      | "NewMessageSent"
      | "OwnershipTransferred"
      | "SaleFailed"
      | "SaleMade"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "ETH_CHAIN_SELECTOR",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MATIC_CHAIN_SELECTOR",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "NFT", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "OP_CHAIN_SELECTOR",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "PAYMENT_TOKEN",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "PAYMENT_TOKEN_DECIMALS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SALES_CONTRACT_CHAIN",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "buyBlock",
    values: [BigNumberish[][], boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "ccipReceive",
    values: [Client.Any2EVMMessageStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getBlockCost",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getChainBlockStore",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getProfileCOntract",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getRouter", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getTotalSold",
    values?: undefined
  ): string;
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
    functionFragment: "setBlockStore",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setBlockStoreActive",
    values: [BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setProfileAddress",
    values: [AddressLike]
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
    functionFragment: "withdrawBlock",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawFunds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawLink",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawTokens",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "ETH_CHAIN_SELECTOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MATIC_CHAIN_SELECTOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "NFT", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "OP_CHAIN_SELECTOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "PAYMENT_TOKEN",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "PAYMENT_TOKEN_DECIMALS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SALES_CONTRACT_CHAIN",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "buyBlock", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "ccipReceive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBlockCost",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getChainBlockStore",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getProfileCOntract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getRouter", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTotalSold",
    data: BytesLike
  ): Result;
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
    functionFragment: "setBlockStore",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setBlockStoreActive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setProfileAddress",
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
    functionFragment: "withdrawBlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawFunds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawLink",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawTokens",
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

export namespace MessageReceived_bytes32_uint64_Event {
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

export namespace MessageReceived_bytes32_uint64_address_tuple_Event {
  export type InputTuple = [
    messageId: BytesLike,
    sourceChainSelector: BigNumberish,
    sender: AddressLike,
    payload: IBlockSales.SaleStruct
  ];
  export type OutputTuple = [
    messageId: string,
    sourceChainSelector: bigint,
    sender: string,
    payload: IBlockSales.SaleStructOutput
  ];
  export interface OutputObject {
    messageId: string;
    sourceChainSelector: bigint;
    sender: string;
    payload: IBlockSales.SaleStructOutput;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace MessageSent_bytes32_uint64_Event {
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

export namespace MessageSent_bytes32_uint64_address_Event {
  export type InputTuple = [
    messageId: BytesLike,
    destinationChainSelector: BigNumberish,
    receiver: AddressLike
  ];
  export type OutputTuple = [
    messageId: string,
    destinationChainSelector: bigint,
    receiver: string
  ];
  export interface OutputObject {
    messageId: string;
    destinationChainSelector: bigint;
    receiver: string;
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

export namespace SaleFailedEvent {
  export type InputTuple = [chainId_: BigNumberish, messageId_: BytesLike];
  export type OutputTuple = [chainId_: bigint, messageId_: string];
  export interface OutputObject {
    chainId_: bigint;
    messageId_: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SaleMadeEvent {
  export type InputTuple = [
    buyer_: AddressLike,
    amount_: BigNumberish,
    chainId_: BigNumberish
  ];
  export type OutputTuple = [buyer_: string, amount_: bigint, chainId_: bigint];
  export interface OutputObject {
    buyer_: string;
    amount_: bigint;
    chainId_: bigint;
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

  ETH_CHAIN_SELECTOR: TypedContractMethod<[], [bigint], "view">;

  MATIC_CHAIN_SELECTOR: TypedContractMethod<[], [bigint], "view">;

  NFT: TypedContractMethod<[], [string], "view">;

  OP_CHAIN_SELECTOR: TypedContractMethod<[], [bigint], "view">;

  PAYMENT_TOKEN: TypedContractMethod<[], [string], "view">;

  PAYMENT_TOKEN_DECIMALS: TypedContractMethod<[], [bigint], "view">;

  SALES_CONTRACT_CHAIN: TypedContractMethod<[], [bigint], "view">;

  buyBlock: TypedContractMethod<
    [tokenIds_: BigNumberish[][], multiBuy_: boolean],
    [void],
    "nonpayable"
  >;

  ccipReceive: TypedContractMethod<
    [message: Client.Any2EVMMessageStruct],
    [void],
    "nonpayable"
  >;

  getBlockCost: TypedContractMethod<[], [bigint], "view">;

  getChainBlockStore: TypedContractMethod<
    [chainId_: BigNumberish],
    [string],
    "view"
  >;

  getProfileCOntract: TypedContractMethod<[], [string], "view">;

  getRouter: TypedContractMethod<[], [string], "view">;

  getTotalSold: TypedContractMethod<[], [bigint], "view">;

  isActive: TypedContractMethod<[], [boolean], "view">;

  owner: TypedContractMethod<[], [string], "view">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  setActiveState: TypedContractMethod<
    [newState_: boolean],
    [void],
    "nonpayable"
  >;

  setBlockStore: TypedContractMethod<
    [chainId_: BigNumberish, contractAddress_: AddressLike],
    [void],
    "nonpayable"
  >;

  setBlockStoreActive: TypedContractMethod<
    [chainId_: BigNumberish, flag_: boolean],
    [void],
    "nonpayable"
  >;

  setProfileAddress: TypedContractMethod<
    [newAddress_: AddressLike],
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

  withdrawBlock: TypedContractMethod<
    [tokenId_: BigNumberish],
    [void],
    "nonpayable"
  >;

  withdrawFunds: TypedContractMethod<[], [void], "nonpayable">;

  withdrawLink: TypedContractMethod<[], [void], "nonpayable">;

  withdrawTokens: TypedContractMethod<
    [tokenAddress_: AddressLike],
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
    nameOrSignature: "MATIC_CHAIN_SELECTOR"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "NFT"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "OP_CHAIN_SELECTOR"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "PAYMENT_TOKEN"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "PAYMENT_TOKEN_DECIMALS"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "SALES_CONTRACT_CHAIN"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "buyBlock"
  ): TypedContractMethod<
    [tokenIds_: BigNumberish[][], multiBuy_: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "ccipReceive"
  ): TypedContractMethod<
    [message: Client.Any2EVMMessageStruct],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getBlockCost"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getChainBlockStore"
  ): TypedContractMethod<[chainId_: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "getProfileCOntract"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getRouter"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getTotalSold"
  ): TypedContractMethod<[], [bigint], "view">;
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
    nameOrSignature: "setBlockStore"
  ): TypedContractMethod<
    [chainId_: BigNumberish, contractAddress_: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setBlockStoreActive"
  ): TypedContractMethod<
    [chainId_: BigNumberish, flag_: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setProfileAddress"
  ): TypedContractMethod<[newAddress_: AddressLike], [void], "nonpayable">;
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
    nameOrSignature: "withdrawBlock"
  ): TypedContractMethod<[tokenId_: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdrawFunds"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdrawLink"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdrawTokens"
  ): TypedContractMethod<[tokenAddress_: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "ContractActiveStateChange"
  ): TypedContractEvent<
    ContractActiveStateChangeEvent.InputTuple,
    ContractActiveStateChangeEvent.OutputTuple,
    ContractActiveStateChangeEvent.OutputObject
  >;
  getEvent(
    key: "MessageReceived(bytes32,uint64)"
  ): TypedContractEvent<
    MessageReceived_bytes32_uint64_Event.InputTuple,
    MessageReceived_bytes32_uint64_Event.OutputTuple,
    MessageReceived_bytes32_uint64_Event.OutputObject
  >;
  getEvent(
    key: "MessageReceived(bytes32,uint64,address,tuple)"
  ): TypedContractEvent<
    MessageReceived_bytes32_uint64_address_tuple_Event.InputTuple,
    MessageReceived_bytes32_uint64_address_tuple_Event.OutputTuple,
    MessageReceived_bytes32_uint64_address_tuple_Event.OutputObject
  >;
  getEvent(
    key: "MessageSent(bytes32,uint64)"
  ): TypedContractEvent<
    MessageSent_bytes32_uint64_Event.InputTuple,
    MessageSent_bytes32_uint64_Event.OutputTuple,
    MessageSent_bytes32_uint64_Event.OutputObject
  >;
  getEvent(
    key: "MessageSent(bytes32,uint64,address)"
  ): TypedContractEvent<
    MessageSent_bytes32_uint64_address_Event.InputTuple,
    MessageSent_bytes32_uint64_address_Event.OutputTuple,
    MessageSent_bytes32_uint64_address_Event.OutputObject
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
    key: "SaleFailed"
  ): TypedContractEvent<
    SaleFailedEvent.InputTuple,
    SaleFailedEvent.OutputTuple,
    SaleFailedEvent.OutputObject
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

    "MessageReceived(bytes32,uint64)": TypedContractEvent<
      MessageReceived_bytes32_uint64_Event.InputTuple,
      MessageReceived_bytes32_uint64_Event.OutputTuple,
      MessageReceived_bytes32_uint64_Event.OutputObject
    >;
    "MessageReceived(bytes32,uint64,address,tuple)": TypedContractEvent<
      MessageReceived_bytes32_uint64_address_tuple_Event.InputTuple,
      MessageReceived_bytes32_uint64_address_tuple_Event.OutputTuple,
      MessageReceived_bytes32_uint64_address_tuple_Event.OutputObject
    >;
    "MessageSent(bytes32,uint64)": TypedContractEvent<
      MessageSent_bytes32_uint64_Event.InputTuple,
      MessageSent_bytes32_uint64_Event.OutputTuple,
      MessageSent_bytes32_uint64_Event.OutputObject
    >;
    "MessageSent(bytes32,uint64,address)": TypedContractEvent<
      MessageSent_bytes32_uint64_address_Event.InputTuple,
      MessageSent_bytes32_uint64_address_Event.OutputTuple,
      MessageSent_bytes32_uint64_address_Event.OutputObject
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

    "SaleFailed(uint64,bytes32)": TypedContractEvent<
      SaleFailedEvent.InputTuple,
      SaleFailedEvent.OutputTuple,
      SaleFailedEvent.OutputObject
    >;
    SaleFailed: TypedContractEvent<
      SaleFailedEvent.InputTuple,
      SaleFailedEvent.OutputTuple,
      SaleFailedEvent.OutputObject
    >;

    "SaleMade(address,uint256,uint64)": TypedContractEvent<
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
