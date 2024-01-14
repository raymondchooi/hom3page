"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { HomeIcon } from "@heroicons/react/24/outline";

import { Block, Button } from "components";
import { WALL_TOTAL_BLOCKS } from "constants/wall";
import type { BlockData } from "models/BlockData";

export default function Wall() {
  const params = useParams();

  const wallId = decodeURIComponent(params?.id?.toString() ?? "0")
    .toString()
    .toLowerCase();

  //TODO change to real data
  const renderBlocks = useMemo(() => {
    return (
      <>
        {Array.from(Array(WALL_TOTAL_BLOCKS).keys()).map((i) => {
          const wallIdInt = parseInt(wallId);
          const index =
            wallIdInt === 0 ? i + 1 : i + wallIdInt * WALL_TOTAL_BLOCKS + 1;

          const blockData: BlockData = { id: index.toString() };

          const randomTypeIndex = Math.floor(Math.random() * 4);
          if (randomTypeIndex === 0) {
            blockData.type = "text";
            blockData.content = `Hello  ${index}`;
          } else if (randomTypeIndex === 1) {
            blockData.wallLink = `/${index}`;
            blockData.owner = `0x${index}`;
          } else if (randomTypeIndex === 2) {
            blockData.type = "image";
            blockData.content = "/ateam.png";
          }

          if (i === 212) {
            blockData.type = "profile";
            blockData.isFirstBlock = true;
            blockData.width = 4;
            blockData.height = 4;
          }

          return <Block key={index} blockData={blockData} />;
        })}
      </>
    );
  }, [wallId]);

  return (
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
              <div className="flex h-[calc(100vh-52px)] w-screen  items-center justify-center">
                <div className="grid min-w-[960px] grid-cols-24 gap-0">
                  {renderBlocks}
                </div>
              </div>
            </TransformComponent>
            <div className="absolute bottom-10 left-1/2 mt-5 flex -translate-x-1/2 gap-x-2">
              <Button onClick={() => zoomIn()} color="purple">
                +
              </Button>
              <Button onClick={() => centerView()} color="purple">
                <HomeIcon className="h-5 w-5 text-white" />
              </Button>
              <Button onClick={() => zoomOut()} color="purple">
                -
              </Button>
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
