"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  useParams,
  useSearchParams,
  useRouter,
  usePathname,
} from "next/navigation";
import { PencilIcon } from "@heroicons/react/24/outline";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useAccount } from "wagmi";
import { db } from "utils/firebase";
import {
  collection,
  query,
  startAt,
  endAt,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import { Block, Button, EditBlockDialog, WelcomeDialog } from "components";
import { WALL_TOTAL_BLOCKS } from "constants/wall";
import { BLOCK_WIDTH, BLOCK_HEIGHT } from "constants/block";
import type { BlockData } from "models/BlockData";
import { cn } from "utils/tailwind";

export default function Wall() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { address } = useAccount();

  const selectMultipleBlocksOn =
    searchParams.get("selectMultipleBlocks") === "true";
  const editBlockParam = searchParams.get("editBlock");
  const wallId = decodeURIComponent(params?.id?.toString() ?? "0")
    .toString()
    .toLowerCase();
  const wallIdInt = isNaN(parseInt(wallId)) ? 0 : parseInt(wallId);

  const [welcomeDialogOpen, setWelcomeDialogOpen] = useState<boolean>(false);
  const [editBlockDialogOpen, setEditBlockDialogOpen] =
    useState<boolean>(false);
  const [selectedBlocks, setSelectedBlocks] = useState<Map<string, object>>(
    new Map(),
  );
  const [wallCollection] = useCollection(
    query(
      collection(db, "blocks"),
      orderBy("id", "asc"),
      startAt(`${wallIdInt === 0 ? 1 : wallIdInt * WALL_TOTAL_BLOCKS + 1}`),
      endAt(
        `${wallIdInt === 0 ? 288 : wallIdInt * WALL_TOTAL_BLOCKS + WALL_TOTAL_BLOCKS}`,
      ),
    ),
  );

  useEffect(() => {
    if (editBlockParam && !selectMultipleBlocksOn) {
      setEditBlockDialogOpen(true);
    } else {
      setEditBlockDialogOpen(false);
    }
  }, [editBlockParam, selectMultipleBlocksOn]);

  const handleEditDialogOpen = useCallback(
    (setOpen: boolean) => {
      const currentParams = new URLSearchParams(
        Array.from(searchParams.entries()),
      );

      if (setOpen) {
        currentParams.set(
          "editBlock",
          selectedBlocks ? Array.from(selectedBlocks.keys()).join(",") : "",
        );
      } else {
        // Add single selected block to selected
        if (currentParams.get("editBlock")?.split(",").length === 1) {
          const newSelectedBlocks = new Map();

          newSelectedBlocks.set(
            currentParams.get("editBlock")?.toString() ?? "",
            {
              selected: true,
            },
          );

          setSelectedBlocks(newSelectedBlocks);
        } else {
          setSelectedBlocks(new Map());
        }

        currentParams.delete("editBlock");
      }

      router.push(`${pathname}?${currentParams.toString()}`);
    },
    [pathname, router, searchParams, selectedBlocks],
  );

  //TODO change to real data (maybe shouldn't be array?)
  const generateRandomWallData = useMemo(() => {
    const wallData = [];
    for (let i = 0; i < WALL_TOTAL_BLOCKS; i++) {
      const wallIdInt = parseInt(wallId);
      const index =
        wallIdInt === 0 ? i + 1 : i + wallIdInt * WALL_TOTAL_BLOCKS + 1;

      const blockData: BlockData = { id: i.toString() };

      const randomTypeIndex = Math.floor(Math.random() * 4);
      if (randomTypeIndex === 0) {
        blockData.type = "text";
        blockData.owner = `0x${index}`;
        blockData.content = `text:Hello  ${index}`;
      } else if (randomTypeIndex === 1) {
        blockData.wallLink = `/${index}`;
        blockData.owner = `0x${index}`;
      } else if (randomTypeIndex === 2) {
        blockData.type = "image";
        blockData.owner = `0x${index}`;
        blockData.content = "img:/ateam.png|alt:ateam";
      }

      if (i === 212) {
        blockData.type = "profile";
        blockData.isFirstBlock = true;
        blockData.width = 4;
        blockData.height = 4;
      }

      wallData.push(blockData);
    }

    return wallData;
  }, [wallId]);

  const populatedWallData = useMemo(() => {
    const wallData = wallCollection?.docs || [];
    const populatedWallData: BlockData[] = Array.from(
      { length: 288 },
      (_, i) => {
        const index = i + 1;

        if (i === 212) {
          return {
            id: index.toString(),
            type: "profile",
            isFirstBlock: true,
            width: 4,
            height: 4,
          };
        }

        const existingBlock = wallData.find(
          (block) => block?.data()?.id === index.toString(),
        );

        return existingBlock?.data()?.id
          ? (existingBlock?.data() as BlockData)
          : { id: index.toString() };
      },
    );

    return populatedWallData;
  }, [wallCollection?.docs]);

  const renderBlocks = useMemo(() => {
    return (
      <>
        {populatedWallData.map((blockData, i) => {
          const blockId = blockData.id;
          const isOwner =
            !!blockData?.owner && !!address && blockData?.owner === address;

          if (selectMultipleBlocksOn) {
            function handleBlockSelect() {
              if (!selectedBlocks) {
                setSelectedBlocks(new Map());
              }

              if (selectedBlocks?.has(blockId.toString())) {
                selectedBlocks?.delete(blockId.toString());
              } else {
                // TODO probably some more efficient way to do this
                if (!blockData?.owner || isOwner)
                  selectedBlocks?.set(blockId.toString(), { selected: true });
              }

              setSelectedBlocks(new Map(selectedBlocks));
            }

            return (
              <div
                key={blockData.id}
                className="relative"
                title={`#${blockData.id}`}
              >
                <div
                  style={{
                    width: BLOCK_WIDTH,
                    height: BLOCK_HEIGHT,
                  }}
                ></div>
                <div
                  className={cn(
                    "absolute left-0 top-0 z-10 box-border flex cursor-pointer border-2 border-transparent bg-transparent hover:border-emerald-400",
                    blockData?.isFirstBlock ? "overflow-visible" : "z-0",
                  )}
                  style={{
                    width: BLOCK_WIDTH * (blockData?.width ?? 1),
                    height: BLOCK_HEIGHT * (blockData?.height ?? 1),
                  }}
                >
                  <Block key={blockId} blockData={blockData} />
                </div>
                <button
                  className={cn(
                    "absolute left-0 top-0 z-20 box-border flex cursor-pointer border-2 hover:border-emerald-400",
                    selectedBlocks?.has(blockId.toString())
                      ? "border-emerald-400"
                      : isOwner
                        ? "border-indigo-700"
                        : "border-transparent",
                    blockData?.isFirstBlock ? "overflow-visible" : "z-20",
                  )}
                  onClick={handleBlockSelect}
                  style={{
                    width: BLOCK_WIDTH * (blockData?.width ?? 1),
                    height: BLOCK_HEIGHT * (blockData?.height ?? 1),
                  }}
                />
              </div>
            );
          }

          return (
            <div
              key={blockData.id}
              className="relative"
              title={`#${blockData.id}`}
            >
              <div
                style={{
                  width: BLOCK_WIDTH,
                  height: BLOCK_HEIGHT,
                }}
              ></div>
              <div
                className={cn(
                  "absolute left-0 top-0 z-10 box-border flex cursor-pointer border-2 border-transparent bg-transparent hover:border-emerald-400",
                  blockData?.isFirstBlock ? "overflow-visible" : "z-0",
                  isOwner ? "border-indigo-700" : "border-transparent",
                )}
                style={{
                  width: BLOCK_WIDTH * (blockData?.width ?? 1),
                  height: BLOCK_HEIGHT * (blockData?.height ?? 1),
                }}
              >
                <Block blockData={blockData} />
              </div>
            </div>
          );
        })}
      </>
    );
  }, [address, populatedWallData, selectMultipleBlocksOn, selectedBlocks]);

  function handleConfirmSelection() {
    if (selectedBlocks) {
      const currentParams = new URLSearchParams(
        Array.from(searchParams.entries()),
      );

      currentParams.delete("selectMultipleBlocks");
      currentParams.set(
        "editBlock",
        selectedBlocks ? Array.from(selectedBlocks.keys()).join(",") : "",
      );

      router.push(`${pathname}?${currentParams.toString()}`);
    }
  }

  function handleEditClick() {
    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries()),
    );

    if (currentParams.get("selectMultipleBlocks") === "true") {
      currentParams.delete("selectMultipleBlocks");
    } else {
      currentParams.set("selectMultipleBlocks", "true");
    }

    router.push(`${pathname}?${currentParams.toString()}`);
  }

  return (
    <>
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-x-auto">
        <TransformWrapper
          initialScale={0.8}
          centerOnInit
          minScale={0.00001}
          limitToBounds={false}
        >
          {({ zoomIn, zoomOut, centerView }) => (
            <>
              <TransformComponent>
                <div className="relative flex h-screen w-screen  items-center justify-center">
                  <div className="grid min-w-[960px] grid-cols-24 gap-0">
                    {renderBlocks}
                  </div>
                </div>
              </TransformComponent>
              <div className="absolute bottom-10 left-1/2 mt-5 flex -translate-x-1/2 flex-col items-center justify-center">
                {selectMultipleBlocksOn && (
                  <>
                    <div className="max-w-screen mx-2 mb-2 overflow-auto rounded-lg bg-white px-3 py-1 text-zinc-950 shadow-lg">
                      Selected Blocks:{" "}
                      {selectedBlocks
                        ? Array.from(selectedBlocks.keys()).join(", ")
                        : "-"}
                    </div>
                    <Button color="emerald" onClick={handleConfirmSelection}>
                      Confirm Selection
                    </Button>{" "}
                  </>
                )}
                <div className="mt-4 flex  items-center justify-center">
                  <div className="flex h-5 items-center justify-center gap-x-3">
                    <Button onClick={() => zoomOut()} fancy="less">
                      -
                    </Button>
                    <Button
                      onClick={() => centerView()}
                      fancy="less"
                      className="group"
                    >
                      <Image
                        className="my-1 group-hover:animate-pulse"
                        width={21}
                        height={21}
                        src="/logo_without_bg.png"
                        alt="Hom3page logo"
                      />
                    </Button>
                    <Button onClick={() => zoomIn()} fancy="less">
                      +
                    </Button>
                  </div>
                </div>

                <button
                  className="pointer-cursor"
                  onClick={() => setWelcomeDialogOpen(true)}
                >
                  <h2 className="mt-6 rounded-lg bg-zinc-950/80 px-4 py-1 tracking-wider text-gray-700 hover:animate-pulse">
                    Explore web3
                  </h2>
                </button>
              </div>
            </>
          )}
        </TransformWrapper>
        <button
          className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center hover:scale-105"
          onClick={handleEditClick}
        >
          <PencilIcon className="h-6 w-6 text-emerald-800" />
        </button>
      </div>
      {editBlockDialogOpen && (
        <EditBlockDialog
          open={editBlockDialogOpen}
          setOpen={handleEditDialogOpen}
          wallData={populatedWallData}
        />
      )}
      <WelcomeDialog open={welcomeDialogOpen} setOpen={setWelcomeDialogOpen} />
    </>
  );
}
