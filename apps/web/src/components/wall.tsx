"use client";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { Block } from "components";

export default function Wall() {
  function renderBlocks() {
    return (
      <div className="flex flex-wrap justify-center">
        {Array.from(Array(288).keys()).map((i) => (
          <Block
            key={i}
            blockData={{ id: i.toString() }}
            onClick={(id) => console.log(id)}
          />
        ))}
      </div>
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
            <div>
              <button onClick={() => zoomIn()}>+</button>
              <button onClick={() => zoomOut()}>-</button>
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}

// className="flex h-full w-full flex-col items-center justify-center overflow-x-hidden bg-green-200 py-2"
