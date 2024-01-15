/** @format */
import { task } from "hardhat/config";

const taskId = "runTest";

task(taskId, "Runs a single test")
  .addParam("testFileName", "The name of the contract to verify")
  .setAction(async (_args, hre) => {
    console.log(`🟢 [TASK] ${taskId} : Mounted`);

    const network = hre.network;
    let { testFileName } = _args;
    const testFile = `./test/${testFileName}`;

    console.log(`🟢 [TASK] ${taskId} : Running test 🧪:`, testFileName);
    console.log(`🟢 [TASK] ${taskId} : Testing Network 🧪:`, network.name);

    //  Verify the contract
    await hre.run(`test`, { testFiles: [testFile] });
  });
