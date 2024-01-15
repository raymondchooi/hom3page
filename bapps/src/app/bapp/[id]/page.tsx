"use client";

import { useParams } from "next/navigation";

function BappFullPage() {
  const params = useParams();

  const bappId = decodeURIComponent(params?.id?.toString() ?? "0")
    .toString()
    .toLowerCase();

  return (
    <div className="container flex min-h-screen flex-col p-4">
      <h1 className="text-base tracking-tight text-gray-600">{`#${bappId}`}</h1>
      <div>More bapp description</div>
    </div>
  );
}

export default BappFullPage;
