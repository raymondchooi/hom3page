/** @format */

import { expect } from "chai";
import hre, { ethers } from "hardhat";
import { Contract, Signer } from "ethers";
import {
  BlockTokenArguments,
  BlockSalesArguments,
} from "../deploy/deploymentArguments";
import { ChainName } from "../bin/tokenAddress";

describe("BlockToken Contract Unit Test", function () {
  let BlockToken: Contract;
  let blockToken: Contract;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;
  let salesContract: Contract;

  beforeEach(async function () {
    const blockTokenContract = await ethers.getContractFactory("BlockToken");
    const blockSalesContract = await ethers.getContractFactory("BlockSales");

    [owner, addr1, addr2] = await ethers.getSigners();

    let [arg11, arg12, arg13] = BlockTokenArguments();

    blockToken = await blockTokenContract.deploy(arg11, arg12, arg13);

    let [arg21, arg22] = BlockSalesArguments(
      blockToken.target,
      hre.network.name as ChainName
    );

    salesContract = await blockSalesContract.deploy(arg21, arg22);
  });

  // ERC721 Functionality Tests
  describe("ERC721 Functionality", function () {
    it("Should mint all tokens to the sales contract", async function () {
      await blockToken.mintAllBlocks(await salesContract.getAddress());
      expect(
        await blockToken.balanceOf(await salesContract.getAddress())
      ).to.equal(288);
    });

    // Additional ERC721 tests can be implemented here
  });
  /* 
  // Votes Functionality Tests
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

  // Further tests for transfer, ownership, delegation, etc.
});
