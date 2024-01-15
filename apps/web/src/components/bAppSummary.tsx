import Link from "next/link";
import Image from "next/image";

export interface BAppSummaryProps {
  id: string;
  title: string;
  description: string;
  image: string;
}

function BAppSummary({ id, title, description, image }: BAppSummaryProps) {
  return (
    <Link className="group flex cursor-pointer flex-col" href={`/?bApp=${id}`}>
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
    </Link>
  );
}

export default BAppSummary;
