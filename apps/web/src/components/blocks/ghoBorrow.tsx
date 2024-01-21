"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAccount, sepolia, useNetwork } from "wagmi";
import { useModal, Avatar } from "connectkit";
import facuetAbi from "../../constants/ABIs/aaveFaucetbApp.abi.json";
import { ChainName, DEFAULT_PAYMENT_TOKEN } from "constants/ABIs/contracts";

import BlockDialog from "./dialog"; // Don't know if this is useful
import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "components/dialog";
import { Button } from "components";
import { polygonMumbai } from "wagmi/chains";
import {
  FetchBalanceResult,
  fetchBalance,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import { buildNetworkScanLink } from "utils/text";
import { BlockData } from "models/BlockData";

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

  const tokenAddresses = {
    wbtc: "0x29f2D40B0605204364af54EC677bD022dA425d03",
    gho: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",
  };

  const getTokenBalance = async (token: "wbtc" | "gho") => {
    const balance = await fetchBalance({
      address: address,
      token: tokenAddresses[token],
      chainId: chain?.id,
    });

    console.log(`Balance of ${balance.formatted} for ${token}`);
    return balance;
  };

  useEffect(() => {
    if (!wbtcBalance) {
      getTokenBalance("wbtc").then((value) => setWbtcBalance(value));
    }
    if (!ghoBalance) {
      getTokenBalance("gho").then((value) => setGhoBalance(value));
    }
  }, [wbtcBalance]);

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
  }, [chain]);

  // Add mint Faucet logic
  async function handleGo() {
    if (!isConnected) return setLoadingState(11);
    if (network !== "ethSepolia") {
      setLoadingState(13);
      openSwitchNetworks();
    }
    setLoadingState(1);

    try {
      const { hash } = await writeContract({
        address: faucetAddress[network] as `0x${string}`,
        abi: facuetAbi,
        functionName: "mint",
        args: [address],
      });
      setLoadingState(12);
      setHash(hash);
      await waitForTransaction({ hash, chainId: chain?.id });
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
          <div className="text-s">GET SOME GHO!</div>
          <div className="text-s">You have {wbtcBalance?.formatted}WBTC</div>
          <div className="text-s">
            You could Burrow {wbtcBalance?.formatted * 1.5}GHO!
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
                  Send your WBTC to Aave and burrow GHO to spend on deposit in
                  your profile! This will deposit 1WTBC to burrow 10,000GHO
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
