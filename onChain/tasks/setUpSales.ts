/** @format */

import { task } from "hardhat/config";
import deployProxy from "../deploy/deployers/deployProxy";
import { deploymentArgumentStore } from "../deploy/deploymentModules";
import { ChainName, tokenAddress } from "../bin/tokenAddress";
import deployedContracts from "../bin/deployedAddress";
import { Addressable } from "ethers";

const taskId = "setupSales";
const taskDescription = "Setup the sales contract";

task(taskId, taskDescription).setAction(async (_args, hre) => {
  console.log(`🟠 [TASK] ${taskId} : Mounted`);
  const contractname = "BlockSales";
  const [notThisDeployer, noreThisDeployer, deployer] =
    await hre.ethers.getSigners();
  const name = (await hre.ethers.provider
    .getNetwork()
    .then((result) => result.name)) as ChainName;

  console.log(
    `🟠 [TASK] ${taskId} : Connecting to ${contractname} at ${deployedContracts[name]?.BlockSales}`
  );
  const chainId = hre.ethers.toBigInt("16015286601757825753");

  //    Set BlockStore data
  // Connect to Sale contract
  const salesContract = await hre.ethers.getContractAt(
    contractname,
    deployedContracts[name]?.BlockSales!,
    deployer
  );
  console.log(`🟠 [TASK] ${taskId} : Connected to Sales contract`);

  const profileContract = await hre.ethers.getContractAt(
    "Hom3Profile",
    deployedContracts[name]?.Hom3Profile! as Addressable,
    deployer
  );
  console.log(`🟠 [TASK] ${taskId} : Connected to Profile Contract`);

  // set the profile address on Sales
  const setSalesOnProfile = await profileContract.setSalesContract(
    salesContract.target
  );
  await setSalesOnProfile.wait();
  console.log(`🟠 [TASK] ${taskId} : Set Sales address on Profile`);

  // Set the profile contract address
  const tx1 = await salesContract.setProfileAddress(profileContract.target);
  await tx1.wait();
  console.log(`🟠 [TASK] ${taskId} : Set profile contract on Sales `);

  // Add the deposit contract to the profile
  const addDepositAddressTx = await profileContract.setDepositContractAddress(
    deployedContracts[name]?.Hom3DepositVault as Addressable
  );
  await addDepositAddressTx.wait();
  console.log(
    `🟠 [TASK] ${taskId} :Added deposit contract to profile contract`
  );

  // Set the chain to accept messages
  const chainStateTx = await salesContract.setBlockStoreActive(chainId, true);
  await chainStateTx.wait();
  console.log(`🟠 [TASK] ${taskId} : Allowed Eth Sepolia Chain`);

  // Set the store address as allow
  const chainSaleAddressTx = await salesContract.setBlockStore(
    chainId,
    deployedContracts.ethSepolia?.BlockStore!
  );
  await chainSaleAddressTx.wait();
  console.log(`🟠 [TASK] ${taskId} : Added Store to Chain allow`);

  // Allow Hom3Profile to
  const paymentToken = await hre.ethers.getContractAt(
    "ERC20",
    tokenAddress.usdc[name] as Addressable,
    deployer
  );

  const approvalTx = await paymentToken.approve(
    deployedContracts[name]?.Hom3Profile as Addressable,
    1000 * 10 ** 6
  );
  await approvalTx.wait();
  console.log(`🟠 [TASK] ${taskId} : Approved USDC Spend`);

  // Buy a single Block
  const buySingleTx = await salesContract.buyBlock(1);
  await buySingleTx.wait();
  console.log(`🟠 [TASK] ${taskId} : Bought Block No.1`);

  console.log(`🟢 [TASK] ${taskId} : Finished`);
});
