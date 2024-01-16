"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

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
import { BAPPS_BASE_URL } from "constants/urls";
import { useAccount, useBalance, sepolia } from "wagmi";

interface EditBlockDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function EditBlockDialog({ open, setOpen }: EditBlockDialogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const editBlockParam = searchParams.get("editBlock");

  const { address } = useAccount();
  const balance = useBalance({ address, chainId: sepolia.id });

  const [bought, setBought] = useState(false);

  const blockIds = useMemo(() => {
    return editBlockParam ? editBlockParam.split(",") : [];
  }, [editBlockParam]);

  const blockIdsText = `#${blockIds.join(", #")}`;

  const optimisedBlockIds = useMemo(() => {
    const result = [];
    for (let i = 0; i < blockIds.length; i++) {
      const currentBlockId = Number(blockIds[i]);
      if (i === 0 || currentBlockId !== Number(blockIds[i - 1]) + 1) {
        result.push([blockIds[i]]);
      } else {
        result[result.length - 1]!.push(blockIds[i]);
      }
    }
    return result.map((item) => (item.length === 1 ? item[0] : item));
  }, [blockIds]);

  function handleBuyMultipleClick() {
    setOpen(false);

    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries()),
    );

    currentParams.set("selectMultipleBlocks", "true");

    router.push(`${pathname}?${currentParams.toString()}`);
  }

  function handleBuyButtonClick() {
    setBought(true);
    console.log("blocks", optimisedBlockIds);
  }

  return (
    <Dialog open={open} onClose={setOpen}>
      <DialogTitle className="flex items-center justify-between">
        <div className="flex items-center justify-start">
          <div className="mr-4 overflow-auto text-xl font-semibold text-zinc-950">
            {blockIdsText}
          </div>
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span>
          <div className="text-base font-semibold text-zinc-500">Available</div>
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
          <ol className="list-decimal space-y-6 pl-4 text-lg">
            <li className="pl-4">
              {bought ? (
                <div>Bought!</div>
              ) : (
                <div className="flex flex-col items-start">
                  <div className="flex items-center">
                    <Button
                      onClick={handleBuyButtonClick}
                    >{`Buy Block${blockIds?.length > 1 ? "s" : ""}`}</Button>
                    <div className="ml-4 text-sm text-gray-500">
                      {`${parseFloat(balance?.data?.formatted ?? "0").toFixed(3)} ${balance?.data?.symbol}`}
                    </div>
                  </div>

                  <button
                    onClick={handleBuyMultipleClick}
                    className="mt-2 cursor-pointer text-sm text-gray-500 underline"
                  >
                    Buy multiple blocks
                  </button>
                </div>
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
  );
}

export default EditBlockDialog;
