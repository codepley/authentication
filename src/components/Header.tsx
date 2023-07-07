import { BsGithub, BsLinkedin } from "react-icons/bs";

export default function Header() {
  return (
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
  );
}
