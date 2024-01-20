import Debug "mo:base/Debug";
import NFT "./NFT";
import Nat16 "mo:base/Nat16";
import Trie "mo:base/Trie";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Types "./Types";
import Random "mo:base/Random";
import Error "mo:base/Error";
import Int "mo:base/Int";
import Cycles "mo:base/ExperimentalCycles";

actor {

  stable var nftStore : Trie.Trie<Text, NFT.Dip721NFT> = Trie.empty();

  public shared (message) func whoami() : async Principal {
    return message.caller
  };

  public func createNFT(principal : Principal, name : Text, symbol : Text, maxLimit : Nat16, imageType : Text, image : Text) : async Types.NFTCreationResult {
    let logo : Types.LogoResult = { logo_type = imageType; data = image };
    let nft : Types.Dip721NonFungibleToken = {
      logo = logo;
      name = name;
      symbol = symbol;
      maxLimit = maxLimit
    };
    let currentPrincipal = await whoami();
    Cycles.add(200_000_000_000);
    let nftContainer = await NFT.Dip721NFT(currentPrincipal, nft);

    //TODO: add principal to the list of custodians and manage the security concerns

    let cyclesAccepted = await nftContainer.wallet_receive();
    let optionalNftID = await getRandom();
    switch (optionalNftID) {
      case (null) { throw Error.reject("ID generation was unsuccessful") };
      case (?nat) {
        let nftID : Text = Int.toText(nat);
        let idKey : Trie.Key<Text> = getIDKey(nftID);
        nftStore := Trie.put(nftStore, idKey, Text.equal, nftContainer).0;
        return { id = nftID; cyclesUsed = cyclesAccepted.accepted }
      }
    };

    // let output = "NFT: " # name # "\nprincipal: " # debug_show (principal) # "\nsymbol: " # symbol # "\nmaxLimit: " # debug_show (maxLimit) # "\nimageType:" # debug_show(imageType) # "\nimage: " # image;
    // Debug.print(output);

  };

  func getRandom() : async ?Nat {
    let random = Random.Finite(await Random.blob());
    random.range(32)
  };

  func getIDKey(nftID : Text) : Trie.Key<Text> {
    { key = nftID; hash = Text.hash(nftID) }
  };

  public func getNFTData(nftID : Text) : async Types.NFTData {
    let idKey : Trie.Key<Text> = getIDKey(nftID);
    let optionalNftContainer : ?NFT.Dip721NFT = Trie.find<Text, NFT.Dip721NFT>(nftStore, idKey, Text.equal);
    switch (optionalNftContainer) {
      case (null) { throw Error.reject("No NFT with given ID") };
      case (?nftContainer) {
        let name = await nftContainer.nameDip721();
        let symbol = await nftContainer.symbolDip721();
        let logo = await nftContainer.logoDip721();
        let totalSupply = await nftContainer.totalSupplyDip721();
        let maxLimit = await nftContainer.getMaxLimitDip721();
        return {
          name = name;
          symbol = symbol;
          logo = logo;
          totalSupply = totalSupply;
          maxLimit = maxLimit
        }
      }
    }
  };

  public func mintNFT(nftID : Text, to : Principal) : async Types.MintReceipt {
    let idKey : Trie.Key<Text> = getIDKey(nftID);
    let optionalNftContainer : ?NFT.Dip721NFT = Trie.find<Text, NFT.Dip721NFT>(nftStore, idKey, Text.equal);
    switch (optionalNftContainer) {
      case (null) { throw Error.reject("No NFT with given ID") };
      case (?nftContainer) {
        return await nftContainer.mintDip721(to, [])
      }
    }
  }
}
