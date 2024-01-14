<!-- @format -->

# HOM3PAGE Contract Set

In this repo you will find all teh contracts used in the Hom3Page ecosyste (V1).

We have build the project using HardHat and a range of

## Install & Run

To use this set of contracts first clone the repo from Github

Then from inside the onChain directory

```bash
npm install

npm run compile

npx hardhat deployContracts contractsName1 contractName2 (--network [netowrkName])

npx hardhat help
npx hardhat test
```

Besure to setup a .env with the following

```bash

ALCHEMY_KEY=
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
ETHERSCAN_MAINNET_GAS_POINT=
COINMARKETCAP_API_KEY=

PRIVATE_DEV_KEY=
DEV_WALLETSET=

ETHERNAL_API_TOKEN=
ETHERSCAN_API_KEY=
```


