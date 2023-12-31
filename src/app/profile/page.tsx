"use client";
import axios from "axios";
import Image from "next/image";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/utils/Loader";
import { sendMail } from "@/helpers/mailer";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile]: any = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      // console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/me");
      setProfile(response.data.user);
      // console.log(response.data.user);
    } catch (error: any) {
      // console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async () => {
    try {
      // const response = await sendMail({email: profile.email, emailType: 'VERIFY', userId: profile.id});
      // console.log(response);
      setLoading(true);
      const response = await axios.post("/api/users/sendmail", {
        email: profile.email,
        emailType: "VERIFY",
      });
      // console.log("after api call");
      // console.log(response);
      getUser();
    } catch (error: any) {
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log("in profile useEffect");
    getUser();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex gap-4 flex-col justify-center items-center">
        <Loader color={"red-loader"} />
        <p className="font-bold text-2xl">Loading...</p>
      </div>
    );
  }

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
          <Link href={'https://github.com/codepley/authentication.git'}><BsGithub className="w-5 h-5 cursor-pointer" /></Link>
          <Link href={'https://www.linkedin.com/in/kushal-karan/'}><BsLinkedin className="w-5 h-5 cursor-pointer" /></Link>
        </div>
      </div>

      {/* body section with image and welcome screen */}
      <div className="h-full flex">
        <div className="w-[40%] hidden md:flex justify-center items-center">
          <Image
            src={"/welcome.svg"}
            width={250}
            height={250}
            alt="Picture of the author"
          />
        </div>

        <div className="w-[100%] md:w-[60%] flex flex-col items-center justify-center gap-5">
          <div className="flex flex-col w-[80%] justify-center items-center gap-1">
            <h1 className="font-bold text-5xl text-center">
              Hello! <span className="text-red-400 capitalize">{profile.name}</span>
            </h1>
            <p className="capitalize text-lg font-semibold">
              welcome to authentication
            </p>
            <div className="h-[2px] rounded-t-[100%] rounded-b-[100%] w-[70%] bg-red-400"></div>
          </div>

          <div>
            {profile.isVerified ? (
              <p className="uppercase text-2xl font-bold tracking-widest text-green-500">
                Email Verified
              </p>
            ) : (
              <p className="uppercase text-2xl font-bold tracking-widest text-gray-400">
                unverified
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1 justify-center items-center w-full">
            {!profile.isVerified && (
              <div className="flex flex-col gap-1 justify-center items-center w-full">
                <p className="capitalize text-lg font-semibold">
                  click below to verify your email
                </p>
                {profile.verifyToken ? (
                  <button className="bg-gray-400 w-[90%] tracking-widest text-center  md:w-[40%] p-4 rounded-lg text-white font-bold cursor-not-allowed">
                    Verification Pending - Check Your Email
                  </button>
                ) : loading ? (
                  <div className="w-[90%] md:w-[40%] rounded bg-red-400 py-2 text-white shadow-inner shadow-red-100 uppercase font-bold hover:shadow-md flex items-center justify-center">
                    <Loader color={"loader"} />
                  </div>
                ) : (
                  <button
                    onClick={verifyEmail}
                    className="bg-red-400 w-[90%] tracking-widest text-center  md:w-[40%] p-4 rounded-lg text-white font-bold"
                  >
                    Verify Email
                  </button>
                )}
              </div>
            )}

            {loading ? (
              <div className="w-[90%] md:w-[40%] rounded bg-red-400 py-2 text-white shadow-inner shadow-red-100 uppercase font-bold hover:shadow-md flex items-center justify-center">
                <Loader color={"loader"} />
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className=" border-4 mt-2 border-red-400 w-[90%] tracking-widest text-center  md:w-[40%] p-3 rounded-lg text-red-400 font-bold hover:bg-red-400 hover:text-white"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
