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

export declare namespace IBlockStore {
  export type SaleRecipeStruct = {
    salesMessageId_: BytesLike;
    failed_: boolean;
  };

  export type SaleRecipeStructOutput = [
    salesMessageId_: string,
    failed_: boolean
  ] & { salesMessageId_: string; failed_: boolean };

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

  export type SaleStoreStruct = {
    saleData_: IBlockStore.SaleStruct;
    messageId_: BytesLike;
    saleComplete_: boolean;
    saleFailed_: boolean;
  };

  export type SaleStoreStructOutput = [
    saleData_: IBlockStore.SaleStructOutput,
    messageId_: string,
    saleComplete_: boolean,
    saleFailed_: boolean
  ] & {
    saleData_: IBlockStore.SaleStructOutput;
    messageId_: string;
    saleComplete_: boolean;
    saleFailed_: boolean;
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

export interface BlockStoreInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "ETH_CHAIN_SELECTOR"
      | "MATIC_CHAIN_SELECTOR"
      | "OP_CHAIN_SELECTOR"
      | "PAYMENT_TOKEN"
      | "SALES_CONTRACT_CHAIN"
      | "buyBatchBlock"
      | "buyBlock"
      | "ccipReceive"
      | "getBlockCost"
      | "getRouter"
      | "getSaleStatus"
      | "getSalesContractAddress"
      | "getTotalSold"
      | "isActive"
      | "owner"
      | "renounceOwnership"
      | "setActiveState"
      | "setBlockStore"
      | "setBlockStoreActive"
      | "setSalesContract"
      | "supportsInterface"
      | "transferOwnership"
      | "withdrawAllToDev"
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
      | "MessageSent(bytes32,uint64,address,tuple,address,uint256)"
      | "OwnershipTransferred"
      | "SaleFailed"
      | "SaleMade"
      | "SaleSubmitted"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "ETH_CHAIN_SELECTOR",
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
    functionFragment: "buyBatchBlock",
    values: [BigNumberish[][]]
  ): string;
  encodeFunctionData(
    functionFragment: "buyBlock",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "ccipReceive",
    values: [Client.Any2EVMMessageStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getBlockCost",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getRouter", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getSaleStatus",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getSalesContractAddress",
    values?: undefined
  ): string;
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
    functionFragment: "setSalesContract",
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
    functionFragment: "buyBatchBlock",
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
  decodeFunctionResult(functionFragment: "getRouter", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getSaleStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSalesContractAddress",
    data: BytesLike
  ): Result;
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
    functionFragment: "setSalesContract",
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
    payload: IBlockStore.SaleRecipeStruct
  ];
  export type OutputTuple = [
    messageId: string,
    sourceChainSelector: bigint,
    sender: string,
    payload: IBlockStore.SaleRecipeStructOutput
  ];
  export interface OutputObject {
    messageId: string;
    sourceChainSelector: bigint;
    sender: string;
    payload: IBlockStore.SaleRecipeStructOutput;
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

export namespace MessageSent_bytes32_uint64_address_tuple_address_uint256_Event {
  export type InputTuple = [
    messageId: BytesLike,
    destinationChainSelector: BigNumberish,
    receiver: AddressLike,
    payload: IBlockStore.SaleStruct,
    feeToken: AddressLike,
    fees: BigNumberish
  ];
  export type OutputTuple = [
    messageId: string,
    destinationChainSelector: bigint,
    receiver: string,
    payload: IBlockStore.SaleStructOutput,
    feeToken: string,
    fees: bigint
  ];
  export interface OutputObject {
    messageId: string;
    destinationChainSelector: bigint;
    receiver: string;
    payload: IBlockStore.SaleStructOutput;
    feeToken: string;
    fees: bigint;
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
  export type InputTuple = [
    buyer_: AddressLike,
    chainId_: BigNumberish,
    messageId_: BytesLike
  ];
  export type OutputTuple = [
    buyer_: string,
    chainId_: bigint,
    messageId_: string
  ];
  export interface OutputObject {
    buyer_: string;
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

export namespace SaleSubmittedEvent {
  export type InputTuple = [messageId_: BytesLike, buyer_: AddressLike];
  export type OutputTuple = [messageId_: string, buyer_: string];
  export interface OutputObject {
    messageId_: string;
    buyer_: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface BlockStore extends BaseContract {
  connect(runner?: ContractRunner | null): BlockStore;
  waitForDeployment(): Promise<this>;

  interface: BlockStoreInterface;

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

  OP_CHAIN_SELECTOR: TypedContractMethod<[], [bigint], "view">;

  PAYMENT_TOKEN: TypedContractMethod<[], [string], "view">;

  SALES_CONTRACT_CHAIN: TypedContractMethod<[], [bigint], "view">;

  buyBatchBlock: TypedContractMethod<
    [tokenIds_: BigNumberish[][]],
    [void],
    "nonpayable"
  >;

  buyBlock: TypedContractMethod<[tokenId_: BigNumberish], [void], "nonpayable">;

  ccipReceive: TypedContractMethod<
    [message: Client.Any2EVMMessageStruct],
    [void],
    "nonpayable"
  >;

  getBlockCost: TypedContractMethod<[], [bigint], "view">;

  getRouter: TypedContractMethod<[], [string], "view">;

  getSaleStatus: TypedContractMethod<
    [saleId_: BytesLike],
    [IBlockStore.SaleStoreStructOutput],
    "view"
  >;

  getSalesContractAddress: TypedContractMethod<[], [string], "view">;

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

  setSalesContract: TypedContractMethod<
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
    nameOrSignature: "OP_CHAIN_SELECTOR"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "PAYMENT_TOKEN"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "SALES_CONTRACT_CHAIN"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "buyBatchBlock"
  ): TypedContractMethod<[tokenIds_: BigNumberish[][]], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "buyBlock"
  ): TypedContractMethod<[tokenId_: BigNumberish], [void], "nonpayable">;
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
    nameOrSignature: "getRouter"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getSaleStatus"
  ): TypedContractMethod<
    [saleId_: BytesLike],
    [IBlockStore.SaleStoreStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getSalesContractAddress"
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
    nameOrSignature: "setSalesContract"
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
    key: "MessageSent(bytes32,uint64,address,tuple,address,uint256)"
  ): TypedContractEvent<
    MessageSent_bytes32_uint64_address_tuple_address_uint256_Event.InputTuple,
    MessageSent_bytes32_uint64_address_tuple_address_uint256_Event.OutputTuple,
    MessageSent_bytes32_uint64_address_tuple_address_uint256_Event.OutputObject
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
  getEvent(
    key: "SaleSubmitted"
  ): TypedContractEvent<
    SaleSubmittedEvent.InputTuple,
    SaleSubmittedEvent.OutputTuple,
    SaleSubmittedEvent.OutputObject
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
    "MessageSent(bytes32,uint64,address,tuple,address,uint256)": TypedContractEvent<
      MessageSent_bytes32_uint64_address_tuple_address_uint256_Event.InputTuple,
      MessageSent_bytes32_uint64_address_tuple_address_uint256_Event.OutputTuple,
      MessageSent_bytes32_uint64_address_tuple_address_uint256_Event.OutputObject
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

    "SaleFailed(address,uint64,bytes32)": TypedContractEvent<
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

    "SaleSubmitted(bytes32,address)": TypedContractEvent<
      SaleSubmittedEvent.InputTuple,
      SaleSubmittedEvent.OutputTuple,
      SaleSubmittedEvent.OutputObject
    >;
    SaleSubmitted: TypedContractEvent<
      SaleSubmittedEvent.InputTuple,
      SaleSubmittedEvent.OutputTuple,
      SaleSubmittedEvent.OutputObject
    >;
  };
}
