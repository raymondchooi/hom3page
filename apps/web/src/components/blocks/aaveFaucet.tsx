"use client";

import { useState } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import BlockDialog from "./dialog"; // Don't know if this is useful

const FAUCET_CONTRACTS = {
  ethSepolia: {
    wbtc: "",
    aave: "",
    weth: "",
    usdc: "",
  },
  maticMumbai: {
    wbtc: "0x2Fa2e7a6dEB7bb51B625336DBe1dA23511914a8A",
    aave: "0x1558c6FadDe1bEaf0f6628BDd1DFf3461185eA24",
    weth: "0xc199807AF4fEDB02EE567Ed0FeB814A077de4802",
    usdc: "0x52D800ca262522580CeBAD275395ca6e7598C014",
  },
};

function AaveFaucet({}) {
  const [openDialog, setOpenDialog] = useState(false);
  const { isConnected, address } = useAccount();

  // Add mint Faucet logic

  return (
    <>
      <button
        aria-label="Aave Faucet"
        className="flex h-full w-full items-center justify-center border-gray-700 active:scale-95 active:animate-spin"
      >
        <Image
          src={"/blocks/faucet.svg"}
          alt="Wall link"
          width={20}
          height={20}
          className="opacity-70"
        />
      </button>
      {openDialog && <BlockDialog open={openDialog} setOpen={setOpenDialog} />}
    </>
  );
}

export default AaveFaucet;
