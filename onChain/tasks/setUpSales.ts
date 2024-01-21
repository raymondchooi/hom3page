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
  const [deployer, notThisDeployer, nopeTheNext] =
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

  if (deployedContracts[name]?.Hom3DepositVault) {
    // Add the deposit contract to the profile
    const addDepositAddressTx = await profileContract.setDepositContractAddress(
      deployedContracts[name]?.Hom3DepositVault as Addressable
    );
    await addDepositAddressTx.wait();
    console.log(
      `🟠 [TASK] ${taskId} :Added deposit contract to profile contract`
    );
  }

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

  // Add the deposit vault to porfile
  const vaultUpdate = await profileContract.setDepositContractAddress(
    deployedContracts.ethSepolia?.Hom3DepositVault
  );

  await vaultUpdate.wait();
  console.log(`🟠 [TASK] ${taskId} : Added deposit vault address to profile`);

  // AAllow chain to take messages
  const chainAlow = await profileContract.setAllowedChainId(
    "16015286601757825753",
    true
  );

  await chainAlow.wait();
  console.log(`🟠 [TASK] ${taskId} : Added deposit vaultchain to true`);

  // Allow Hom3Profile to spend paymet token
  const paymentToken = await hre.ethers.getContractAt(
    "ERC20",
    tokenAddress.usdc[name] as Addressable,
    deployer
  );

  const approvalProfileTx = await paymentToken.approve(
    deployedContracts[name]?.Hom3Profile as Addressable,
    10000 * 10 ** 6
  );
  await approvalProfileTx.wait();
  console.log(`🟠 [TASK] ${taskId} : Approved USDC Spend`);

  // transfer MATIC

  const maticTx = await deployer.sendTransaction({
    to: profileContract.target,
    value: hre.ethers.parseUnits("0.01", "ether"),
  });

  await maticTx.wait();
  console.log(`🟢 Supplied with ETH : ${maticTx.hash}`);

  const linkToken = await hre.ethers.getContractAt(
    "ERC20",
    tokenAddress?.link[hre.network.name as ChainName] as Addressable,
    deployer
  );

  const linkTX = await linkToken.transfer(
    profileContract.target,
    hre.ethers.parseUnits("3", "ether")
  );

  await linkTX.wait();
  console.log(`🟢 Sent link to contract : ${linkTX.hash}`);

  /*   // Buy a single Block
  const buySingleTx = await salesContract.buyBlock([[1]], false);
  await buySingleTx.wait();
  console.log(`🟠 [TASK] ${taskId} : Bought Block No.1`); */

  console.log(`🟢 [TASK] ${taskId} : Finished`);
});
