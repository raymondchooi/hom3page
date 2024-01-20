export const idlFactory = ({ IDL }) => {
  const NFTCreationResult = IDL.Record({
    'id' : IDL.Text,
    'cyclesUsed' : IDL.Nat64,
  });
  const LogoResult = IDL.Record({ 'data' : IDL.Text, 'logo_type' : IDL.Text });
  const NFTData = IDL.Record({
    'maxLimit' : IDL.Nat16,
    'logo' : LogoResult,
    'name' : IDL.Text,
    'totalSupply' : IDL.Nat64,
    'symbol' : IDL.Text,
  });
  const TokenId = IDL.Nat64;
  const MintReceiptPart = IDL.Record({ 'id' : IDL.Nat, 'token_id' : TokenId });
  const ApiError = IDL.Variant({
    'ZeroAddress' : IDL.Null,
    'InvalidTokenId' : IDL.Null,
    'Unauthorized' : IDL.Null,
    'Other' : IDL.Null,
  });
  const MintReceipt = IDL.Variant({ 'Ok' : MintReceiptPart, 'Err' : ApiError });
  return IDL.Service({
    'createNFT' : IDL.Func(
        [IDL.Principal, IDL.Text, IDL.Text, IDL.Nat16, IDL.Text, IDL.Text],
        [NFTCreationResult],
        [],
      ),
    'getNFTData' : IDL.Func([IDL.Text], [NFTData], []),
    'mintNFT' : IDL.Func([IDL.Text, IDL.Principal], [MintReceipt], []),
  });
};
export const init = ({ IDL }) => { return []; };
