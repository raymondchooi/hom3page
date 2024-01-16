/** @format */

import { ContractNames } from "./deployedAddress";

// BlockToken BlockSales

export default function deploymentConfig() {
  const deployCue: ContractNames[] = ["BlockToken"];
  const ethernalEnabled: boolean = true;

  return { deployCue, ethernalEnabled };
}
