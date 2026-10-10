import Image from "next/image";

export default function Home() {
  return (
    // <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <Image
          className="dark:invert h-10 w-auto"
          src="/Logo_Satelcom.webp"
          alt="Logo Satelcom"
          width={100}
          height={20}
          priority
        />
      </main>
    </div>
  );
}
