import NextImage from "next/image";
import Link from "next/link";

import type { BlockData } from "models/BlockData";

interface ImageProps {
  blockData: BlockData;
}

function Image({ blockData }: ImageProps) {
  const img = blockData?.content?.split("|")?.[0]?.split("img:")[1];
  const alt = blockData?.content?.split("|")?.[1]?.split("alt:")[1];
  const link = blockData?.content?.split("|")?.[2]?.split("link:")[1];

  const isBase64 = (str: string | undefined) => {
    return str?.startsWith("data:");
  };

  const isUrl = (str: string | undefined) => {
    return (
      str?.startsWith("http://") ||
      str?.startsWith("https://") ||
      //TODO remove this placeholder maybe
      str?.startsWith("/")
    );
  };

  const imageElement = img ? (
    isUrl(img) ? (
      <NextImage
        src={img}
        alt={alt ?? "Block image"}
        className="h-full w-full"
        width={40}
        height={40}
      />
    ) : isBase64(img) ? (
      <img src={img} alt={alt ?? "Block image"} className="h-full w-full" />
    ) : null
  ) : null;

  return (
    <>
      {link ? (
        <Link href={link} target="_blank">
          {imageElement}
        </Link>
      ) : (
        imageElement
      )}
    </>
  );
}

export default Image;
