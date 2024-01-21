import React, { useEffect, useRef } from "react";
import type { BlockData } from "models/BlockData";

interface NFTMinterProps {
  blockData: BlockData;
}

function NFTMinter({ blockData }: NFTMinterProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const nftCollectionID = blockData?.content?.split("nftCollectionID:")?.[1];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeText = () => {
      const fontSize = Math.min(
        container.clientWidth / 5,
        container.clientHeight / 2,
      );
      container.style.fontSize = `${fontSize}px`;
    };

    resizeText();
    window.addEventListener("resize", resizeText);

    return () => {
      window.removeEventListener("resize", resizeText);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full items-center justify-center p-1 text-gray-200"
    >
      <a href={`https://uxz2k-jyaaa-aaaal-adoia-cai.icp0.io/mint?id=${nftCollectionID}`}>
        Mint from NFT collection {nftCollectionID}
      </a>
    </div>
  );
}

export default NFTMinter;
