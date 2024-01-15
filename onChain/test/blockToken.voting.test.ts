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

describe("> BlockToken Contract Test 2", function () {
  let BlockToken: BlockToken;
  let SalesContract: BlockSales;
  let GHOContract: IERC20;

  let addressStore: {
    [waller: string]: { address: string | AddressLike; signer: Signer };
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

    // Get Factory Contracts
    const blockTokenContract = await ethers.getContractFactory("BlockToken");

    //  Deploy contracts
    let [arg11, arg12, arg13] = BlockTokenArguments();
    BlockToken = await blockTokenContract.deploy(arg11, arg12, arg13);
    await BlockToken.waitForDeployment();

    console.log("🧪 Deployed BlockToken", BlockToken.target);
    return;
  };

  before(async function () {
    console.log("🧪 pre test : Mounted");
    await preTest();
    console.log("🧪 pre test : Complete");
  });

  // Votes Functionality Tests
  describe("💡 ERC721AVotes Functionality", function () {
    it("Should mint all tokens to the minter", async function () {
      const { minter } = await addresses();
      const mint = await BlockToken.mintAllBlocks(minter.address);
      await mint.wait();
      const totalSupply = await BlockToken.totalSupply();
      const ownerBalance = await BlockToken.balanceOf(minter.address);
      expect(totalSupply).to.equal(ownerBalance);
    });

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

      const tx = await BlockToken.connect(minter.signer).delegate(
        user2.address
      );
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
