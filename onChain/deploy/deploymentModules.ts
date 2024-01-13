/** @format */
import GenericDeployer from "./deployers/deployer";
import ProxyDeployer from "./deployers/deployProxy";
import {
  BlockSalesArguments,
  BlockTokenArguments,
} from "./deploymentArguments";

import { ArgumentStore, Deployment } from "../types/deploymentArguments";

const deploymentFiles: Deployment = {
  BlockToken: GenericDeployer,
  ProfileToken: GenericDeployer,
  BlockSales: GenericDeployer,
};

export const deploymentArgumentStore: ArgumentStore = {
  BlockToken: BlockTokenArguments,
  BlockSales: BlockSalesArguments,
};

export default deploymentFiles;
