import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "components/carousel";
import { BappSummary } from "components";

interface BappCarouselProps {
  onBappClick: (bappId: string) => void;
}

function BappCarousel({ onBappClick }: BappCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="relative mt-3 w-full max-w-3xl overflow-x-auto"
    >
      <CarouselContent className="-ml-4">
        <CarouselItem className="basis-1/3">
          <BappSummary
            id="text"
            title="Text"
            description="Add text to your block"
            image="/blocks/text.svg"
            onClick={onBappClick}
          />
        </CarouselItem>
        <CarouselItem className="basis-1/3">
          <BappSummary
            id="image"
            title="Image"
            description="Add an image to your block"
            image="/blocks/image.svg"
            onClick={onBappClick}
          />
        </CarouselItem>
        <CarouselItem className="basis-1/3">
          <BappSummary
            id="nft-minter"
            title="Mint NFT"
            description="Mint NFT from your own custom collection"
            image="/blocks/nft_minter.png"
            onClick={onBappClick}
          />
        </CarouselItem>
        <CarouselItem className="basis-1/3">
          <BappSummary
            id="wallLink"
            title="WallLink"
            description="Link to another wall"
            image="/blocks/link.svg"
            onClick={onBappClick}
          />
        </CarouselItem>
        <CarouselItem className="basis-1/3">
          <BappSummary
            id="aaveFaucet"
            title="Aave faucet"
            description="Get free assets to test Aave"
            image="/blocks/faucet.svg"
            onClick={onBappClick}
          />
        </CarouselItem>
        <CarouselItem className="basis-1/3">
          <BappSummary
            id="nftSlider"
            title="NFT Slider"
            description="Display your NFTs on a slider"
            image="/blocks/slider.svg"
            onClick={onBappClick}
          />
        </CarouselItem>
        <CarouselItem className="basis-1/3">
          <BappSummary
            id="gho"
            title="GHO"
            description="Deposit WBTC and borrow GHO"
            image="/blocks/aave.svg"
            onClick={onBappClick}
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}

export default BappCarousel;
