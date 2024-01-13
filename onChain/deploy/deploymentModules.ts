/** @format */
import GenericDeployer from "./deployers/deployer";
import ProxyDeployer from "./deployers/deployProxy";
import { BlockTokenArguments } from "./deploymentArguments";

import { ArgumentStore, Deployment } from "~/types/deploymentArguments";

const deploymentFiles: Deployment = {
  BlockToken: GenericDeployer,
  ProfileToken: GenericDeployer,
  SalesContract: GenericDeployer,
};

export const deploymentArgumentStore: ArgumentStore = {
  BlockToken: BlockTokenArguments,
};

export default deploymentFiles;
