"use client";

import { useState } from "react";
import Image from "next/image";

import { Button } from "components";
import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "components/dialog";

import type { BlockData } from "models/BlockData";

interface AvailableProps {
  blockData: BlockData;
}

function Available({ blockData }: AvailableProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        <Image
          src="/logo_plain.jpg"
          alt="Hom3page Logo"
          width={40}
          height={40}
        />
      </Button>

      <Dialog open={open} onClose={setOpen}>
        <DialogTitle className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <span className="mr-2 inline-block h-3 w-3 rounded-full bg-green-500"></span>
            <div className="text-xl font-semibold text-zinc-950">Available</div>

            <div className="truncate text-xl font-semibold text-zinc-950">{`#${blockData.id}`}</div>
          </div>
          <Button plain onClick={() => setOpen(false)}>
            <svg
              className="h-6 w-6 text-zinc-950 dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <title>Close</title>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </DialogTitle>
        <DialogBody>
          <DialogDescription>
            <ol>
              <li>
                <Button>Mint Block</Button>
              </li>
              <li>Add bApp</li>
            </ol>
          </DialogDescription>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default Available;
