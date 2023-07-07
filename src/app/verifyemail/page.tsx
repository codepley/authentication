"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/utils/Loader";
import Link from "next/link";

export default function VerifyEmail() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const verifymail = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      const emailType = params.get("type");
      // console.log(queryString);
      const response = await axios.post("/api/users/verifyemail", {
        token,
        emailType,
      });
      console.log(response);
      setMessage(response.data.message);
      router.push("/profile");
    } catch (error: any) {
      console.log(error.response.data.message);
      setMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifymail();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex flex-col gap-2 justify-center items-center">
        <Loader color={"red-loader"} />
        <h1 className="font-extrabold text-2xl tracking-wider">
          Verifying Your email...
        </h1>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col gap-2 justify-center items-center">
      <p className="font-extrabold text-2xl tracking-wider">{message}</p>
      <Link href={'/profile'} className="bg-red-400 py-2 px-4 font-semibold text-white tracking-widest rounded">Go Home</Link>
    </div>
  );
}
