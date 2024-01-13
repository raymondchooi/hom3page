import Link from "next/link";

import type { BlockData } from "models/BlockData";

interface WallLinkProps {
  blockData: BlockData;
}

function WallLink({ blockData }: WallLinkProps) {
  return (
    <Link
      href={blockData?.wallLink ?? "/"}
      aria-label={`Go to wall ${blockData?.wallLink ?? "home"}`}
      className="grid h-full w-full grid-cols-3 grid-rows-3 border border-gray-300"
    >
      <div className="border border-gray-300"></div>
      <div className="border border-gray-300"></div>
      <div className="border border-gray-300"></div>
      <div className="border border-gray-300"></div>
      <div className="border border-gray-300"></div>
      <div className="border border-gray-300"></div>
      <div className="border border-gray-300"></div>
      <div className="border border-gray-300"></div>
      <div className="border border-gray-300"></div>
    </Link>
  );
}

export default WallLink;
