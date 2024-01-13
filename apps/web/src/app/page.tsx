import { Wall } from "components";

export default function HomePage() {
  return (
    <main className="absolute left-0 top-0 flex h-screen w-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1 className="sr-only">Hom3page</h1>
      <div className="relative mt-[52px] h-[calc(100vh-52px)] w-screen">
        <Wall />
      </div>
    </main>
  );
}
