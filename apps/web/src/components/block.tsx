"use client";

import Link from "next/link";

import type { BlockData } from "models/BlockData";
import Available from "./blocks/available";
import WallLink from "./blocks/wallLink";
import Profile from "./blocks/profile";
import Text from "./blocks/text";
import { BLOCK_WIDTH, BLOCK_HEIGHT } from "constants/block";
import { cn } from "utils/tailwind";

interface BlockProps {
  blockData: BlockData;
}

export default function Block({ blockData }: BlockProps) {
  function renderBlock() {
    if (blockData?.type === "profile") return <Profile blockData={blockData} />;
    else if (blockData?.type === "text") return <Text blockData={blockData} />;
    else if (!!blockData?.wallLink) return <WallLink blockData={blockData} />;

    return <Available blockData={blockData} />;
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
    <div key={blockData.id} className={cn("relative")}>
      <div
        className={cn(
          "cursor-pointer border border-black bg-gray-100 font-bold text-gray-500 hover:border-red-600 hover:bg-gray-200 ",
          blockData?.isFirstBlock
            ? "absolute left-0 top-0 z-10 flex overflow-visible"
            : "z-0",
        )}
        style={{
          width: BLOCK_WIDTH * (blockData?.width ?? 1),
          height: BLOCK_HEIGHT * (blockData?.height ?? 1),
        }}
      >
        {renderBlock()}
      </div>
    </div>
  );
}
