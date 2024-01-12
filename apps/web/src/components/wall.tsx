"use client";

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
    <div className="flex flex-col items-center justify-center py-2">
      <div className="flex flex-1 flex-col items-center justify-center px-20 text-center">
        {renderBlocks()}
      </div>
    </div>
  );
}
