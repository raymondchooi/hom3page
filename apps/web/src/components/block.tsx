"use client";

import type { BlockData } from "models/BlockData";

interface BlockProps {
  onClick: (id: string) => void;
  blockData: BlockData;
}

export default function Block({ onClick, blockData }: BlockProps) {
  function renderBlock() {
    return (
      <div className="inline-flex h-full w-full items-center justify-center rounded bg-gray-100 text-xs font-bold text-gray-500 hover:bg-gray-200">
        {blockData.id}
      </div>
    );
  }

  return (
    <button
      key={blockData.id}
      className="inline-flex h-10 w-10 cursor-pointer items-center border border-black bg-gray-100 font-bold text-gray-500 hover:border-red-600 hover:bg-gray-200"
      onClick={() => onClick(blockData.id)}
    >
      {renderBlock()}
    </button>
  );
}
