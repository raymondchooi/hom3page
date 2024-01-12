import { Wall } from "components";

export default function HomePage() {
  return (
    <main className="flex h-[calc(100vh-52px)] w-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1 className="sr-only">Hom3page</h1>
      <Wall />
    </main>
  );
}
