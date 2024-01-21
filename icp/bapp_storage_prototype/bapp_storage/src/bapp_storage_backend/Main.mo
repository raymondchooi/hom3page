import Trie "mo:base/Trie";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import NFT "./NFT";
import Types "Types";
import Cycles "mo:base/ExperimentalCycles";

actor {

  stable var nftBlockStore : Trie.Trie<Principal, NFT.Dip721NFT> = Trie.empty();

  public func getNFTCollection(principal : Principal) : async Principal {

    let idKey = getIDKey(principal);
    let nftCollectionForPrincipal = Trie.find(nftBlockStore, idKey, Principal.equal);
    switch (nftCollectionForPrincipal) {
      case (null) {
        let logo : Types.LogoResult = { logo_type = ""; data = "" };
        let nft : Types.Dip721NonFungibleToken = {
          logo = logo;
          name = debug_show (principal);
          symbol = debug_show (principal);
          maxLimit = 100;
        };
        Cycles.add(200_000_000_000);
        let nftCollection = await NFT.Dip721NFT(principal, nft);
        let cyclesAccepted = await nftCollection.wallet_receive();

        nftBlockStore := Trie.put(nftBlockStore, idKey, Principal.equal, nftCollection).0;
        return Principal.fromActor(nftCollection);

      };
      case (?nftCollection) {
        return Principal.fromActor(nftCollection);

      };
    };
  };

  func getIDKey(nftID : Principal) : Trie.Key<Principal> {
    { key = nftID; hash = Principal.hash(nftID) };
  };

};
