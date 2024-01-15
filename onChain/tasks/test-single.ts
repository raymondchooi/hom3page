/** @format */
import { task } from "hardhat/config";

const taskId = "runTest";

task(taskId, "Runs a single test")
  .addParam("test", "The name of the contract to verify")
  .setAction(async (_args, hre) => {
    console.log(`🟢 [TASK] ${taskId} : Mounted`);

    const network = hre.network;
    let { test } = _args;
    const testFile = `./test/${test}`;

    console.log(`🟢 [TASK] ${taskId} : Running test 🧪:`, test);
    console.log(`🟢 [TASK] ${taskId} : Testing Network 🧪:`, network.name);

    //  Verify the contract
    await hre.run(`test`, { testFiles: [testFile] });
  });
