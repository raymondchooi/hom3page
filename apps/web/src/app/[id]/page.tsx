import { Wall } from "components";

export default function WallPage() {
  return (
    <main className="flex min-h-[calc(100vh-52px)] flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1 className="sr-only">Hom3page</h1>
      <Wall />
    </main>
  );
}
