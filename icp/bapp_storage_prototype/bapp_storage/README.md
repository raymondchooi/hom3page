# bapp_storage

In this directory you can find the backend code for storing the Hom3Page block data on ICP.
We haven't finished integrating it into the front-end (currently we use Firebase databases) but the proof of concept is done.

The next.js integration between front-end and back-end would be similar to what is the in the nft_bapp folder.

First, after verifying your internet identity, you would fetch or create your NFT collection by calling the getNFTCollection of the bapp_storage canister.
The returned value is the principal (address) of the NFT collection canister (smart contract).

Each time you buy a new block you would just call the NFT collection canister directly and mint an NFT for your block storing the data in key value pair.

All flow is similar to what is already implemented in the nft_bapp folder, which is a working example of an ICP bApp.
