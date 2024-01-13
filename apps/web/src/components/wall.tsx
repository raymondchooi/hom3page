"use client";

import { useParams } from "next/navigation";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { Block, Button } from "components";

const WALL_TOTAL_BLOCKS = 288;

export default function Wall() {
  const params = useParams();

  const wallId = decodeURIComponent(params?.id?.toString() ?? "1")
    .toString()
    .toLowerCase();

  function renderBlocks() {
    return (
      <>
        {Array.from(Array(WALL_TOTAL_BLOCKS).keys()).map((i) => {
          const index = Math.max(i, 1) * parseInt(wallId);
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
    <div className="flex h-full w-full flex-col items-center justify-center overflow-x-hidden py-2">
      <TransformWrapper initialScale={0.5} centerOnInit minScale={0.00001}>
        {({ zoomIn, zoomOut }) => (
          <>
            <TransformComponent>
              <div className="grid-cols-24 grid text-center">
                {renderBlocks()}
              </div>
            </TransformComponent>
            <div className="mt-5 flex gap-x-2">
              <Button onClick={() => zoomIn()} color="purple">
                +
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

// className="flex h-full w-full flex-col items-center justify-center overflow-x-hidden bg-green-200 py-2"
