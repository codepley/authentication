"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import axios from "axios";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/helpers/validateEmail";
import Loader from "@/utils/Loader";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    //  console.log(e.target.name);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: any) => {
    try {
      e.preventDefault();
      setLoading(true);
      const isValidEmail = validateEmail(user.email);
      if (!isValidEmail) {
        setError("Please enter a valid email!!!");
      } else {
        setError("");
        // console.log(isValidEmail);
        const response = await axios.post("/api/users/login", user);
        // const ;
        // console.log(response);
        router.push("/profile");
      }
    } catch (error:any) {
      // console.log(error.response);
      setError(error.response.data.message + '!!!');
    } finally {
      setUser({ email: "", password: "" });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

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
            <h1 className="font-bold text-4xl text-center">Login to your account</h1>
            <p className="font-bold text-gray-600">
              Welcome back to Authentication
            </p>
          </div>
          <form className="mt-16 w-[60%] flex flex-col gap-4" action="">
            <div className="flex items-center justify-center">
              <p className="text-red-500 font-bold">{error}</p>
            </div>
            <div className="flex flex-col bg-red-50 items-start border-b-2 border-red-400 px-4 pt-4 pb-2">
              <label className="text-lg font-semibold" htmlFor="email">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                className="text-xl font-semibold bg-red-50 outline-none w-full"
                type="email"
                name="email"
                id="email"
                value={user.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex flex-col bg-red-50 items-start border-b-2 border-red-400 px-4 pt-4 pb-2">
              <label className="text-lg font-semibold" htmlFor="password">
                Password <span className="text-red-600">*</span>
              </label>
              <input
                className="text-xl font-semibold bg-red-50 outline-none w-full"
                type="password"
                name="password"
                id="password"
                value={user.password}
                onChange={(e) => handleChange(e)}
              />
            </div>

            {loading ? (<div className="w-full rounded bg-red-400 py-2 text-white shadow-inner shadow-red-100 uppercase font-bold hover:shadow-md flex items-center justify-center"><Loader color={'loader'} /></div>) : (<button
              onClick={handleLogin}
              className={`w-full rounded ${
                buttonDisabled ? "bg-gray-400" : "bg-red-400"
              } text-2xl py-3 text-white shadow-inner shadow-red-100 uppercase font-bold hover:shadow-md`}
              disabled={buttonDisabled}
            >
              Login
            </button>)}

            <div className="flex flex-col gap-1 justify-center items-center">
              <p className="font-extrabold text-center">
                Dont have an account?{" "}
                <Link href={"/signup"} className="text-red-400">
                  Sign Up
                </Link>
              </p>
              <Link href={"/forgot-password"} className="font-semibold text-gray-500 hover:text-red-400 cursor-pointer">Forgot Password?</Link>
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
