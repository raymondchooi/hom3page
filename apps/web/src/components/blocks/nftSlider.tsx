"use client";

import Image from "next/image";

import { type BlockData } from "models/BlockData";

interface NFTSliderProps {
  blockData: BlockData;
}

function NFTSlider({ blockData }: NFTSliderProps) {
  return (
    <>
      <button
        type="button"
        className="flex h-full w-full cursor-pointer items-center justify-center rounded-none bg-gray-800"
      >
        <Image
          className="opacity-70"
          src="/logo_without_bg.png"
          alt="Hom3page Logo"
          width={15}
          height={15}
        />
      </button>
    </>
  );
}

export default NFTSlider;
