/** @format */

import { task } from "hardhat/config";
import masterDeployer from "../deploy/deploy";
import deploymentConfig from "../bin/deployments.config";

const taskId = "deployContracts";
const taskDescription = "Deploy the given contracts";

// "DCAExecutor", "DCAAccount", "DCAFactory"

task(taskId, taskDescription)
  .addOptionalVariadicPositionalParam(
    "contractnames",
    "Array of contract names to deploy"
  )
  .setAction(async (_args, hre) => {
    console.log(`🟠 [TASK] ${taskId} : Mounted`);
    let { contractnames } = _args;
    if (!contractnames || contractnames.length === 0)
      contractnames = deploymentConfig().deployCue;
    await masterDeployer(hre, contractnames);
    console.log(`🟢 [TASK] ${taskId} : Finished`);
  });
