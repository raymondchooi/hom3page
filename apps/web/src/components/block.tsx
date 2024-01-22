"use client";

import Link from "next/link";

import type { BlockData } from "models/BlockData";
import Available from "./blocks/available";
import WallLink from "./blocks/wallLink";
import Profile from "./blocks/profile";
import Text from "./blocks/text";
import ImageBlock from "./blocks/image";
import AaveFaucet from "./blocks/aaveFaucet";
import GHOBurrow from "./blocks/ghoBorrow";
import NFTMinter from "./blocks/nftMinter";

interface BlockProps {
  blockData: BlockData;
  editing?: boolean;
}

export default function Block({ blockData, editing }: BlockProps) {
  // TODO move this to a shared place
  function renderBlock() {
    if (blockData?.type === "profile") return <Profile blockData={blockData} />;
    else if (blockData?.type === "text") return <Text blockData={blockData} />;
    else if (blockData?.type === "image")
      return <ImageBlock blockData={blockData} />;
    else if (blockData?.type === "nft-minter")
      return <NFTMinter blockData={blockData} />;
    else if (blockData?.type === "wallLink")
      return <WallLink blockData={blockData} />;
    else if (blockData?.type === "aaveFaucet") return <AaveFaucet />;
    else if (blockData?.type === "gho")
      return <GHOBurrow blockData={blockData} />;
    else if (editing)
      return (
        <Text blockData={{ id: blockData.id, content: blockData.content }} />
      );

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

  return <>{renderBlock()}</>;
}
