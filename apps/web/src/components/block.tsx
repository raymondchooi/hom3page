"use client";

import Link from "next/link";

import type { BlockData } from "models/BlockData";
import Available from "./blocks/available";
import WallLink from "./blocks/wallLink";

interface BlockProps {
  blockData: BlockData;
}

export default function Block({ blockData }: BlockProps) {
  function renderBlock() {
    if (!blockData?.owner) return <Available blockData={blockData} />;
    if (!!blockData?.wallLink) return <WallLink blockData={blockData} />;

    return (
      <div className="inline-flex h-full w-full items-center justify-center rounded bg-gray-100 p-1 font-bold hover:bg-gray-200">
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
    <div
      key={blockData.id}
      className="inline-flex h-10 w-10 cursor-pointer items-center border border-black bg-gray-100 font-bold text-gray-500 hover:border-red-600 hover:bg-gray-200"
    >
      {renderBlock()}
    </div>
  );
}
