/** @format */

import { Addressable, Contract } from "ethers";
import delay from "../../scripts/helpers/delay";
import verifyContractOnScan from "../../scripts/helpers/verifyOnScan";
import { DeploymentProps } from "../../types/deploymentArguments";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function deployProxy({
  hre,
  deployer,
  delayTime,
  contractName,
  network,
  constructorArguments,
  prevDeployments,
}: DeploymentProps): Promise<Contract | false> {
  try {
    const contract = await hre.ethers.getContractFactory(
      contractName,
      deployer
    );
    const deployedContract = await hre.upgrades.deployProxy(
      contract,
      constructorArguments,
      {
        initializer: "constructor",
      }
    );

    await deployedContract.waitForDeployment();
    console.log(
      `🟢 Contract Deployed : ${contractName} to ${deployedContract.target} as Proxy`
    );

    if (network.name !== "hardhat") {
      await delay(delayTime);
      await verifyContractOnScan(hre.run, deployedContract.target);
    } else {
      await hre.ethernal.push({
        name: contractName,
        address: deployedContract.target as string,
        workspace: "hardhat",
      });
    }

    return deployedContract;
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
    return false;
  }
}
