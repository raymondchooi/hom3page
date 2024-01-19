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

export interface IBlockStoreInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "buyBlock"
      | "getSaleStatus"
      | "withdrawFunds"
      | "withdrawTokens"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "MessageReceived"
      | "MessageSent"
      | "SaleFailed"
      | "SaleMade"
      | "SaleSubmitted"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "buyBlock",
    values: [BigNumberish[][], boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "getSaleStatus",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawFunds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawTokens",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "buyBlock", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getSaleStatus",
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

export namespace MessageReceivedEvent {
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

export namespace MessageSentEvent {
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

export interface IBlockStore extends BaseContract {
  connect(runner?: ContractRunner | null): IBlockStore;
  waitForDeployment(): Promise<this>;

  interface: IBlockStoreInterface;

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

  buyBlock: TypedContractMethod<
    [tokenId_: BigNumberish[][], multiBuy_: boolean],
    [void],
    "nonpayable"
  >;

  getSaleStatus: TypedContractMethod<
    [saleId_: BytesLike],
    [IBlockStore.SaleStoreStructOutput],
    "nonpayable"
  >;

  withdrawFunds: TypedContractMethod<[], [void], "nonpayable">;

  withdrawTokens: TypedContractMethod<
    [tokenAddress_: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "buyBlock"
  ): TypedContractMethod<
    [tokenId_: BigNumberish[][], multiBuy_: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getSaleStatus"
  ): TypedContractMethod<
    [saleId_: BytesLike],
    [IBlockStore.SaleStoreStructOutput],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "withdrawFunds"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdrawTokens"
  ): TypedContractMethod<[tokenAddress_: AddressLike], [void], "nonpayable">;

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
