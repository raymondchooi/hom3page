"use client";

import Image from "next/image";
import BAppModal from "./bAppModal";
import { useState } from "react";

export interface BAppSummaryProps {
  id: string;
  title: string;
  description: string;
  image: string;
  customOnClick?: (bAppId: string) => void;
  customSize?: number;
  url?: string;
}

function BAppSummary({
  id,
  title,
  description,
  image,
  customOnClick,
  customSize,
  url,
}: BAppSummaryProps) {
  function handleClick() {
    customOnClick && customOnClick(id);
    if (url) {
      setIsOpen(true);
    }
  }

  const size = customSize ?? 30;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
        <BAppModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {url && <iframe src={url} style={{ width: "700px", height: "700px" }} />}
        </BAppModal>
      <button
        className="group flex cursor-pointer flex-col rounded-lg border border-zinc-800 p-3 text-gray-400"
        onClick={handleClick}
      >
        <div className="flex items-center">
          <div className="mr-4 flex-shrink-0">
            <Image
              className="rounded-lg"
              src={image}
              alt={`${title} thumbnail`}
              width={size}
              height={size}
            />
          </div>

          <h4 className="text-base font-bold group-hover:text-gray-400 group-hover:underline">
            {title}
          </h4>
        </div>

        <p className="mt-3 w-full text-xs">{description}</p>
      </button>
    </>
  );
}

export default BAppSummary;
