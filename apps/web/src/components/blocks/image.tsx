import NextImage from "next/image";

import type { BlockData } from "models/BlockData";

interface ImageProps {
  blockData: BlockData;
}

function Image({ blockData }: ImageProps) {
  return (
    <NextImage
      src={blockData?.content ?? ""}
      alt={blockData?.id ?? ""}
      className="h-full w-full"
      width={40}
      height={40}
    />
  );
}

export default Image;
