"use client";

import Image from "next/image";

export interface BAppSummaryProps {
  id: string;
  title: string;
  description: string;
  image: string;
  onClick?: (bAppId: string) => void;
}

function BAppSummary({
  id,
  title,
  description,
  image,
  onClick,
}: BAppSummaryProps) {
  function handleClick() {
    onClick && onClick(id);
  }

  return (
    <button
      className="group flex h-full cursor-pointer flex-col justify-between rounded-lg border border-zinc-800 p-3 text-gray-400"
      onClick={handleClick}
    >
      <div className="flex items-center">
        <div className="mr-4 flex-shrink-0">
          <Image
            className="rounded-lg"
            src={image}
            alt={`${title} thumbnail`}
            width={30}
            height={30}
          />
        </div>

        <h4 className="text-base font-bold group-hover:text-gray-400 group-hover:underline">
          {title}
        </h4>
      </div>
      <div className="flex h-full items-center justify-center">
        <p className="mt-3 w-full text-xs">{description}</p>
      </div>
    </button>
  );
}

export default BAppSummary;
