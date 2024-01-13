"use client";

import Link from "next/link";

import type { BlockData } from "models/BlockData";

interface BlockProps {
  onClick: (id: string) => void;
  blockData: BlockData;
}

export default function Block({ onClick, blockData }: BlockProps) {
  function renderBlock() {
    return (
      <div className="inline-flex h-full w-full items-center justify-center rounded bg-gray-100 p-1  font-bold hover:bg-gray-200">
        <div className="truncate text-xs font-bold text-gray-500">
          {blockData.id}
        </div>
      </div>
    );
  }

  if (blockData?.link) {
    return (
      <Link
        key={blockData.id}
        href={blockData.link}
        className="inline-flex h-10 w-10 cursor-pointer items-center border border-black bg-gray-100 font-bold text-gray-500 hover:border-red-600 hover:bg-gray-200"
      >
        {renderBlock()}
      </Link>
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
