import Image from "next/image";
import { BsGithub, BsLinkedin } from "react-icons/bs";

export default function ProfilePage() {
  return (
    // main div
    <div className="h-screen flex flex-col">
      {/* header section */}
      <div className="h-[30%] w-full pt-5 flex gap-2 flex-col justify-center items-center">
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

      {/* body section with image and welcome screen */}
      <div className="h-full flex">
        <div className="w-[40%] flex justify-center items-center">
          <Image
            src={"/welcome.svg"}
            width={250}
            height={250}
            alt="Picture of the author"
          />
        </div>

        <div className="w-[60%] flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col w-[80%] justify-center items-center gap-1">
            <h1 className="font-bold text-5xl text-center">
              Hello! <span className="text-red-400">Kushal</span>
            </h1>
            <p className="capitalize text-lg font-semibold">welcome to authentication</p>
            <div className="h-[2px] rounded-t-[100%] rounded-b-[100%] w-[70%] bg-red-400"></div>
          </div>
          
          <div className="flex flex-col gap-1 justify-center items-center w-full">
            <p className="capitalize text-lg font-semibold">
              click below to verify your email
            </p>
            <button className="bg-red-400 w-[90%] tracking-widest text-center  md:w-[40%] p-4 rounded-lg text-white font-bold">
              Verify Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
