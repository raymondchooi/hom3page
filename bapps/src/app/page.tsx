import { BappGrid } from "components";

const bApps = [
  {
    id: "text",
    title: "Text",
    description: "Add text to your block",
    image: "/blocks/text.svg",
  },
  {
    id: "image",
    title: "Image",
    description: "Add an image to your block",
    image: "/blocks/image.svg",
  },
  {
    id: "aave-faucet",
    title: "Aave faucet",
    description: "Get free assets to test Aave",
    image: "/blocks/faucet.svg",
  },
  {
    id: "gho",
    title: "GHO",
    description: "Deposit and borrow GHO",
    image: "/blocks/aave.svg",
  },
  {
    id: "nft-slider",
    title: "NFT Slider",
    description: "Display your NFTs on a slider",
    image: "/blocks/slider.svg",
  },
];

export default function HomePage() {
  return (
    <div className="container flex min-h-screen flex-col p-4">
      <h1 className="text-gray-00 text-base tracking-tight">All bApps</h1>

      <BappGrid bApps={bApps} />
    </div>
  );
}
