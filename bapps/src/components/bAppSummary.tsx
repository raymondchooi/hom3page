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
    <Link
      className="group relative flex aspect-square cursor-pointer items-start justify-start rounded-lg border-2 border-gray-200 p-2"
      href={`/bapp/${id}`}
    >
      <div className="mr-4 flex-shrink-0">
        <Image
          className="rounded-lg"
          src={image}
          alt={`${title} thumbnail`}
          width={50}
          height={50}
        />
      </div>
      <div>
        <h4 className="text-lg font-bold group-hover:text-purple-800 group-hover:underline">
          {title}
        </h4>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
    </Link>
  );
}

export default BAppSummary;
