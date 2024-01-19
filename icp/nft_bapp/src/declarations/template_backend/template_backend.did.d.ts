import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'createNFT' : ActorMethod<
    [Principal, string, string, number, string, string],
    string
  >,
}
