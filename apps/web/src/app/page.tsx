import { Wall } from "components";

export default function HomePage() {
  return (
    <main className="absolute left-0 top-0 flex h-screen w-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900 via-violet-950 to-gray-950 text-white">
      <h1 className="sr-only">Hom3page</h1>
      <div className="relative mt-[52px] h-[calc(100vh-52px)] w-screen">
        <Wall />
      </div>
    </main>
  );
}
