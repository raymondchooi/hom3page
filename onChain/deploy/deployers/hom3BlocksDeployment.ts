/** @format */

import { Addressable, Contract, Signer } from "ethers";
import delay from "../../scripts/helpers/delay";
import verifyContractOnScan from "../../scripts/helpers/verifyOnScan";
import { DeploymentProps } from "../../types/deploymentArguments";
import waitForConfirmations from "../../scripts/helpers/waitForConformations";
import ethernal from "hardhat-ethernal";
import { BlockToken } from "../../types/contracts";
import { ChainName, tokenAddress } from "../../bin/tokenAddress";

export default async function deploy({
  hre,
  deployer,
  delayTime,
  contractName,
  network,
  constructorArguments,
  prevDeployments,
}: DeploymentProps): Promise<string | Addressable | false> {
  try {
    if (contractName === "BlockSales")
      constructorArguments[0] = prevDeployments[0].deployment;

    const deployedContract: Contract = await hre.ethers.deployContract(
      contractName,
      constructorArguments,
      { signer: deployer }
    );
    console.log(
      `🟠 Deployment confirming : ${contractName} to ${deployedContract.target}`
    );

    await deployedContract.waitForDeployment();
    console.log(`🟠 Deployment Confirmed : ${contractName}`);

    if (hre.network.name !== "localhost" && hre.network.name !== "hardhat")
      await waitForConfirmations(
        hre,
        deployedContract.deploymentTransaction()?.hash!,
        2
      );

    console.log(`🟢 Contract Deployed : ${contractName}`);

    if (network.name !== "hardhat" && network.name !== "localhost") {
      try {
        await delay(delayTime);
        await verifyContractOnScan(
          hre.run,
          deployedContract.target,
          constructorArguments
        );
      } catch (error) {
        console.log(
          `🔴 Failed to verify contract : ${contractName} to ${deployedContract.target}`
        );
      }
    } else {
      await hre.ethernal.push({
        name: contractName,
        address: deployedContract.target as string,
        workspace: "hardhat",
      });
    }
    // @dev spesific logic for BLockSales contract
    if (contractName === "BlockSales") {
      const tokenContract = (await hre.ethers.getContractFactory("BlockToken"))
        .attach(prevDeployments[0].deployment!)
        .connect(deployer);

      const tx = await tokenContract.mintAllBlocks(deployedContract.target);
      await tx.wait();
      console.log(
        `🟢 Minted to Sales : ${deployedContract.target} to ${tx.hash}`
      );

      const paymentToken = await hre.ethers.getContractAt(
        "ERC20",
        constructorArguments[1],
        deployer
      );

      const approvalTx = await paymentToken.approve(
        deployedContract.target,
        5000 * 10 ** 6
      );

      await approvalTx.wait();
      console.log(`🟢 Approved USDC Spend : ${approvalTx.hash}`);

      const maticTx = await deployer.sendTransaction({
        to: deployedContract.target,
        value: hre.ethers.parseUnits("0.5", "ether"),
      });

      await maticTx.wait();
      console.log(`🟢 Supplied with ETH : ${maticTx.hash}`);

      const linkToken = await hre.ethers.getContractAt(
        "ERC20",
        tokenAddress?.link[hre.network.name as ChainName]!,
        deployer
      );

      const linkTX = await linkToken.transfer(
        deployedContract.target,
        hre.ethers.parseUnits("5", "ether")
      );

      await linkTX.wait();
      console.log(`🟢 Sent link to contract : ${linkTX.hash}`);
    }
    // @dev spesific logic for BLockStore contract
    if (contractName === "BlockStore") {
      const paymentToken = await hre.ethers.getContractAt(
        "ERC20",
        constructorArguments[1],
        deployer
      );

      const approvalTx = await paymentToken.approve(
        deployedContract.target,
        hre.ethers.parseUnits("200", "ether")
      );

      await approvalTx.wait();
      console.log(`🟢 Approved Token Spend : ${approvalTx.hash}`);

      const linkToken = await hre.ethers.getContractAt(
        "ERC20",
        tokenAddress?.link[hre.network.name as ChainName]!,
        deployer
      );

      const linkTX = await linkToken.transfer(
        deployedContract.target,
        hre.ethers.parseUnits("5", "ether")
      );

      await linkTX.wait();
      console.log(`🟢 Sent link to contract : ${linkTX.hash}`);

      const nativeTx = await deployer.sendTransaction({
        to: deployedContract.target,
        value: hre.ethers.parseUnits("0.5", "ether"),
      });

      await nativeTx.wait();
      console.log(`🟢 Supplied with Matic : ${nativeTx.hash}`);
    }
    if (contractName == "Hom3Profile") {
      const salesContract = (await hre.ethers.getContractFactory("BlockSales"))
        .attach(prevDeployments[1].deployment!)
        .connect(deployer);

      const tx1 = await salesContract.setProfileAddress(
        deployedContract.target
      );
      await tx1.wait();
      console.log(
        `🟢  Set profile on Sales : ${deployedContract.target} to ${tx1.hash}`
      );

      const buySingleTx = await salesContract.buyBlock(1);
      await buySingleTx.wait();
      console.log(`🟢 Bought Block No.1 : ${buySingleTx.hash}`);

      const maticTx = await deployer.sendTransaction({
        to: deployedContract.target,
        value: hre.ethers.parseUnits("0.5", "ether"),
      });

      await maticTx.wait();
      console.log(`🟢 Supplied with ETH : ${maticTx.hash}`);

      const linkToken = await hre.ethers.getContractAt(
        "ERC20",
        tokenAddress?.link[hre.network.name as ChainName]!,
        deployer
      );

      const linkTX = await linkToken.transfer(
        deployedContract.target,
        hre.ethers.parseUnits("5", "ether")
      );

      await linkTX.wait();
      console.log(`🟢 Sent link to contract : ${linkTX.hash}`);
    }
    return deployedContract.target;
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
    return false;
  }
}
