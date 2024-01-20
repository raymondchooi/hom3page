/** @format */

import { task } from "hardhat/config";
import masterDeployer from "../deploy/deploy";
import deploymentConfig from "../bin/deployments.config";
import deploy from "../deploy/deployers/hom3BlocksDeployment";
import { deploymentArgumentStore } from "../deploy/deploymentModules";
import { ChainName } from "../bin/tokenAddress";
import { DeploymentStore } from "../types/deploymentArguments";
import { ContractNames } from "../bin/deployedAddress";

const taskId = "deployHom3PageBlocks";
const taskDescription = "Deploy the given contracts";

task(taskId, taskDescription).setAction(async (_args, hre) => {
  console.log(`🟠 [TASK] ${taskId} : Mounted`);

  const delayTime = 30000;
  const network = await hre.ethers.provider.getNetwork();
  const [notThisDeployer, noreThisDeployer, deployer] =
    await hre.ethers.getSigners();

  console.log(`🟠 [TASK] ${taskId} : Connected as ${deployer.address}`);

  const opGoerli: ContractNames[] = ["BlockToken", "BlockSales"];
  const ethSepolia: ContractNames[] = ["BlockStore"];
  const maticMumbai: ContractNames[] = [
    "BlockToken",
    "BlockSales",
    "Hom3Profile",
  ];
  const deploymentAddresses: DeploymentStore[] = [];
  const deploys: { [chain in ChainName]?: ContractNames[] } = {
    opGoerli: opGoerli,
    maticMumbai: maticMumbai,
    ethSepolia: ethSepolia,
  };

  console.log(`🟠 [TASK] ${taskId} : Connecting to network ${network?.name}`);

  if (!deploys[network?.name as unknown as ChainName]) return;
  else {
    const thisRun: ContractNames[] = deploys[network!.name as ChainName] ?? [];
    for (let i = 0; i < thisRun.length; i++) {
      console.log(
        `🟠 [TASK] ${taskId} : Deploying contract ${i + 1}/${thisRun.length}`
      );
      let deployment = thisRun[i];
      const tx = await deploy({
        hre,
        deployer,
        delayTime,
        contractName: deployment,
        network,
        constructorArguments: deploymentArgumentStore[deployment](
          deployer.address,
          network.name as ChainName
        ),
        prevDeployments: deploymentAddresses,
      });
      if (tx)
        deploymentAddresses.push({
          contractName: deployment,
          deployment: tx,
        });
    }
  }

  console.log(`🟢 [TASK] ${taskId} : Finished`);
});
