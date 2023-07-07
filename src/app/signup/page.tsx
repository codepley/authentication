"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import axios from "axios";
import { validateEmail } from "@/helpers/validateEmail";
import { useRouter } from "next/navigation";
import Loader from "@/utils/Loader";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
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

  const handleSignup = async (e: any) => {
    try {
      e.preventDefault();
      setLoading(true);
      const isValidEmail = validateEmail(user.email);
      if (!isValidEmail) {
        setError("Please enter a valid email!!!");
      } else {
        setError("");
        console.log(isValidEmail);
        const response = await axios.post("/api/users/signup", user);
        // const ;
        console.log(response);
        router.push("/login");
      }
    } catch (error: any) {
      console.log(error.response);
      setError(error.response.data.message + "!!!");
    } finally {
      setUser({ email: "", password: "", name: "" });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.name.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="h-screen bg-red-950 flex flex-row-reverse justify-center items-center">
      <div className="w-[50%] hidden bg-red-400 h-[85%] mt-auto md:flex flex-col justify-around items-center rounded-t-[25%]">
        <h1 className="text-white font-bold text-3xl">
          Register to Authentication
        </h1>
        <Image
          src="/signupImg.svg"
          width={500}
          height={500}
          alt="login avatar"
        />
      </div>
      <div className="md:w-[50%] w-[90%] h-[90%] mt-auto flex justify-end items-center">
        <div className="bg-white md:w-[90%] w-[100%] flex flex-col items-center h-full rounded-t-[8%] pt-10">
          <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="font-bold text-4xl">Signup</h1>
            <p className="font-bold text-gray-600">Enter Your Details</p>
          </div>
          <form className="mt-16 w-[60%] flex flex-col gap-4" action="">
            <div className="flex items-center justify-center">
              <p className="text-red-500 font-bold">{error}</p>
            </div>
            <div className="flex flex-col bg-red-50 items-start border-b-2 border-red-400 px-4 pt-4 pb-2">
              <label className="text-lg font-semibold" htmlFor="name">
                Name <span className="text-red-600">*</span>
              </label>
              <input
                className="text-xl capitalize font-semibold bg-red-50 outline-none w-full"
                type="text"
                name="name"
                id="name"
                value={user.name}
                onChange={(e) => handleChange(e)}
              />
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
              onClick={handleSignup}
              className={`w-full rounded ${
                buttonDisabled ? "bg-gray-400" : "bg-red-400"
              } text-2xl py-3 text-white shadow-inner shadow-red-100 uppercase font-bold hover:shadow-md`}
              disabled={buttonDisabled}
            >
              Signup
            </button>)}

            <div className="flex flex-col gap-2 justify-center items-center">
              <p className="font-extrabold text-center">
                Already Registered ?{" "}
                <Link href={"/login"} className="text-red-400">
                  Login
                </Link>
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
