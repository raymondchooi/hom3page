import Image from "next/image";

function AaveFaucet({}) {
  return (
    <button
	aria-label="Aave Faucet"
      className="flex h-full w-full items-center justify-center border-gray-700 active:scale-95"
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
