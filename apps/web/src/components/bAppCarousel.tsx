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
      className="mt-2 w-full"
    >
      <CarouselContent>
        <CarouselItem className="basis-1/3">
          <div className="flex cursor-pointer items-start justify-start rounded-lg border border-gray-200 p-2">
            <BappSummary
              id="1"
              title="Text"
              description="Add text to your block"
              image="/logo_plain.jpg"
              onClick={onBappClick}
            />
          </div>
        </CarouselItem>
        <CarouselItem className="basis-1/3">
          <div className="flex cursor-pointer items-start justify-start rounded-lg border border-gray-200 p-2">
            <BappSummary
              id="2"
              title="Image"
              description="Add an image to your block"
              image="/logo_plain.jpg"
              onClick={onBappClick}
            />
          </div>
        </CarouselItem>
        <CarouselItem className="basis-1/3">
          <div className="flex cursor-pointer items-start justify-start rounded-lg border border-gray-200 p-2">
            <BappSummary
              id="3"
              title="Text2"
              description="Add text2 to your block"
              image="/logo_plain.jpg"
              onClick={onBappClick}
            />
          </div>
        </CarouselItem>
        <CarouselItem className="basis-1/3">
          <div className="flex cursor-pointer items-start justify-start rounded-lg border border-gray-200 p-2">
            <BappSummary
              id="4"
              title="Text3"
              description="Add text3 to your block"
              image="/logo_plain.jpg"
              onClick={onBappClick}
            />
          </div>
        </CarouselItem>
        <CarouselItem className="basis-1/3">
          <div className="flex cursor-pointer items-start justify-start rounded-lg border border-gray-200 p-2">
            <BappSummary
              id="5"
              title="Text4"
              description="Add text4 to your block"
              image="/logo_plain.jpg"
              onClick={onBappClick}
            />
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}

export default BappCarousel;
