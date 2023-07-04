"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiFillHome } from "react-icons/ai";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e:any) => {
   //  console.log(e.target.name);
    setUser({...user, [e.target.name]: e.target.value });
  };

  const handleLogin = (e:any) => {
    e.preventDefault();
   //  console.log(user);
    setUser({email: "", password: ""})
  }

  return (
    <div className="h-screen bg-red-950 flex justify-center items-center">
      <div className="w-[50%] hidden bg-red-400 h-[85%] mt-auto md:flex flex-col justify-around items-center rounded-t-[25%]">
        <h1 className="text-white font-bold text-5xl">Welcome Back!</h1>
        <Image
          src="/loginImg.svg"
          width={500}
          height={500}
          alt="login avatar"
        />
      </div>
      <div className="md:w-[50%] w-[90%] h-[80%] mt-auto flex items-center">
        <div className="bg-white md:w-[90%] w-[100%] flex flex-col items-center h-full rounded-t-[8%] pt-10">
          <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="font-bold text-4xl">Login to your account</h1>
            <p className="font-bold text-gray-600">
              Welcome back to Authentication
            </p>
          </div>
          <form className="mt-16 w-[60%] flex flex-col gap-4" action="">
            <div className="flex flex-col bg-red-50 items-start border-b-2 border-red-400 p-4">
              <label className="text-lg font-semibold" htmlFor="email">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                className="text-2xl font-semibold bg-red-50 outline-none w-full"
                type="email"
                name="email"
                id="email"
                value={user.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex flex-col bg-red-50 items-start border-b-2 border-red-400 p-4">
              <label className="text-lg font-semibold" htmlFor="password">
                Password <span className="text-red-600">*</span>
              </label>
              <input
                className="text-2xl font-semibold bg-red-50 outline-none w-full"
                type="password"
                name="password"
                id="password"
                value={user.password}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <button onClick={handleLogin} className="w-full rounded bg-red-400 text-2xl py-3 text-white shadow-inner shadow-red-100 uppercase font-bold hover:shadow-md">
              Login
            </button>
            <div className="flex flex-col gap-2 justify-center items-center">
              <p className="font-extrabold text-center">
                Dont have an account?{" "}
                <span className="text-red-400">Sign Up</span>
              </p>
              <Link
                href={"/"}
                className="flex gap-1 text-red-400 justify-center items-center font-bold"
              >
                {" "}
                <AiFillHome /> Go to Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
