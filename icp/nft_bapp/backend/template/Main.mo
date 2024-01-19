import Debug "mo:base/Debug";
import NFT "./NFT";
import Nat16 "mo:base/Nat16";
import Principal "mo:base/Principal";
import Types "./Types";

actor {
  public func createNFT(principal : Principal, name : Text, symbol : Text, maxLimit : Nat16, imageType: Text, image : Text) : async Text {
    // let principal = Principal.fromText(principalText);

    let logo : Types.LogoResult = { logo_type = imageType; data = image };
    let nft : Types.Dip721NonFungibleToken = { logo = logo; name = name; symbol = symbol; maxLimit = maxLimit };
    let nft_container = await NFT.Dip721NFT(principal, nft);
    let nftName = await nft_container.nameDip721();
    let output = nftName # " successfully created!";
    // let output = "NFT: " # name # "\nprincipal: " # debug_show (principal) # "\nsymbol: " # symbol # "\nmaxLimit: " # debug_show (maxLimit) # "\nimageType:" # debug_show(imageType) # "\nimage: " # image;
    // Debug.print(output);

    return nftName;
  }
}