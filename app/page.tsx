import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center w-full text-white">
      <h1 className="text-8xl font-bold">Hello, Next.js!</h1>
      <p className="mt-6 text-5xl">
        <Link href={"/weather"} className="text-5xl text-blue-200 underline">
          天気ページへ移動
        </Link>
      </p>
    </div>
  );
}

