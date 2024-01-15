import { BappGrid } from "components";

const bApps = [
  {
    id: "1",
    title: "bApp 1",
    description: "bApp 1 description",
    image: "https://via.placeholder.com/50",
  },
  {
    id: "2",
    title: "bApp 2",
    description: "bApp 2 description",
    image: "https://via.placeholder.com/50",
  },
  {
    id: "3",
    title: "bApp 3",
    description: "bApp 3 description",
    image: "https://via.placeholder.com/50",
  },
  {
    id: "4",
    title: "bApp 4",
    description: "bApp 4 description",
    image: "https://via.placeholder.com/50",
  },
];

export default function HomePage() {
  return (
    <div className="container flex min-h-screen flex-col p-4">
      <h1 className="text-base tracking-tight text-gray-600">All bApps</h1>

      <BappGrid bApps={bApps} />
    </div>
  );
}
