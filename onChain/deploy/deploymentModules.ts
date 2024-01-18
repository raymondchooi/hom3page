/** @format */
import GenericDeployer from "./deployers/deployer";
import ProxyDeployer from "./deployers/deployProxy";
import { BlockTokenArguments } from "./deploymentArguments";

import { ArgumentStore, Deployment } from "../types/deploymentArguments";
import {
  BlockStoreArguments,
  BlockSalesArguments,
} from "./deploymentArguments/sales.arguments";
import {
  Hom3PageDepositVaultArguments,
  Hom3PageVaultArguments,
} from "./deploymentArguments/vaults.arguments";

const deploymentFiles: Deployment = {
  BlockToken: GenericDeployer,
  ProfileToken: GenericDeployer,
  BlockSales: GenericDeployer,
  BlockStore: GenericDeployer,
};

export const deploymentArgumentStore: ArgumentStore = {
  BlockToken: BlockTokenArguments,
  BlockSales: BlockSalesArguments,
  BlockStore: BlockStoreArguments,
  Hom3Vault: Hom3PageVaultArguments,
  Hom3DepositVault: Hom3PageDepositVaultArguments,
};

export default deploymentFiles;
