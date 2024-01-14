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

describe("🧪 BlockToken Contract Test 1", function () {
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

    // Get Factory Contracts
    const blockTokenContract = await ethers.getContractFactory("BlockToken");

    //  Deploy contracts
    let [arg11, arg12, arg13] = BlockTokenArguments();
    BlockToken = await blockTokenContract.deploy(arg11, arg12, arg13);
    await BlockToken.waitForDeployment();

    console.log("🧪 : Deployed BlockToken", BlockToken.target);
    return;
  };

  before(async function () {
    console.log("🧪 : pre test : Mounted");
    await preTest();
  });

  describe("ERC721 Functionality", function () {
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

    it("Should show Minter as owner of token 1", async function () {
      const { minter } = addresses();
      const ownerOfOne = await BlockToken.ownerOf(1);
      expect(ownerOfOne).equal(minter.address, ownerOfOne);
    });

    it("Should transfer token 287", async function () {
      const { minter, user1 } = addresses();

      const attached = BlockToken.connect(minter.signer);
      const tx = await attached.transferFrom(
        minter.address,
        user1.address,
        287
      );
      await tx.wait();

      const ownerOf288 = await BlockToken.ownerOf(287);
      expect(ownerOf288).to.equal(user1.address);
    });

    it("Should retunr the holding URI string", async function () {
      const uri = await BlockToken.tokenURI(1);
      expect(uri).to.equal("override uri1");
    });
  });
});
