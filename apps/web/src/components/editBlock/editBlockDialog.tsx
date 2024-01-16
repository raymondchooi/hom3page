"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useAccount, useBalance, sepolia } from "wagmi";

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
import { type BlockData } from "models/BlockData";
import BuyButton from "./buyButton";
import SelectBlocks from "./selectBlocks";

interface EditBlockDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  wallData: BlockData[];
}

function EditBlockDialog({ open, setOpen, wallData }: EditBlockDialogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const editBlockParam = searchParams.get("editBlock");

  const { address } = useAccount();
  const balance = useBalance({ address, chainId: sepolia.id });

  const [bought, setBought] = useState(false);
  const [selectedBlocksForEditing, setSelectedBlocksForEditing] =
    useState<Map<string, object>>();

  const blockIds = useMemo(() => {
    return editBlockParam
      ? editBlockParam.split(",").sort((a, b) => parseInt(a) - parseInt(b))
      : [];
  }, [editBlockParam]);

  const blockIdsText = `#${blockIds.join(", #")}`;

  // TODO optimise this late night code, this is to double check on frontend that blocks are editable
  const ownedBlocks = useMemo(() => {
    const ownedBlocks = new Map();

    for (const block of wallData) {
      if (block?.owner === address && blockIds.includes(block.id)) {
        ownedBlocks.set(block.id, block);
      }
    }

    return ownedBlocks;
  }, [wallData, address, blockIds]);

  const purchasableBlocks = useMemo(() => {
    const purchasableBlocks = new Map();

    for (const block of wallData) {
      // TODO change to check if purchasable
      if (!block?.owner && blockIds.includes(block.id)) {
        purchasableBlocks.set(block.id, block);
      }
    }

    return purchasableBlocks;
  }, [blockIds, wallData]);

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

  function handleSelectMultipleClick() {
    setOpen(false);

    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries()),
    );

    currentParams.set("selectMultipleBlocks", "true");
    currentParams.delete("editBlock");

    router.push(`${pathname}?${currentParams.toString()}`);
  }

  return (
    <Dialog open={open} onClose={setOpen}>
      <DialogTitle className="flex items-center justify-between">
        <div className="flex items-center justify-start">
          <div className="mr-4 overflow-auto text-xl font-semibold text-zinc-950">
            {blockIdsText}
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
          <ol className="list-decimal space-y-6 pl-4 text-lg">
            <li className="pl-4">
              <div className="flex flex-col items-start">
                <BuyButton
                  purchasableBlocks={purchasableBlocks}
                  balance={balance}
                  optimisedBlockIds={optimisedBlockIds}
                  setBought={setBought}
                  bought={bought}
                />

                <button
                  onClick={handleSelectMultipleClick}
                  className="mt-2 cursor-pointer text-sm text-gray-500 underline"
                >
                  Select more blocks
                </button>
              </div>
            </li>
            <li className="pl-4">
              Edit bApps
              {/** TODO change bought to ownedBlocks.size */}
              <span className="ml-2 text-xs">{`(${selectedBlocksForEditing?.size ?? 0} selected)`}</span>
            </li>
          </ol>

          <SelectBlocks
            purchasableBlocks={purchasableBlocks}
            bought={bought}
            blockIds={blockIds}
            selectedBlocksForEditing={selectedBlocksForEditing}
            setSelectedBlocksForEditing={setSelectedBlocksForEditing}
          />

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
