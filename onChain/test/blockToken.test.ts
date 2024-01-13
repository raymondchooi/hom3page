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

describe("BlockToken Contract Unit Test", function () {
  let BlockToken: Contract;
  let SalesContract: Contract;
  let GHOContract: Contract;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;

  before(async function () {
    console.log("🧪 : pre test : Mounted");
    await preTest();
    return;
  });

  const preTest = async () => {
    const blockTokenContract = await ethers.getContractFactory("BlockToken");
    [owner, addr1, addr2] = await ethers.getSigners();

    let [arg11, arg12, arg13] = BlockTokenArguments();
    BlockToken = await blockTokenContract.deploy(arg11, arg12, arg13);
    await BlockToken.waitForDeployment();
    console.log("🧪 : Deployed BlockToken", BlockToken.target);
    return;
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

      const attached = BlockToken.connect(addr1).transferFrom(
        minter,
        user,
        287
      );
      await attached.wait();

      const ownerOf288 = await BlockToken.ownerOf(287);
      console.log("Owner of 287:", ownerOf288, "users: ", user);

      expect(ownerOf288).equal(user);
    });
  });

  return;
  // ERC721 Functionality Tests
});

/**
 * 
 *   // Votes Functionality Tests
  describe("Votes Functionality", function () {
    it("Should assign voting power after minting", async function () {
      await blockToken.mintAllBlocks(salesContract.address);
      const salesContractVotingPower = await blockToken.getVotes(
        salesContract.address
      );
      expect(salesContractVotingPower).to.equal(288);
    });

    it("Should transfer voting power on token transfer", async function () {
      await blockToken.mintAllBlocks(salesContract.address);
      await blockToken
        .connect(salesContract)
        .transferFrom(salesContract.address, addr1.address, 1);

      const addr1VotingPower = await blockToken.getVotes(addr1.address);
      const salesContractVotingPower = await blockToken.getVotes(
        salesContract.address
      );
      expect(addr1VotingPower).to.equal(1);
      expect(salesContractVotingPower).to.equal(287);
    });

    // Additional Votes tests can be implemented here
  }); */
