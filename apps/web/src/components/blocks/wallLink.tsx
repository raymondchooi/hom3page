import Link from "next/link";
import Image from "next/image";

import type { BlockData } from "models/BlockData";

interface WallLinkProps {
  blockData: BlockData;
}

function WallLink({ blockData }: WallLinkProps) {
  return (
    <Link
      href={blockData?.wallLink ?? "/"}
      aria-label={`Go to wall ${blockData?.wallLink ?? "home"}`}
      className="flex h-full w-full items-center justify-center border-gray-700"
    >
      <Image
        src={"/blocks/link.svg"}
        alt="Wall link"
        width={15}
        height={15}
        className="opacity-70"
      />
    </Link>
  );
}

export default WallLink;
