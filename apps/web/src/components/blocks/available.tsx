"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button, BappSummary } from "components";
import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "components/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "components/carousel";
import type { BlockData } from "models/BlockData";
import { BAPPS_BASE_URL } from "constants/urls";

interface AvailableProps {
  blockData: BlockData;
}

function Available({ blockData }: AvailableProps) {
  const [open, setOpen] = useState(false);
  //TODO add mint logic
  const [minted, setMinted] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-full w-full cursor-pointer items-center justify-center rounded-none bg-gray-800"
      >
        <Image
          className="opacity-70"
          src="/logo_plain.jpg"
          alt="Hom3page Logo"
          width={40}
          height={40}
        />
      </button>

      <Dialog open={open} onClose={setOpen}>
        <DialogTitle className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <div className="mr-4 truncate text-xl font-semibold text-zinc-950">{`#${blockData.id}`}</div>
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span>
            <div className="text-base font-semibold text-zinc-500">
              Available
            </div>
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
            <ol className="list-decimal space-y-4 pl-4 text-lg">
              <li className="pl-4">
                {minted ? (
                  <div>Minted!</div>
                ) : (
                  <Button onClick={() => setMinted(true)}>Mint Block</Button>
                )}
              </li>
              <li className="pl-4">Add bApp</li>
            </ol>
            <div className="mt-4 flex justify-end">
              <Link
                className="cursor-pointer text-right underline"
                href={BAPPS_BASE_URL}
              >
                Explore more
              </Link>
            </div>

            <Carousel
              opts={{
                align: "start",
              }}
              className="mt-2 w-full"
            >
              <CarouselContent>
                <CarouselItem className="basis-1/3">
                  <div className="flex cursor-pointer items-start justify-start rounded-lg border border-gray-200 p-2">
                    <BappSummary
                      id="1"
                      title="Text"
                      description="Add text to your block"
                      image="/logo_plain.jpg"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem className="basis-1/3">
                  <div className="flex cursor-pointer items-start justify-start rounded-lg border border-gray-200 p-2">
                    <BappSummary
                      id="2"
                      title="Image"
                      description="Add an image to your block"
                      image="/logo_plain.jpg"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem className="basis-1/3">
                  <div className="flex cursor-pointer items-start justify-start rounded-lg border border-gray-200 p-2">
                    <BappSummary
                      id="3"
                      title="Text2"
                      description="Add text2 to your block"
                      image="/logo_plain.jpg"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem className="basis-1/3">
                  <div className="flex cursor-pointer items-start justify-start rounded-lg border border-gray-200 p-2">
                    <BappSummary
                      id="4"
                      title="Text3"
                      description="Add text3 to your block"
                      image="/logo_plain.jpg"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem className="basis-1/3">
                  <div className="flex cursor-pointer items-start justify-start rounded-lg border border-gray-200 p-2">
                    <BappSummary
                      id="5"
                      title="Text4"
                      description="Add text4 to your block"
                      image="/logo_plain.jpg"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </DialogDescription>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default Available;
