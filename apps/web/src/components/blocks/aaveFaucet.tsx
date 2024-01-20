import Link from "next/link";
import Image from "next/image";

import type { BlockData } from "models/BlockData";

interface AaveFaucetProps {
  blockData?: BlockData;
}

function AaveFaucet({}: AaveFaucetProps) {
  return (
    <button
	aria-label="Aave Faucet"
      className="flex h-full w-full items-center justify-center border-gray-700"
    >
      <Image
        src={"/blocks/faucet.svg"}
        alt="Wall link"
        width={15}
        height={15}
        className="opacity-70"
      />
    </button>
  );
}

export default AaveFaucet;
