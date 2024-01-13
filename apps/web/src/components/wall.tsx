"use client";

import { useParams } from "next/navigation";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { HomeIcon } from "@heroicons/react/24/outline";

import { Block, Button } from "components";
import { WALL_TOTAL_BLOCKS } from "constants/wall";

export default function Wall() {
  const params = useParams();
  0;

  const wallId = decodeURIComponent(params?.id?.toString() ?? "0")
    .toString()
    .toLowerCase();

  //TODO change to real data
  function renderBlocks() {
    return (
      <>
        {Array.from(Array(WALL_TOTAL_BLOCKS).keys()).map((i) => {
          const wallIdInt = parseInt(wallId);
          const index =
            wallIdInt === 0 ? i + 1 : i + wallIdInt * WALL_TOTAL_BLOCKS + 1;
          return (
            <Block
              key={index}
              blockData={{ id: index.toString(), link: `/${index}` }}
              onClick={(id) => console.log(id)}
            />
          );
        })}
      </>
    );
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-x-auto">
      <TransformWrapper
        initialScale={0.8}
        centerOnInit
        minScale={0.00001}
        limitToBounds={false}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <TransformComponent>
              <div className="flex h-screen w-screen  items-center justify-center">
                <div className="grid-cols-24 grid min-w-[960px] gap-0">
                  {renderBlocks()}
                </div>
              </div>
            </TransformComponent>
            <div className="absolute bottom-10 left-1/2 mt-5 flex -translate-x-1/2 gap-x-2">
              <Button onClick={() => zoomIn()} color="purple">
                +
              </Button>
              <Button onClick={() => resetTransform()} color="purple">
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
