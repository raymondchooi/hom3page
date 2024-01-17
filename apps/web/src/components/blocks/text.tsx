import React, { useEffect, useRef } from "react";
import type { BlockData } from "models/BlockData";

interface TextProps {
  blockData: BlockData;
}

function Text({ blockData }: TextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

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
      {blockData?.content ?? ""}
    </div>
  );
}

export default Text;
