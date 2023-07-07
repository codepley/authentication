"use client";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Header />

      <div className="flex-[4] flex-col md:flex-row w-full flex justify-around items-center">
        <div className="flex-1 md:flex justify-center items-center hidden">
          <Image
            src={"/hello.svg"}
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>
        <div className="flex-auto md:flex-1 w-full pt-5 md:pt-0 font-bold uppercase flex flex-col gap-5 items-center text-white">
          <Link href={'/login'} className="bg-red-400 w-[90%] tracking-widest text-center  md:w-[40%] p-4 rounded-lg">Login</Link>
          <Link href={'/signup'} className="bg-red-400 w-[90%] tracking-widest text-center md:w-[40%] p-4 rounded-lg">Signup</Link>
        </div>
      </div>

    </div>
  );
}
