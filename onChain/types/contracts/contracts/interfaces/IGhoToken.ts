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

export declare namespace IGhoToken {
  export type FacilitatorStruct = {
    bucketCapacity: BigNumberish;
    bucketLevel: BigNumberish;
    label: string;
  };

  export type FacilitatorStructOutput = [
    bucketCapacity: bigint,
    bucketLevel: bigint,
    label: string
  ] & { bucketCapacity: bigint; bucketLevel: bigint; label: string };
}

export interface IGhoTokenInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "BUCKET_MANAGER_ROLE"
      | "FACILITATOR_MANAGER_ROLE"
      | "addFacilitator"
      | "allowance"
      | "approve"
      | "balanceOf"
      | "burn"
      | "getFacilitator"
      | "getFacilitatorBucket"
      | "getFacilitatorsList"
      | "getRoleAdmin"
      | "grantRole"
      | "hasRole"
      | "mint"
      | "removeFacilitator"
      | "renounceRole"
      | "revokeRole"
      | "setFacilitatorBucketCapacity"
      | "totalSupply"
      | "transfer"
      | "transferFrom"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Approval"
      | "FacilitatorAdded"
      | "FacilitatorBucketCapacityUpdated"
      | "FacilitatorBucketLevelUpdated"
      | "FacilitatorRemoved"
      | "RoleAdminChanged"
      | "RoleGranted"
      | "RoleRevoked"
      | "Transfer"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "BUCKET_MANAGER_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "FACILITATOR_MANAGER_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addFacilitator",
    values: [AddressLike, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "allowance",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "burn", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "getFacilitator",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getFacilitatorBucket",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getFacilitatorsList",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "removeFacilitator",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setFacilitatorBucketCapacity",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "BUCKET_MANAGER_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "FACILITATOR_MANAGER_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addFacilitator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getFacilitator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFacilitatorBucket",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFacilitatorsList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeFacilitator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setFacilitatorBucketCapacity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
}

export namespace ApprovalEvent {
  export type InputTuple = [
    owner: AddressLike,
    spender: AddressLike,
    value: BigNumberish
  ];
  export type OutputTuple = [owner: string, spender: string, value: bigint];
  export interface OutputObject {
    owner: string;
    spender: string;
    value: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace FacilitatorAddedEvent {
  export type InputTuple = [
    facilitatorAddress: AddressLike,
    label: BytesLike,
    bucketCapacity: BigNumberish
  ];
  export type OutputTuple = [
    facilitatorAddress: string,
    label: string,
    bucketCapacity: bigint
  ];
  export interface OutputObject {
    facilitatorAddress: string;
    label: string;
    bucketCapacity: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace FacilitatorBucketCapacityUpdatedEvent {
  export type InputTuple = [
    facilitatorAddress: AddressLike,
    oldCapacity: BigNumberish,
    newCapacity: BigNumberish
  ];
  export type OutputTuple = [
    facilitatorAddress: string,
    oldCapacity: bigint,
    newCapacity: bigint
  ];
  export interface OutputObject {
    facilitatorAddress: string;
    oldCapacity: bigint;
    newCapacity: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace FacilitatorBucketLevelUpdatedEvent {
  export type InputTuple = [
    facilitatorAddress: AddressLike,
    oldLevel: BigNumberish,
    newLevel: BigNumberish
  ];
  export type OutputTuple = [
    facilitatorAddress: string,
    oldLevel: bigint,
    newLevel: bigint
  ];
  export interface OutputObject {
    facilitatorAddress: string;
    oldLevel: bigint;
    newLevel: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace FacilitatorRemovedEvent {
  export type InputTuple = [facilitatorAddress: AddressLike];
  export type OutputTuple = [facilitatorAddress: string];
  export interface OutputObject {
    facilitatorAddress: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleAdminChangedEvent {
  export type InputTuple = [
    role: BytesLike,
    previousAdminRole: BytesLike,
    newAdminRole: BytesLike
  ];
  export type OutputTuple = [
    role: string,
    previousAdminRole: string,
    newAdminRole: string
  ];
  export interface OutputObject {
    role: string;
    previousAdminRole: string;
    newAdminRole: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleGrantedEvent {
  export type InputTuple = [
    role: BytesLike,
    account: AddressLike,
    sender: AddressLike
  ];
  export type OutputTuple = [role: string, account: string, sender: string];
  export interface OutputObject {
    role: string;
    account: string;
    sender: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleRevokedEvent {
  export type InputTuple = [
    role: BytesLike,
    account: AddressLike,
    sender: AddressLike
  ];
  export type OutputTuple = [role: string, account: string, sender: string];
  export interface OutputObject {
    role: string;
    account: string;
    sender: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransferEvent {
  export type InputTuple = [
    from: AddressLike,
    to: AddressLike,
    value: BigNumberish
  ];
  export type OutputTuple = [from: string, to: string, value: bigint];
  export interface OutputObject {
    from: string;
    to: string;
    value: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IGhoToken extends BaseContract {
  connect(runner?: ContractRunner | null): IGhoToken;
  waitForDeployment(): Promise<this>;

  interface: IGhoTokenInterface;

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

  BUCKET_MANAGER_ROLE: TypedContractMethod<[], [string], "view">;

  FACILITATOR_MANAGER_ROLE: TypedContractMethod<[], [string], "view">;

  addFacilitator: TypedContractMethod<
    [
      facilitatorAddress: AddressLike,
      facilitatorLabel: string,
      bucketCapacity: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  allowance: TypedContractMethod<
    [owner: AddressLike, spender: AddressLike],
    [bigint],
    "view"
  >;

  approve: TypedContractMethod<
    [spender: AddressLike, value: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  balanceOf: TypedContractMethod<[account: AddressLike], [bigint], "view">;

  burn: TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;

  getFacilitator: TypedContractMethod<
    [facilitator: AddressLike],
    [IGhoToken.FacilitatorStructOutput],
    "view"
  >;

  getFacilitatorBucket: TypedContractMethod<
    [facilitator: AddressLike],
    [[bigint, bigint]],
    "view"
  >;

  getFacilitatorsList: TypedContractMethod<[], [string[]], "view">;

  getRoleAdmin: TypedContractMethod<[role: BytesLike], [string], "view">;

  grantRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;

  hasRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [boolean],
    "view"
  >;

  mint: TypedContractMethod<
    [account: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  removeFacilitator: TypedContractMethod<
    [facilitatorAddress: AddressLike],
    [void],
    "nonpayable"
  >;

  renounceRole: TypedContractMethod<
    [role: BytesLike, callerConfirmation: AddressLike],
    [void],
    "nonpayable"
  >;

  revokeRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;

  setFacilitatorBucketCapacity: TypedContractMethod<
    [facilitator: AddressLike, newCapacity: BigNumberish],
    [void],
    "nonpayable"
  >;

  totalSupply: TypedContractMethod<[], [bigint], "view">;

  transfer: TypedContractMethod<
    [to: AddressLike, value: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  transferFrom: TypedContractMethod<
    [from: AddressLike, to: AddressLike, value: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "BUCKET_MANAGER_ROLE"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "FACILITATOR_MANAGER_ROLE"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "addFacilitator"
  ): TypedContractMethod<
    [
      facilitatorAddress: AddressLike,
      facilitatorLabel: string,
      bucketCapacity: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "allowance"
  ): TypedContractMethod<
    [owner: AddressLike, spender: AddressLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "approve"
  ): TypedContractMethod<
    [spender: AddressLike, value: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "balanceOf"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "burn"
  ): TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getFacilitator"
  ): TypedContractMethod<
    [facilitator: AddressLike],
    [IGhoToken.FacilitatorStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getFacilitatorBucket"
  ): TypedContractMethod<
    [facilitator: AddressLike],
    [[bigint, bigint]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getFacilitatorsList"
  ): TypedContractMethod<[], [string[]], "view">;
  getFunction(
    nameOrSignature: "getRoleAdmin"
  ): TypedContractMethod<[role: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "grantRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "hasRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "mint"
  ): TypedContractMethod<
    [account: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "removeFacilitator"
  ): TypedContractMethod<
    [facilitatorAddress: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "renounceRole"
  ): TypedContractMethod<
    [role: BytesLike, callerConfirmation: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "revokeRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setFacilitatorBucketCapacity"
  ): TypedContractMethod<
    [facilitator: AddressLike, newCapacity: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "totalSupply"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "transfer"
  ): TypedContractMethod<
    [to: AddressLike, value: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferFrom"
  ): TypedContractMethod<
    [from: AddressLike, to: AddressLike, value: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  getEvent(
    key: "Approval"
  ): TypedContractEvent<
    ApprovalEvent.InputTuple,
    ApprovalEvent.OutputTuple,
    ApprovalEvent.OutputObject
  >;
  getEvent(
    key: "FacilitatorAdded"
  ): TypedContractEvent<
    FacilitatorAddedEvent.InputTuple,
    FacilitatorAddedEvent.OutputTuple,
    FacilitatorAddedEvent.OutputObject
  >;
  getEvent(
    key: "FacilitatorBucketCapacityUpdated"
  ): TypedContractEvent<
    FacilitatorBucketCapacityUpdatedEvent.InputTuple,
    FacilitatorBucketCapacityUpdatedEvent.OutputTuple,
    FacilitatorBucketCapacityUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "FacilitatorBucketLevelUpdated"
  ): TypedContractEvent<
    FacilitatorBucketLevelUpdatedEvent.InputTuple,
    FacilitatorBucketLevelUpdatedEvent.OutputTuple,
    FacilitatorBucketLevelUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "FacilitatorRemoved"
  ): TypedContractEvent<
    FacilitatorRemovedEvent.InputTuple,
    FacilitatorRemovedEvent.OutputTuple,
    FacilitatorRemovedEvent.OutputObject
  >;
  getEvent(
    key: "RoleAdminChanged"
  ): TypedContractEvent<
    RoleAdminChangedEvent.InputTuple,
    RoleAdminChangedEvent.OutputTuple,
    RoleAdminChangedEvent.OutputObject
  >;
  getEvent(
    key: "RoleGranted"
  ): TypedContractEvent<
    RoleGrantedEvent.InputTuple,
    RoleGrantedEvent.OutputTuple,
    RoleGrantedEvent.OutputObject
  >;
  getEvent(
    key: "RoleRevoked"
  ): TypedContractEvent<
    RoleRevokedEvent.InputTuple,
    RoleRevokedEvent.OutputTuple,
    RoleRevokedEvent.OutputObject
  >;
  getEvent(
    key: "Transfer"
  ): TypedContractEvent<
    TransferEvent.InputTuple,
    TransferEvent.OutputTuple,
    TransferEvent.OutputObject
  >;

  filters: {
    "Approval(address,address,uint256)": TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;
    Approval: TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;

    "FacilitatorAdded(address,bytes32,uint256)": TypedContractEvent<
      FacilitatorAddedEvent.InputTuple,
      FacilitatorAddedEvent.OutputTuple,
      FacilitatorAddedEvent.OutputObject
    >;
    FacilitatorAdded: TypedContractEvent<
      FacilitatorAddedEvent.InputTuple,
      FacilitatorAddedEvent.OutputTuple,
      FacilitatorAddedEvent.OutputObject
    >;

    "FacilitatorBucketCapacityUpdated(address,uint256,uint256)": TypedContractEvent<
      FacilitatorBucketCapacityUpdatedEvent.InputTuple,
      FacilitatorBucketCapacityUpdatedEvent.OutputTuple,
      FacilitatorBucketCapacityUpdatedEvent.OutputObject
    >;
    FacilitatorBucketCapacityUpdated: TypedContractEvent<
      FacilitatorBucketCapacityUpdatedEvent.InputTuple,
      FacilitatorBucketCapacityUpdatedEvent.OutputTuple,
      FacilitatorBucketCapacityUpdatedEvent.OutputObject
    >;

    "FacilitatorBucketLevelUpdated(address,uint256,uint256)": TypedContractEvent<
      FacilitatorBucketLevelUpdatedEvent.InputTuple,
      FacilitatorBucketLevelUpdatedEvent.OutputTuple,
      FacilitatorBucketLevelUpdatedEvent.OutputObject
    >;
    FacilitatorBucketLevelUpdated: TypedContractEvent<
      FacilitatorBucketLevelUpdatedEvent.InputTuple,
      FacilitatorBucketLevelUpdatedEvent.OutputTuple,
      FacilitatorBucketLevelUpdatedEvent.OutputObject
    >;

    "FacilitatorRemoved(address)": TypedContractEvent<
      FacilitatorRemovedEvent.InputTuple,
      FacilitatorRemovedEvent.OutputTuple,
      FacilitatorRemovedEvent.OutputObject
    >;
    FacilitatorRemoved: TypedContractEvent<
      FacilitatorRemovedEvent.InputTuple,
      FacilitatorRemovedEvent.OutputTuple,
      FacilitatorRemovedEvent.OutputObject
    >;

    "RoleAdminChanged(bytes32,bytes32,bytes32)": TypedContractEvent<
      RoleAdminChangedEvent.InputTuple,
      RoleAdminChangedEvent.OutputTuple,
      RoleAdminChangedEvent.OutputObject
    >;
    RoleAdminChanged: TypedContractEvent<
      RoleAdminChangedEvent.InputTuple,
      RoleAdminChangedEvent.OutputTuple,
      RoleAdminChangedEvent.OutputObject
    >;

    "RoleGranted(bytes32,address,address)": TypedContractEvent<
      RoleGrantedEvent.InputTuple,
      RoleGrantedEvent.OutputTuple,
      RoleGrantedEvent.OutputObject
    >;
    RoleGranted: TypedContractEvent<
      RoleGrantedEvent.InputTuple,
      RoleGrantedEvent.OutputTuple,
      RoleGrantedEvent.OutputObject
    >;

    "RoleRevoked(bytes32,address,address)": TypedContractEvent<
      RoleRevokedEvent.InputTuple,
      RoleRevokedEvent.OutputTuple,
      RoleRevokedEvent.OutputObject
    >;
    RoleRevoked: TypedContractEvent<
      RoleRevokedEvent.InputTuple,
      RoleRevokedEvent.OutputTuple,
      RoleRevokedEvent.OutputObject
    >;

    "Transfer(address,address,uint256)": TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
    Transfer: TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
  };
}
