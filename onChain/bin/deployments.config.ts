/** @format */

import { ContractNames } from "./deployedAddress";

// BlockToken BlockSales BlockStore

export default function deploymentConfig() {
  const deployCue: ContractNames[] = ["BlockStore"];
  const ethernalEnabled: boolean = true;

  return { deployCue, ethernalEnabled };
}
