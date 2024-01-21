"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAccount, sepolia, useNetwork } from "wagmi";
import { useModal } from "connectkit";
import ghoAbi from "../../constants/ABIs/bApps/aaveBurrow.abi.json";
import ER20_ABI from "../../constants/ABIs/erc20.abi.json";

import { type ChainName } from "constants/ABIs/contracts";

import BlockDialog from "./dialog"; // Don't know if this is useful

import { Button } from "components";
import { polygonMumbai } from "wagmi/chains";
import {
  type FetchBalanceResult,
  fetchBalance,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import { buildNetworkScanLink } from "utils/text";
import { type BlockData } from "models/BlockData";
import { ethers } from "ethers";

interface GhoBurrowProps {
  blockData: BlockData;
}

function GHOBurrow({}: GhoBurrowProps) {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const { openSwitchNetworks } = useModal();
  const [openDialog, setOpenDialog] = useState(false);
  const [loadingState, setLoadingState] = useState<number>(0);
  const [hash, setHash] = useState<string>();
  const [hasError, setError] = useState<string | undefined>("");
  const [wbtcBalance, setWbtcBalance] = useState<FetchBalanceResult>();
  const [ghoBalance, setGhoBalance] = useState<FetchBalanceResult>();

  const [network, setNetwork] = useState<ChainName>(
    chain?.id === sepolia.id
      ? "ethSepolia"
      : chain?.id === polygonMumbai.id
        ? "maticMumbai"
        : "eth",
  );

  useEffect(() => {
    const tokenAddresses = {
      wbtc: "0x29f2D40B0605204364af54EC677bD022dA425d03",
      gho: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60",
    };
    const getTokenBalance = async (token: "wbtc" | "gho") => {
      if (!address) return;

      const balance = await fetchBalance({
        address: address,
        token: tokenAddresses[token],
        chainId: chain?.id,
      });

      console.log(`Balance of ${balance.formatted} for ${token}`);
      return balance;
    };
    if (!wbtcBalance) {
      getTokenBalance("wbtc").then((value) => setWbtcBalance(value));
    }
    if (!ghoBalance) {
      getTokenBalance("gho").then((value) => setGhoBalance(value));
    }
  }, [address, chain?.id, ghoBalance, wbtcBalance]);

  useEffect(() => {
    const name =
      chain?.id === sepolia.id
        ? "ethSepolia"
        : chain?.id === polygonMumbai.id
          ? "maticMumbai"
          : "eth";
    if (name !== network) setNetwork(name);
    if (name && name !== "ethSepolia") {
      setLoadingState(13);
      openSwitchNetworks();
    } else {
      setLoadingState(0);
    }
  }, [chain, network, openSwitchNetworks]);

  // Add mint Faucet logic
  async function handleGo() {
    if (!isConnected) return setLoadingState(11);
    if (network !== "ethSepolia") {
      setLoadingState(13);
      openSwitchNetworks();
    }
    setLoadingState(1);

    try {
      const approvalTx = await writeContract({
        address: "0x29f2D40B0605204364af54EC677bD022dA425d03",
        abi: ER20_ABI,
        functionName: "approve",
        args: [
          "0x6ae43d3271ff6888e7fc43fd7321a503ff738951",
          ethers.parseEther("0.0000000001"),
        ],
      });

      await waitForTransaction({ hash: approvalTx.hash, chainId: chain?.id });

      const supplyArgs = [address, 1, address, 0];

      const provideLiquidetyTx = await writeContract({
        address: "0x6ae43d3271ff6888e7fc43fd7321a503ff738951",
        abi: ghoAbi,
        functionName: "supply",
        args: supplyArgs,
      });
      setLoadingState(12);
      setHash(provideLiquidetyTx.hash);
      await waitForTransaction({
        hash: provideLiquidetyTx.hash,
        chainId: chain?.id,
      });
      const burrowArgs = [
        tokenAddresses.gho,
        ethers.parseUnits("10000", "ether"),
        2,
        0,
        address,
      ];

      const burrowTx = await writeContract({
        address: "0x6ae43d3271ff6888e7fc43fd7321a503ff738951",
        abi: ghoAbi,
        functionName: "burrow",
        args: burrowArgs,
      });
      setLoadingState(12);
      setHash(burrowTx.hash);
      await waitForTransaction({
        hash: burrowTx.hash,
        chainId: chain?.id,
      });

      setLoadingState(2);
    } catch (error) {
      console.log("Error in Aave Faucet :", error);
      setLoadingState(10);
    }
  }

  const showButton = (): boolean => {
    if (loadingState === 0) return true;
    if (loadingState === 10) return true;
    else return false;
  };

  return (
    <>
      <div>
        <button
          aria-label="Aave Faucet"
          className="flex h-full w-full items-center justify-center border-gray-700 active:scale-95 active:animate-spin"
          onClick={() => setOpenDialog(!openDialog)}
        >
          <Image
            src={"/blocks/gho-icon-white.svg"}
            alt="Wall link"
            width={20}
            height={20}
            className="opacity-70"
          />
          <div>
            <div className="text-s">GET SOME GHO!</div>
            <div className="text-s">You have {wbtcBalance?.formatted}WBTC</div>
            <div className="text-s">You could Burrow 10,000 GHO!</div>
          </div>
        </button>
      </div>
      {openDialog && (
        <BlockDialog
          open={openDialog}
          setOpen={setOpenDialog}
          title="Transaction Required"
          description={
            <div className="Gap-y-10">
              {loadingState < 2 && (
                <div className="text-s text-gray">
                  {wbtcBalance &&
                    wbtcBalance?.value > 0 &&
                    ` Send your WBTC to Aave and burrow GHO to spend on deposit in
                  your profile! This will deposit 1WTBC to burrow 10,000GHO`}
                  {wbtcBalance &&
                    wbtcBalance?.value < 1 &&
                    `you don't have much WBTC, hit up the Faucet over there to get going. `}
                </div>
              )}
              <br />
              <div className="color-white text-m  flex justify-center text-black">
                {loadingState === 1 && "Please approve in your wallet"}
                {loadingState === 2 && "Success! Mint complete!"}
                {loadingState === 10 &&
                  `There was an error with the transaction, Please try again`}
                {loadingState === 11 && "Please Connect your wallet"}
                {loadingState === 12 && "Waiting for confirmation..."}
                {loadingState === 13 && "Please change networks"}
                <br />
                {hash && !hasError && (
                  <div>
                    <a
                      className="text-underlined"
                      href={buildNetworkScanLink({
                        network: network,
                        txHash: hash,
                      })}
                      target={"_blank"}
                    >
                      See transaction
                    </a>
                  </div>
                )}
              </div>
              {showButton() && (
                <div className="z-[10] mt-6 flex w-full justify-center">
                  <Button
                    fancy
                    onClick={() => handleGo()}
                    className="w-half text-white"
                  >
                    Mint
                  </Button>
                </div>
              )}
              {loadingState === 2 && (
                <div className="z-[10] mt-6 flex w-full justify-center">
                  <Button
                    fancy
                    onClick={() => setOpenDialog(!openDialog)}
                    className="w-half text-white"
                  >
                    Close
                  </Button>
                </div>
              )}
            </div>
          }
        />
      )}
    </>
  );
}

export default GHOBurrow;
