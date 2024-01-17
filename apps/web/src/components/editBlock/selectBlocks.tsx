"use client";

import { useMemo } from "react";

import { Block } from "components";
import { WALL_WIDTH } from "constants/wall";
import { BLOCK_WIDTH, BLOCK_HEIGHT } from "constants/block";
import { cn } from "utils/tailwind";

interface SelectBlocksProps {
  purchasableBlocks: Map<string, object>;
  bought: boolean;
  blockIds: string[];
  editBappValue?: string;
  bAppStoredValues?: Record<string, string>;
  selectedBlocksForEditing: Map<string, object> | undefined;
  setSelectedBlocksForEditing: (
    selectedBlocksForEditing: Map<string, object>,
  ) => void;
}

function SelectBlocks({
  purchasableBlocks,
  bought,
  blockIds,
  editBappValue,
  bAppStoredValues,
  selectedBlocksForEditing,
  setSelectedBlocksForEditing,
}: SelectBlocksProps) {
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

  function renderBlockContent(blockId: string) {
    const blockContent =
      bAppStoredValues?.[blockId] || editBappValue || blockId;

    return (
      <Block
        key={blockContent}
        blockData={{
          id: blockId,
          content: blockContent,
        }}
        editing
      />
    );
  }

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
                      "relative z-20 box-border flex cursor-pointer items-center justify-center truncate border-2 border-transparent hover:border-red-600",
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
                    {renderBlockContent(blockId)}
                  </button>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default SelectBlocks;
