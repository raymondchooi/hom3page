/** @format */

import { task } from "hardhat/config";
import deployProxy from "../deploy/deployers/deployProxy";
import { deploymentArgumentStore } from "../deploy/deploymentModules";
import { ChainName } from "../bin/tokenAddress";
import deployedContracts from "../bin/deployedAddress";

const taskId = "setupSales";
const taskDescription = "Setup the sales contract";


task(taskId, taskDescription).setAction(async (_args, hre) => {
  console.log(`🟠 [TASK] ${taskId} : Mounted`);
  const contractname = "BlockSales";
  const [deployer] = await hre.ethers.getSigners();
  const network = (await hre.ethers.provider.getNetwork()?.name) as ChainName;

  const delayTime = 40000;

  //    Set BlockStore data
  const salesContract = await hre.ethers.getContractAt(
    "ERC20",
    deployedContracts[network]?.BlockSales,
    deployer
  );

  const chainStateTx = await salesContract.setBlockStoreActive(
    16015286601757825753,
    true
  );
  await chainStateTx.wait();
  console.log(`🟠 [TASK] ${taskId} : Allowed Eth Sepolia Chain`);

  const chainSaleAddressTx = await salesContract.setBlockStoreActive(
    16015286601757825753,
    deployedContracts.ethSepolia?.BlockStore
  );
  await chainSaleAddressTx.wait();
  console.log(`🟠 [TASK] ${taskId} : Added Store to Chain allow`);

  console.log(`🟢 [TASK] ${taskId} : Finished`);
});
