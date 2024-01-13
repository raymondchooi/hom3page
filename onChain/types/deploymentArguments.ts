/** @format */
import { AddressLike, Addressable, Network } from "ethers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { ChainName } from "../bin/tokenAddress";

export interface Deployment {
  [key: string]: (
    props: DeploymentProps
  ) => Promise<string | Addressable | false>;
}

export interface ArgumentStore {
  [key: string]: (
    deployerAddress: string | Addressable,
    network: ChainName
  ) => any;
}

export interface DeploymentProps {
  hre: HardhatRuntimeEnvironment;
  deployer: HardhatEthersSigner;
  delayTime: number;
  contractName: string;
  network: Network;
  constructorArguments: any[];
  prevDeployments: DeploymentStore[];
}

export type DeploymentStore = {
  deployment?: string | Addressable;
  contractName?: string;
};
export type DeploymentReturn = string | Addressable | false;
