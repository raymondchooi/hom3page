"use client";

import { Fragment, useMemo } from "react";

import { Block } from "components";
import { WALL_WIDTH } from "constants/wall";
import { BLOCK_WIDTH, BLOCK_HEIGHT } from "constants/block";
import { cn } from "utils/tailwind";

interface SelectBlocksProps {
  purchasableBlocks: Map<string, object>;
  bought: boolean;
  blockIds: string[];
  editBappId?: string;
  editBappValue?: string;
  bAppStoredValues?: Record<string, string>;
  selectedBlocksForEditing: Map<string, object>;
  setSelectedBlocksForEditing: (
    selectedBlocksForEditing: Map<string, object>,
  ) => void;
}

interface BlockRow {
  firstBlockId: string;
  width: number;
  height: number;
  blockIds: string[];
}

function SelectBlocks({
  purchasableBlocks,
  bought,
  blockIds,
  editBappId,
  editBappValue,
  bAppStoredValues,
  selectedBlocksForEditing,
  setSelectedBlocksForEditing,
}: SelectBlocksProps) {
  // TODO make this more efficient
  function groupBlocksIntoRectangles(
    blockIds: string[],
    preSelectedBlocks?: Map<string, object>,
  ) {
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

        // Iterate over the rectangles array
        for (let k = 0; k < rectangles.length; k++) {
          const rectangle = rectangles[k];

          // Check if this block can form a rectangle with the current rectangle
          if (
            (rectangle?.row &&
              Math.abs(rectangle?.row - otherRow) <= 1 &&
              rectangle?.col === otherCol) ||
            (rectangle?.row === otherRow &&
              Math.abs(rectangle?.col - otherCol) <= 1)
          ) {
            rectangles.push({ id: blockIds[j], row: otherRow, col: otherCol });
            break; // Break the loop as we have found a rectangle
          }
        }
      }

      if (rectangles.length > 0) {
        const minRow = Math.min(...rectangles.map((r) => r.row));
        const minCol = Math.min(...rectangles.map((r) => r.col));
        const maxRow = Math.max(...rectangles.map((r) => r.row));
        const maxCol = Math.max(...rectangles.map((r) => r.col));

        const width = maxCol - minCol + 1;
        const height = maxRow - minRow + 1;

        // Create a new map for each row
        const blockRows = new Map();
        for (let r = minRow; r <= maxRow; r++) {
          // Get all blocks in the same row
          const blocksInRow = rectangles.filter((block) => block.row === r);

          // Sort blocks by column
          blocksInRow.sort((a, b) => a.col - b.col);

          if (blocksInRow.length > 0) {
            let startCol = blocksInRow[0]?.col;
            let blockGroup = blocksInRow[0] ? [blocksInRow[0].id] : [];
            let gaps = 0;

            // Iterate over blocks in row
            for (let i = 1; i < blocksInRow.length; i++) {
              // If there is a gap, add the current group to the map and start a new one
              if (
                blocksInRow?.[i]?.col &&
                blocksInRow?.[i - 1]?.col &&
                (blocksInRow[i]?.col ?? 0) - (blocksInRow[i - 1]?.col ?? 0) > 1
              ) {
                if (blockGroup.length > 0) {
                  blockRows.set(`${r}-${startCol}`, {
                    firstBlockId: blockGroup[0],
                    startCol,
                    width: blockGroup.length,
                    height: 1,
                    blockIds: blockGroup,
                    gaps,
                  });
                }
                startCol = blocksInRow[i]?.col;
                blockGroup = [];
                gaps = 0;
              } else if (
                blocksInRow?.[i]?.col &&
                blocksInRow?.[i - 1]?.col &&
                (blocksInRow[i]?.col ?? 0) - (blocksInRow[i - 1]?.col ?? 0) ===
                  1
              ) {
                gaps++;
              }
              if (blocksInRow[i]?.id) {
                blockGroup.push(blocksInRow[i]?.id ?? "");
              }
            }

            // Add the last group to the map
            if (blockGroup.length > 0) {
              blockRows.set(`${r}-${startCol}`, {
                firstBlockId: blockGroup[0],
                startCol,
                width: blockGroup.length,
                height: 1,
                blockIds: blockGroup,
              });
            }
          }
        }

        groups.set(groupCount.toString(), {
          firstBlockId: blockId,
          width,
          height,
          blockIds: rectangles.map((r) => r.id),
          blockRows,
        });

        groupCount++;
      }
    }

    return groups;
  }

  const rectangleBlockGroups = useMemo(() => {
    const blocksre = groupBlocksIntoRectangles(blockIds);

    console.log("blocksre", blocksre);
    return blocksre;
  }, [blockIds]);

  function handleBlockSelect(blockId: string, selectable: boolean) {
    if (!selectable) return;

    const blockIdString = blockId.toString();

    if (!selectedBlocksForEditing) {
      setSelectedBlocksForEditing(new Map());
    }

    if (selectedBlocksForEditing?.has(blockIdString)) {
      // might need .filter((id) => id !== blockIdString
      const rectangleGroups = groupBlocksIntoRectangles(
        Array.from(selectedBlocksForEditing.keys()),
      );

      console.log("rectangleGroupsDELETE", rectangleGroups);

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

      console.log("rectangleGroupsADD", rectangleGroups);

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

  function renderBlockContent(blockId: string, isBlockSelected: boolean) {
    const blockContent =
      bAppStoredValues?.[blockId] || editBappValue || blockId;

    return (
      <Block
        key={blockContent}
        blockData={{
          id: blockId,
          type: editBappId,
          content: isBlockSelected ? blockContent : blockId,
        }}
        editing
      />
    );
  }

  return (
    <div className="mt-4 flex gap-x-6 overflow-x-auto">
      {Array.from(rectangleBlockGroups.values()).map((group, i) => {
        return (
          <div key={i}>
            {Array.from(group.blockRows.values()).map((row: any, j) => {
              return (
                <div key={j} className="flex flex-nowrap">
                  {row.blockIds.map((blockId: string, k: any) => {
                    const isBlockSelected = !!selectedBlocksForEditing?.has(
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
                      <Fragment key={blockId}>
                        {Array.from({ length: row.gap }).map((_, gapIndex) => (
                          <div
                            key={`gap-${k}-${gapIndex}`}
                            style={{
                              width: BLOCK_WIDTH,
                              height: BLOCK_HEIGHT,
                            }}
                          ></div>
                        ))}
                        <div className="group relative">
                          <div
                            className={cn(
                              "absolute left-0 top-0 border-2 border-gray-800 bg-gray-900",
                              isBlockSelected
                                ? "border-emerald-400"
                                : "border-gray-800",
                              isFirstBlockFromSelected
                                ? "z-10 overflow-visible"
                                : "border-transparent",
                              !isBlockSelected &&
                                !isFirstBlockFromSelected &&
                                "border-gray-800",
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
                              "relative z-20 box-border flex cursor-pointer items-center justify-center truncate border-2 border-transparent hover:border-emerald-400",
                              purchasableBlocks.get(blockId) && !bought
                                ? "cursor-not-allowed border-dashed border-gray-600 hover:border-gray-800"
                                : "border-transparent ",
                            )}
                            onClick={() =>
                              handleBlockSelect(
                                blockId,
                                !(purchasableBlocks.get(blockId) && !bought),
                              )
                            }
                            style={{
                              width: BLOCK_WIDTH,
                              height: BLOCK_HEIGHT,
                            }}
                            title={`${purchasableBlocks.get(blockId) && !bought ? "Not owned: #" : "#"}${blockId.toString()}`}
                          >
                            {renderBlockContent(blockId, isBlockSelected)}
                          </button>
                        </div>
                      </Fragment>
                    );
                  })}
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
