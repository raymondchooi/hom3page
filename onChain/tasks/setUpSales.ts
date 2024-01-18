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
  const [notThis, orThis, deployer] = await hre.ethers.getSigners();
  const { name } = await hre.ethers.provider.getNetwork();

  console.log(
    `🟠 [TASK] ${taskId} : Connecting to ${contractname} at ${deployedContracts[name]?.BlockSales}`
  );
  const chainId = hre.ethers.toBigInt(16015286601757825753);

  //    Set BlockStore data
  const salesContract = await hre.ethers.getContractAt(
    contractname,
    deployedContracts[name]?.BlockSales!,
    deployer
  );
  console.log(`🟠 [TASK] ${taskId} : Connected to contract`);

  const chainStateTx = await salesContract.setBlockStoreActive(chainId, true);
  await chainStateTx.wait();
  console.log(`🟠 [TASK] ${taskId} : Allowed Eth Sepolia Chain`);

  const chainSaleAddressTx = await salesContract.setBlockStore(
    chainId,
    deployedContracts.ethSepolia?.BlockStore!
  );
  await chainSaleAddressTx.wait();
  console.log(`🟠 [TASK] ${taskId} : Added Store to Chain allow`);

  console.log(`🟢 [TASK] ${taskId} : Finished`);
});
