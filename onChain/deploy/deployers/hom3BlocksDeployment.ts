/** @format */

import { Addressable, Contract, Signer } from "ethers";
import delay from "../../scripts/helpers/delay";
import verifyContractOnScan from "../../scripts/helpers/verifyOnScan";
import { DeploymentProps } from "../../types/deploymentArguments";
import waitForConfirmations from "../../scripts/helpers/waitForConformations";
import ethernal from "hardhat-ethernal";
import { BlockToken } from "../../types/contracts";

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
    console.log(
      `🟠 Deployment Confirmed : ${contractName} to ${
        deployedContract.deploymentTransaction()?.hash
      }`
    );

    if (hre.network.name !== "localhost" && hre.network.name !== "hardhat")
      await waitForConfirmations(
        hre,
        deployedContract.deploymentTransaction()?.hash!,
        2
      );

    console.log(
      `🟢 Contract Deployed : ${contractName} to ${deployedContract.target}`
    );

    if (network.name !== "hardhat" && network.name !== "localhost") {
      await delay(delayTime);
      await verifyContractOnScan(
        hre.run,
        deployedContract.target,
        constructorArguments
      );
    } else {
      await hre.ethernal.push({
        name: contractName,
        address: deployedContract.target as string,
        workspace: "hardhat",
      });
    }

    if (contractName === "BlockSales") {
      const tokenContract = (await hre.ethers.getContractFactory("BlockToken"))
        .attach(prevDeployments[0].deployment!)
        .connect(deployer);

      const tx = await tokenContract.mintAllBlocks(deployedContract.targets);
      await tx.wait();
      console.log(
        `🟢 Minted to Sales : ${deployedContract.targets} to ${tx.hash}`
      );
    }

    return deployedContract.target;
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
    return false;
  }
}
