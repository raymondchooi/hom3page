/** @format */

import { expect, assert } from "chai";
import hre, { ethers } from "hardhat";
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

describe("🧪 BlockSales Contract Test 1", function () {
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
    const salesContract = await ethers.getContractFactory("BlockSales");

    //  Deploy contracts
    //  Token Contract
    let [arg1, arg2, arg3]: any[] = BlockTokenArguments();
    BlockToken = await blockTokenContract.deploy(arg1, arg2, arg3);
    await BlockToken.waitForDeployment();
    console.log("🧪 : Deployed BlockToken", BlockToken.target);
    //  Sales Contract
    [arg1, arg2] = [
      BlockToken.target,
      BlockSalesArguments(addressStore.owner.address, "localhost")[1],
    ];

    SalesContract = await salesContract.deploy(arg1, arg2);
    await SalesContract.waitForDeployment();
    console.log("🧪 : Deployed SalesToken", SalesContract.target);

    //  Steal some GHO

    const victim = await ethers.getImpersonatedSigner(
      "0xE831C8903de820137c13681E78A5780afDdf7697"
    );

    console.log("Got Victem: ", victim);

    const ghoContract = await ethers.getContractFactory("IERC20");
    await ghoContract.attached("0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f");
    const transferAmount = 10000 * 10 ** 18;
    const tx = await ghoContract
      .connect(victim)
      .transfer(addressStore.owner.address, transferAmount);
    await tx.await();
    console.log("🧪 : Transfered GHO");

    return;
  };

  before(async function () {
    console.log("🧪 : pre test : Mounted");
    await preTest();
  });

  describe("ERC721 Functionality", function () {
    it("Should mint all tokens to the minter", async function () {
      const mint = await BlockToken.mintAllBlocks(SalesContract.target);
      await mint.wait();
      const totalSupply = await BlockToken.totalSupply();
      const ownerBalance = await BlockToken.balanceOf(SalesContract.target);
      expect(totalSupply).to.equal(ownerBalance);
    });

    it("Total Supply should equal 288", async function () {
      const totalSupply = await BlockToken.totalSupply();
      expect(totalSupply).to.equal(288);
    });
  });
});
