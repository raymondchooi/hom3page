/** @format */

import { Addressable, Contract, Signer } from "ethers";
import delay from "../../scripts/helpers/delay";
import verifyContractOnScan from "../../scripts/helpers/verifyOnScan";
import { DeploymentProps } from "../../types/deploymentArguments";
import waitForConfirmations from "../../scripts/helpers/waitForConformations";
import ethernal from "hardhat-ethernal";

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
    const nonce = await deployer!.getNonce();
    const deployedContract: Contract = await hre.ethers.deployContract(
      contractName,
      constructorArguments,
      { nonce, signer: deployer }
    );
    console.log(
      `🟠 Deployment confirming : ${contractName}`
    );

    await deployedContract.waitForDeployment();
    console.log(`🟠 Deployment Confirmed : ${contractName}`);

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

    return deployedContract.target;
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
    return false;
  }
}
