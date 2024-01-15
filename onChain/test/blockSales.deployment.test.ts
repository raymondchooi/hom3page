/** @format */

import { expect, assert } from "chai";
import hre, { ethers, network } from "hardhat";
import { AddressLike, Addressable, Contract, Signer } from "ethers";
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

describe("> BlockSales Contract Deployment test", function () {
  let BlockToken: BlockToken;
  let SalesContract: BlockSales;

  let addressStore: {
    [wallet: string]: { address: string | Addressable; signer: Signer };
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

    return;
  };

  before(async function () {
    console.log("🧪 pre test : Mounted");
    await preTest();
  });

  describe("💡 Deployment Checks", function () {
    it("Should deploy the contract onChain", async function () {
      // Get Factory Contracts
      const contract = await ethers.getContractFactory("BlockSales");

      //  Deploy contracts
      let [arg11, arg12] = BlockSalesArguments(
        addressStore.owner.address,
        network.name as ChainName
      );
      SalesContract = await contract.deploy(BlockToken.target, arg12);
      await SalesContract.waitForDeployment();

      const owner = await SalesContract.owner();
      expect(owner).to.equal(addressStore.owner.address);
    });

    it("Should get total sold blocks (0)", async function () {
      const owner = await SalesContract.getTotalSold();
      expect(owner).to.equal(0);
    });

    it("Should get cost of block (100 * 10 ** 18)", async function () {
      const cost = await SalesContract.getBlockCost();
      expect(cost).to.equal(ethers.parseUnits("100", "ether"));
    });

    it("Should Transfer OWnership to Minter", async function () {
      const transfer = await SalesContract.transferOwnership(
        addressStore.minter.address
      );
      await transfer.wait();
      const newOwner = await SalesContract.owner();
      expect(newOwner).to.equal(addressStore.minter.address);
    });
  });
});
