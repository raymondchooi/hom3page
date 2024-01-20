import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type ApiError = { 'ZeroAddress' : null } |
  { 'InvalidTokenId' : null } |
  { 'Unauthorized' : null } |
  { 'Other' : null };
export interface LogoResult { 'data' : string, 'logo_type' : string }
export type MintReceipt = { 'Ok' : MintReceiptPart } |
  { 'Err' : ApiError };
export interface MintReceiptPart { 'id' : bigint, 'token_id' : TokenId }
export interface NFTCreationResult { 'id' : string, 'cyclesUsed' : bigint }
export interface NFTData {
  'maxLimit' : number,
  'logo' : LogoResult,
  'name' : string,
  'totalSupply' : bigint,
  'symbol' : string,
}
export type TokenId = bigint;
export interface _SERVICE {
  'createNFT' : ActorMethod<
    [Principal, string, string, number, string, string],
    NFTCreationResult
  >,
  'getNFTData' : ActorMethod<[string], NFTData>,
  'mintNFT' : ActorMethod<[string, Principal], MintReceipt>,
}
