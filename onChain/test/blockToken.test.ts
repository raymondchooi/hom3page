/** @format */

import { expect } from "chai";
import hre from "hardhat";
import { Contract, Signer } from "ethers";

describe("BlockToken Contract Unit Test", function () {
  let BlockToken: Contract;
  let blockToken: Contract;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;
  let salesContract: Signer;

  beforeEach(async function () {
    const blockTokenFactory = await hre.ethers.getContractFactory("BlockToken");
    console.log("Check contract", blockTokenFactory);

    [owner, addr1, addr2, salesContract] = await hre.ethers.getSigners();

    blockToken = await hre.ethers.deploy("BlockToken", [
      "BlockToken",
      "HOM3",
      "1",
    ]);
    await blockToken.deployed();
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

  // Votes Functionality Tests
  describe("Votes Functionality", function () {
    it("Should assign voting power after minting", async function () {
      // Implement your test logic here
    });

    // Additional Votes tests can be implemented here
  });

  // Further tests for transfer, ownership, delegation, etc.
});
