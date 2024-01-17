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

  export type SaleRecipeStruct = {
    salesMessageId_: BytesLike;
    success: boolean;
  };

  export type SaleRecipeStructOutput = [
    salesMessageId_: string,
    success: boolean
  ] & { salesMessageId_: string; success: boolean };
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
      | "NFT"
      | "PAYMENT_TOKEN"
      | "buyBatchBlock"
      | "buyBlock"
      | "ccipReceive"
      | "getBlockCost"
      | "getChainBlockStore"
      | "getRouter"
      | "getTotalSold"
      | "isActive"
      | "owner"
      | "renounceOwnership"
      | "setActiveState"
      | "setBlockStore"
      | "setBlockStoreActive"
      | "supportsInterface"
      | "transferOwnership"
      | "withdrawBlock"
      | "withdrawFunds"
      | "withdrawTokens"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "ContractActiveStateChange"
      | "MessageReceived"
      | "MessageSent"
      | "OwnershipTransferred"
      | "SaleMade"
  ): EventFragment;

  encodeFunctionData(functionFragment: "NFT", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "PAYMENT_TOKEN",
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
  encodeFunctionData(
    functionFragment: "getChainBlockStore",
    values: [BigNumberish]
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
    functionFragment: "supportsInterface",
    values: [BytesLike]
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
  encodeFunctionData(
    functionFragment: "withdrawTokens",
    values: [AddressLike, AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "NFT", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "PAYMENT_TOKEN",
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
  decodeFunctionResult(
    functionFragment: "getChainBlockStore",
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
    functionFragment: "supportsInterface",
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

export namespace MessageReceivedEvent {
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

export namespace MessageSentEvent {
  export type InputTuple = [
    messageId: BytesLike,
    destinationChainSelector: BigNumberish,
    receiver: AddressLike,
    payload: IBlockSales.SaleRecipeStruct,
    feeToken: AddressLike,
    fees: BigNumberish
  ];
  export type OutputTuple = [
    messageId: string,
    destinationChainSelector: bigint,
    receiver: string,
    payload: IBlockSales.SaleRecipeStructOutput,
    feeToken: string,
    fees: bigint
  ];
  export interface OutputObject {
    messageId: string;
    destinationChainSelector: bigint;
    receiver: string;
    payload: IBlockSales.SaleRecipeStructOutput;
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

  NFT: TypedContractMethod<[], [string], "view">;

  PAYMENT_TOKEN: TypedContractMethod<[], [string], "view">;

  buyBatchBlock: TypedContractMethod<
    [tokenIds_: BigNumberish[][]],
    [void],
    "nonpayable"
  >;

  buyBlock: TypedContractMethod<[tokenId: BigNumberish], [void], "nonpayable">;

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

  withdrawBlock: TypedContractMethod<
    [withdrawAddress_: AddressLike, tokenId_: BigNumberish],
    [void],
    "nonpayable"
  >;

  withdrawFunds: TypedContractMethod<
    [withdrawAddress_: AddressLike],
    [void],
    "payable"
  >;

  withdrawTokens: TypedContractMethod<
    [withdrawAddress_: AddressLike, tokenAddress_: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "NFT"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "PAYMENT_TOKEN"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "buyBatchBlock"
  ): TypedContractMethod<[tokenIds_: BigNumberish[][]], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "buyBlock"
  ): TypedContractMethod<[tokenId: BigNumberish], [void], "nonpayable">;
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
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
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
  ): TypedContractMethod<[withdrawAddress_: AddressLike], [void], "payable">;
  getFunction(
    nameOrSignature: "withdrawTokens"
  ): TypedContractMethod<
    [withdrawAddress_: AddressLike, tokenAddress_: AddressLike],
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

    "MessageReceived(bytes32,uint64,address,tuple)": TypedContractEvent<
      MessageReceivedEvent.InputTuple,
      MessageReceivedEvent.OutputTuple,
      MessageReceivedEvent.OutputObject
    >;
    MessageReceived: TypedContractEvent<
      MessageReceivedEvent.InputTuple,
      MessageReceivedEvent.OutputTuple,
      MessageReceivedEvent.OutputObject
    >;

    "MessageSent(bytes32,uint64,address,tuple,address,uint256)": TypedContractEvent<
      MessageSentEvent.InputTuple,
      MessageSentEvent.OutputTuple,
      MessageSentEvent.OutputObject
    >;
    MessageSent: TypedContractEvent<
      MessageSentEvent.InputTuple,
      MessageSentEvent.OutputTuple,
      MessageSentEvent.OutputObject
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
