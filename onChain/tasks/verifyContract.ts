/** @format */
import { task } from "hardhat/config";
import { deploymentArgumentStore } from "../deploy/deploymentModules";
import { ChainName } from "../bin/tokenAddress";
import deployedContracts, { ContractNames } from "../bin/deployedAddress";

const taskId = "verifyContract";

task(taskId, "Register the DCAAccount Contract to block explorer")
  .addParam("contractName", "The name of the contract to verify")
  .setAction(async (_args, hre) => {
    console.log(`🟢 [TASK] ${taskId} : Mounted`);

    const [owner] = await hre.ethers.getSigners();
    const network = hre.network;

    let { contractName } = _args;
    console.log(
      `🟢 [TASK] ${taskId} : Verifying:`,
      contractName,
      " Network: ",
      network.name
    );

    const contract =
      deployedContracts[network.name as ChainName]![
        contractName as ContractNames
      ];
    console.log(`🟢 [TASK] ${taskId} : Verifying Contract : `, contract);

    //  Verify the contract
    await hre.run("verify:verify", {
      address: contract,
      constructorArguments: deploymentArgumentStore[contractName](
        owner.address,
        network.name as ChainName
      ),
    });
  });
