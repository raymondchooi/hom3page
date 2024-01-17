import Image from "next/image";

export interface BAppSummaryProps {
  id: string;
  title: string;
  description: string;
  image: string;
  onClick?: (bAppId: string) => void;
}

function BAppSummary({
  id,
  title,
  description,
  image,
  onClick,
}: BAppSummaryProps) {
  function handleClick() {
    onClick && onClick(id);
  }

  return (
    <button
      className="group flex cursor-pointer flex-col"
      onClick={handleClick}
    >
      <div className="flex items-center">
        <div className="mr-4 flex-shrink-0">
          <Image
            className="rounded-lg"
            src={image}
            alt={`${title} thumbnail`}
            width={30}
            height={30}
          />
        </div>

        <h4 className="text-base font-bold group-hover:text-purple-800 group-hover:underline">
          {title}
        </h4>
      </div>

      <p className="mt-1 w-full text-sm text-gray-600">{description}</p>
    </button>
  );
}

export default BAppSummary;
