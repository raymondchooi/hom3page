import Image from "next/image";
import { useAccount } from "wagmi";

function AaveFaucet({}) {
  const { isConnected, address } = useAccount();

  // Add mint Faucet logic

  return (
    <button
      aria-label="Aave Faucet"
      className="active:animate-spin flex h-full w-full items-center justify-center border-gray-700 active:scale-95"
    >
      <Image
        src={"/blocks/faucet.svg"}
        alt="Wall link"
        width={20}
        height={20}
        className="opacity-70"
      />
    </button>
  );
}

export default AaveFaucet;
