"use client";

import { useState } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { useModal, Avatar } from "connectkit";

import BlockDialog from "./dialog"; // Don't know if this is useful
import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "components/dialog";

function AaveFaucet({}) {
  const [openDialog, setOpenDialog] = useState(false);
  const { isConnected, address } = useAccount();

  const address = {
    ethSepolia: "",
    maticMumbai: "0xdF80cE4e154333B565cEf92187B81233Ea4b33a2",
  };

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
