"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAccount, sepolia, useNetwork } from "wagmi";
import { useModal } from "connectkit";
import facuetAbi from "../../constants/ABIs/bApps/aaveFaucetbApp.abi.json";
import { type ChainName } from "constants/ABIs/contracts";

import BlockDialog from "./dialog"; // Don't know if this is useful

import { Button } from "components";
import { polygonMumbai } from "wagmi/chains";
import { waitForTransaction, writeContract } from "@wagmi/core";
import { buildNetworkScanLink } from "utils/text";

function AaveFaucet({}) {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const { openSwitchNetworks } = useModal();
  const [openDialog, setOpenDialog] = useState(false);
  const [loadingState, setLoadingState] = useState<number>(0);
  const [hash, setHash] = useState<string>();
  const [hasError, setError] = useState<string | undefined>("");
  const [network, setNetwork] = useState<ChainName>(
    chain?.id === sepolia.id
      ? "ethSepolia"
      : chain?.id === polygonMumbai.id
        ? "maticMumbai"
        : "eth",
  );

  const faucetAddress = {
    ethSepolia: "0x5d94accFcF4f3297F0EF3B111e15B6C21Fd31463",
    maticMumbai: "0xdF80cE4e154333B565cEf92187B81233Ea4b33a2",
  };

  useEffect(() => {
    const name =
      chain?.id === sepolia.id
        ? "ethSepolia"
        : chain?.id === polygonMumbai.id
          ? "maticMumbai"
          : "eth";
    if (name !== network) setNetwork(name);
  }, [chain, network]);

  // Add mint Faucet logic
  async function handleGo() {
    if (!isConnected) return setLoadingState(11);
    if (network !== "maticMumbai" && network !== "ethSepolia") {
      setLoadingState(13);
      openSwitchNetworks();
    }
    setLoadingState(1);

    try {
      const { hash } = await writeContract({
        // @ts-ignore
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
      <button
        aria-label="Aave Faucet"
        className="flex h-full w-full items-center justify-center border-gray-700 active:scale-95 active:animate-spin"
        onClick={() => setOpenDialog(!openDialog)}
      >
        <Image
          src={"/blocks/faucet.svg"}
          alt="Wall link"
          width={20}
          height={20}
          className="opacity-70"
        />
      </button>
      {openDialog && (
        <BlockDialog
          open={openDialog}
          setOpen={setOpenDialog}
          title="Transaction Required"
          description={
            <div className="Gap-y-10">
              {loadingState < 2 && (
                <div className="text-s text-gray">
<<<<<<< Updated upstream
                  {
                    "The Aave Faucet wants to call 'mint' from you wallet. This will cost a little gas but mint WBTC, WETH, USDC and AAVE tokens in one transaction. This is available on Ethereum Sepolia & Polygon Mumbai. Do you want to continue?"
                  }
=======
                  The Aave Faucet wants to call `mint` from you wallet. This
                  will cost a little gas but mint WBTC, WETH, USDC and AAVE
                  tokens in one transaction. This is available on Ethereum
                  Sepolia & Polygon Mumbai. Do you want to continue?
>>>>>>> Stashed changes
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

export default AaveFaucet;
