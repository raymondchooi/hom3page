import Image from "next/image";

function LoadingScreen() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-zinc-900">
      <Image
        className="animate-pulse"
        src="/logo_with_text.png"
        alt="Hom3page Logo"
        width={200}
        height={200}
      />
    </div>
  );
}

export default LoadingScreen;
