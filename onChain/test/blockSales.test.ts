/** @format */

import { expect, assert } from "chai";
import helpers from "@nomicfoundation/hardhat-toolbox/network-helpers";
import hre, { ethers } from "hardhat";
import ERC20ABI from "../bin/abi/ERC20.abi.json";
import GHOABI from "../bin/abi/IGhoToken.abi.json";

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
    console.log("🧪 : Pre-Test : ", hre.network.name);

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
    const victim: Signer = await ethers.getImpersonatedSigner(
      "0xE831C8903de820137c13681E78A5780afDdf7697"
    );
    console.log("🧪 : Got Victem: ", victim);

    const ethTx = await victim.sendTransaction({
      to: addressStore.owner.address,
      value: ethers.utils.parseUnits("1", "ether"),
    });
    console.log("Transfered ETH from Victem pre wait :", ethTx);

    await ethTx.wait();
    console.log("Transfered ETH from Victem");

    const ghoContract: Contract = await ethers.getContractFactory("IGhoToken");
    console.log("🧪 :  Connected to GHO contract :", ghoContract);

    await ghoContract
      .attach("0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f")
      .connect(victim);

    const transferAmount = 10000 * 10 ** 18;
    const tx = await ghoContract.transfer(
      addressStore.owner.address,
      transferAmount
    );
    await tx.wait();
    console.log("🧪 : Transfered GHO");

    return;
  };

  before(async function () {
    console.log("🧪 : pre test : Mounted");
    await preTest();
    console.log("🧪 : pre test : Complete");
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
