/** @format */

import { expect, assert } from "chai";
import hre, { ethers } from "hardhat";
import { AddressLike, Contract, Signer } from "ethers";
import {
  BlockTokenArguments,
  BlockSalesArguments,
} from "../deploy/deploymentArguments";
import {
  ChainName,
  productionChainImpersonators,
  tokenAddress,
} from "../bin/tokenAddress";

import { BlockToken, BlockSales, IERC20 } from "../types/contracts";

describe("🧪 BlockToken Contract Deployment test", function () {
  let BlockToken: BlockToken;
  let addressStore: {
    [wallet: string]: { address: string | AddressLike; signer: Signer };
  };
  const addresses = () => {
    return addressStore;
  };

  const preTest = async () => {
    //  Setup Addresses and Signers
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    addressStore = {
      owner: { address: await owner.getAddress(), signer: owner },
      minter: { address: await addr1.getAddress(), signer: addr1 },
      user1: { address: await addr2.getAddress(), signer: addr2 },
      user2: {
        address: await addr3.getAddress(),
        signer: addr3,
      },
    };

    return;
  };

  before(async function () {
    console.log("🧪 : pre test : Mounted");
    await preTest();
  });

  describe("BlockToken Deployment Checks", function () {
    it("Should deploy the contract onChain", async function () {
      // Get Factory Contracts
      const blockTokenContract = await ethers.getContractFactory("BlockToken");

      //  Deploy contracts
      let [arg11, arg12, arg13] = BlockTokenArguments();
      BlockToken = await blockTokenContract.deploy(arg11, arg12, arg13);
      await BlockToken.waitForDeployment();

      const version = await BlockToken.symbol();
      expect(version).equal("HOM3");
    });

    it("Should mint all tokens to the minter", async function () {
      const { minter } = addresses();

      const mint = await BlockToken.mintAllBlocks(minter.address);
      await mint.wait();
      const totalSupply = await BlockToken.totalSupply();
      const ownerBalance = await BlockToken.balanceOf(minter.address);
      expect(totalSupply).to.equal(ownerBalance);
    });

    it("Total Supply should equal 288", async function () {
      const totalSupply = await BlockToken.totalSupply();
      expect(totalSupply).to.equal(288);
    });

    it("Should prove Owner as Owner", async function () {
      const owner = await BlockToken.owner();
      expect(owner).to.equal(addressStore.owner.address);
    });

    it("Should Transfer OWnership to Minter", async function () {
      const transfer = await BlockToken.transferOwnership(
        addressStore.minter.address
      );
      await transfer.wait();
      const newOwner = await BlockToken.owner();
      expect(newOwner).to.equal(addressStore.minter.address);
    });
  });
});
