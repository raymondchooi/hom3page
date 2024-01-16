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

  const delayTime = 20000;

  const deploymentAddresses: DeploymentStore[] = [];
  const opGoerli: ContractNames[] = ["BlockToken", "BlockSales"];
  const maticMumbai: ContractNames[] = ["BlockStore"];
  const deploys: { network: ChainName; deploys: ContractNames[] }[] = [
    { network: "opGoerli", deploys: opGoerli },
  ];

  for (let y = 0; y < deploys.length; y++) {
    console.log(
      `🟠 [TASK] ${taskId} : Connecting to network ${deploys[y].network}`
    );
    const network = await hre.ethers.provider.getNetwork();
    if (deploys[y].network != network.name) throw "Wrong Network";
    const [deployer] = await hre.ethers.getSigners();

    for (let i = 0; i < opGoerli.length; i++) {
      console.log(
        `🟠 [TASK] ${taskId} : Deploying contract ${i + 1}/${opGoerli.length}`
      );
      let deployment = opGoerli[i];
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
