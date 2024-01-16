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
import { WALL_WIDTH } from "constants/wall";
import { type BlockData } from "models/BlockData";
import { BLOCK_WIDTH, BLOCK_HEIGHT } from "constants/block";
import { cn } from "utils/tailwind";

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

  const renderBuyButton = useMemo(() => {
    function handleBuyButtonClick() {
      setBought(true);
      console.log("blocks", optimisedBlockIds);
    }

    //TODO remove bought placeholder
    if (purchasableBlocks.size > 0 && !bought) {
      return (
        <div className="flex items-center">
          <Button
            onClick={handleBuyButtonClick}
          >{`Buy ${purchasableBlocks.size} Block${purchasableBlocks.size > 1 ? "s" : ""}`}</Button>
          <div className="ml-4 text-sm text-gray-500">
            {`Balance: ${parseFloat(balance?.data?.formatted ?? "0").toFixed(3)} ${balance?.data?.symbol}`}
          </div>
        </div>
      );
    }

    return (
      <div className="text-base text-gray-500">All selected blocks owned.</div>
    );
  }, [
    balance?.data?.formatted,
    balance?.data?.symbol,
    bought,
    optimisedBlockIds,
    purchasableBlocks.size,
  ]);

  function groupBlocksIntoRectangles(blockIds: string[]) {
    const groups = new Map();
    let groupCount = 0;

    for (let i = 0; i < blockIds.length; i++) {
      // Skip if block already in rectangle
      if (
        Array.from(groups.values()).some((group) =>
          group?.blockIds.includes(blockIds[i]),
        )
      )
        continue;

      const blockId = blockIds[i];
      const row = Math.floor(parseInt(blockId ?? "1") / WALL_WIDTH);
      const col = parseInt(blockId ?? "1") % WALL_WIDTH;

      // Initialize the rectangle with the current block
      const rectangles = [{ id: blockId, row: row, col: col }];

      // Iterate over the rest of the blocks
      for (let j = 0; j < blockIds.length; j++) {
        // Skip the current block
        if (j === i) continue;

        // TODO add block start index
        const otherRow = Math.floor(parseInt(blockIds[j] ?? "1") / WALL_WIDTH);
        const otherCol = parseInt(blockIds[j] ?? "1") % WALL_WIDTH;

        // Check if this block can form a rectangle with the current block
        if (
          (Math.abs(row - otherRow) <= 1 && col === otherCol) ||
          (row === otherRow && Math.abs(col - otherCol) <= 1)
        ) {
          rectangles.push({ id: blockIds[j], row: otherRow, col: otherCol });
        }
      }

      if (rectangles.length > 0) {
        const minRow = Math.min(...rectangles.map((r) => r.row));
        const minCol = Math.min(...rectangles.map((r) => r.col));
        const maxRow = Math.max(...rectangles.map((r) => r.row));
        const maxCol = Math.max(...rectangles.map((r) => r.col));

        const width = maxCol - minCol + 1;
        const height = maxRow - minRow + 1;

        groups.set(groupCount.toString(), {
          firstBlockId: blockId,
          width,
          height,
          blockIds: rectangles.map((r) => r.id),
        });

        groupCount++;
      }
    }

    return groups;
  }

  const rectangleBlockGroups = useMemo(() => {
    return groupBlocksIntoRectangles(blockIds);
  }, [blockIds]);

  function handleBlockSelect(blockId: string) {
    const blockIdString = blockId.toString();

    if (!selectedBlocksForEditing) {
      setSelectedBlocksForEditing(new Map());
    }

    if (selectedBlocksForEditing?.has(blockIdString)) {
      // might need .filter((id) => id !== blockIdString
      const rectangleGroups = groupBlocksIntoRectangles(
        Array.from(selectedBlocksForEditing.keys()),
      );

      selectedBlocksForEditing?.delete(blockId);

      for (const [, value] of rectangleGroups.entries()) {
        if (value.blockIds.includes(blockIdString)) {
          for (const blockId of value.blockIds) {
            if (blockIdString !== blockId)
              selectedBlocksForEditing?.set(blockId, {
                selected: false,
                isFirstBlock: true,
              });
          }
        }
      }
    } else {
      const rectangleGroups = groupBlocksIntoRectangles(
        selectedBlocksForEditing
          ? [...Array.from(selectedBlocksForEditing.keys()), blockIdString]
          : [],
      );

      for (const [, value] of rectangleGroups.entries()) {
        if (value?.blockIds?.includes(blockIdString)) {
          selectedBlocksForEditing?.set(value.firstBlockId, {
            isFirstBlock: true,
            selected: true,
            width: value.width,
            height: value.height,
          });

          if (value.firstBlockId !== blockIdString)
            selectedBlocksForEditing?.set(blockIdString, {
              selected: true,
              isFirstBlock: false,
            });
        }
      }
    }

    setSelectedBlocksForEditing(new Map(selectedBlocksForEditing));
  }

  const renderSelectBlocks = () => {
    return (
      <div className="mt-4 flex gap-x-6 overflow-x-auto">
        {Array.from(rectangleBlockGroups.values()).map((group, i) => {
          return (
            <div
              key={i}
              style={{
                gridTemplateColumns: `repeat(${group.width}, minmax(0, 1fr))`,
              }}
              className="grid gap-0"
            >
              {group.blockIds.map((blockId: string) => {
                const isBlockSelected = selectedBlocksForEditing?.has(
                  blockId.toString(),
                );
                const isFirstBlockFromSelected = isBlockSelected
                  ? (
                      selectedBlocksForEditing?.get(blockId.toString()) as {
                        isFirstBlock: boolean;
                      }
                    )?.isFirstBlock
                  : false;

                return (
                  <div key={blockId} className="group relative">
                    <div
                      style={{
                        width: BLOCK_WIDTH,
                        height: BLOCK_HEIGHT,
                      }}
                    ></div>
                    <div
                      className={cn(
                        "absolute left-0 top-0 border-2 border-gray-500",
                        isBlockSelected ? "border-red-600" : "border-gray-400",
                        isFirstBlockFromSelected
                          ? "z-10 overflow-visible"
                          : "border-transparent",
                        !isBlockSelected &&
                          !isFirstBlockFromSelected &&
                          "border-gray-400",
                      )}
                      style={{
                        width: isFirstBlockFromSelected
                          ? BLOCK_WIDTH *
                            (
                              selectedBlocksForEditing?.get(
                                blockId.toString(),
                              ) as { width: number; height: number }
                            )?.width
                          : BLOCK_WIDTH,
                        height: isFirstBlockFromSelected
                          ? BLOCK_HEIGHT *
                            (
                              selectedBlocksForEditing?.get(
                                blockId.toString(),
                              ) as { width: number; height: number }
                            )?.height
                          : BLOCK_HEIGHT,
                      }}
                    ></div>
                    <button
                      className={cn(
                        "absolute left-0 top-0 z-20 box-border flex cursor-pointer items-center justify-center truncate border-2 border-transparent hover:border-red-600",
                        purchasableBlocks.get(blockId) && !bought
                          ? "cursor-not-allowed border-dashed border-gray-200 bg-gray-200 hover:border-gray-400"
                          : "border-transparent ",
                      )}
                      onClick={() => handleBlockSelect(blockId)}
                      style={{
                        width: BLOCK_WIDTH,
                        height: BLOCK_HEIGHT,
                      }}
                      title={`${purchasableBlocks.get(blockId) && !bought ? "Not owned: " : ""}${blockId.toString()}`}
                    >
                      {blockId}
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

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
                {renderBuyButton}

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

          {renderSelectBlocks()}

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
