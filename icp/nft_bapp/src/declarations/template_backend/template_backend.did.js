export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'createNFT' : IDL.Func(
        [IDL.Principal, IDL.Text, IDL.Text, IDL.Nat16, IDL.Text, IDL.Text],
        [IDL.Text],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
