"use client";
import Image from "next/image";
import { BsGithub, BsLinkedin } from "react-icons/bs";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex-1 mt-5 w-full flex gap-2 flex-col justify-center items-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-wider uppercase">
          Authentication
        </h1>
        <p className="font-bold">
          An <span className="text-red-400">Authentication</span> app using
          Next.js
        </p>
        <div className="flex gap-5">
          <BsGithub className="w-5 h-5 cursor-pointer" />
          <BsLinkedin className="w-5 h-5 cursor-pointer" />
        </div>
      </div>
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
          <div className="bg-red-400 w-[90%] tracking-widest text-center  md:w-[40%] p-4 rounded-lg">Login</div>
          <div className="bg-red-400 w-[90%] tracking-widest text-center md:w-[40%] p-4 rounded-lg">Signup</div>
        </div>
      </div>
    </div>
  );
}
