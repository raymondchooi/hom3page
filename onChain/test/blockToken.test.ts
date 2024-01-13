/** @format */

import { expect, assert } from "chai";
import hre, { ethers } from "hardhat";
import { Contract, Signer } from "ethers";
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

describe("🧪 BlockToken Contract Test", function () {
  let BlockToken: BlockToken;
  let SalesContract: BlockSales;
  let GHOContract: IERC20;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;
  let addr3: Signer;

  before(async function () {
    console.log("🧪 : pre test : Mounted");
    await preTest();
  });

  const preTest = async () => {
    const blockTokenContract = await ethers.getContractFactory("BlockToken");
    [owner, addr1, addr2, addr3] = await ethers.getSigners();

    let [arg11, arg12, arg13] = BlockTokenArguments();
    BlockToken = await blockTokenContract.deploy(arg11, arg12, arg13);
    await BlockToken.waitForDeployment();
    console.log("🧪 : Deployed BlockToken", BlockToken.target);
    return;
  };

  const addresses = async () => {
    const addresses = {
      minter: { address: await addr1.getAddress(), signer: addr1 },
      user1: { address: await addr2.getAddress(), signer: addr2 },
      user2: { address: await addr3.getAddress(), signer: addr3 },
    };

    return addresses;
  };

  describe("ERC721 Functionality", function () {
    it("Should mint all tokens to the minter", async function () {
      const minter = await addr1.getAddress();
      const mint = await BlockToken.mintAllBlocks(minter);
      await mint.wait();
      const totalSupply = await BlockToken.totalSupply();
      const ownerBalance = await BlockToken.balanceOf(minter);
      expect(totalSupply).to.equal(ownerBalance);
    });

    it("Total Supply should equal 288", async function () {
      const totalSupply = await BlockToken.totalSupply();
      expect(totalSupply).to.equal(288);
    });

    it("Should show Minter as owner of token 1", async function () {
      const minter = await addr1.getAddress();
      const ownerOfOne = await BlockToken.ownerOf(1);
      expect(ownerOfOne).equal(minter, ownerOfOne);
    });

    it("Should transfer token 287", async function () {
      const minter = await addr1.getAddress();
      const user = await addr2.getAddress();

      const attached = BlockToken.connect(addr1);
      const tx = await attached.transferFrom(minter, user, 287);
      await tx.wait();

      const ownerOf288 = await BlockToken.ownerOf(287);
      expect(ownerOf288).to.equal(user);
    });

    it("Should fail with out permision", async function () {
      const minter = await addr1.getAddress();
      const user = await addr2.getAddress();

      const attached = BlockToken.connect(addr2);
      try {
        const tx = await attached.transferFrom(minter, user, 100);
        await tx.wait();
        assert.fail("The transaction should have failed but didn't.");
      } catch (error) {
        expect(error.message).to.include(
          "reverted with custom error 'TransferCallerNotOwnerNorApproved()'",
          "Expected transaction to revert"
        );
      }
    });
  });

  // Votes Functionality Tests
  describe("🧪 ERC721AVotes Functionality", function () {
    it("Should has same amount of tokens to voting power", async function () {
      const { minter } = await addresses();
      const minterVotingPower = await BlockToken.getVotes(minter.address);
      const minterBlance = await BlockToken.balanceOf(minter.address);
      console.log(
        "minter voting power: ",
        minterVotingPower.toString(),
        "token balance",
        minterBlance
      );

      expect(minterVotingPower).to.equal(minterBlance);
    });

    it("Should deligate 1 vote to User", async function () {
      const { minter, user2 } = await addresses();

      let user2VotingPower = await BlockToken.getVotes(user2.address);
      let minterVotingPower = await BlockToken.getVotes(minter.address);
      console.log(
        "Check voting 1:",
        user2VotingPower.toString(),
        minterVotingPower.toString()
      );

      const tx = await BlockToken.connect(addr1).delegate(user2.address);
      await tx.wait();

      user2VotingPower = await BlockToken.getVotes(user2.address);
      minterVotingPower = await BlockToken.getVotes(minter.address);
      console.log(
        "Check voting:",
        user2VotingPower.toString(),
        minterVotingPower.toString()
      );
      expect(minterVotingPower).to.equal(1);
      expect(user2VotingPower).to.equal(287);
    });

    // Additional Votes tests can be implemented here
  });
});
