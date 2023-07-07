"use client";

import Header from "@/components/Header";
import Loader from "@/utils/Loader";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      if (password !== confirmPassword) {
        setMessage("Password do not match !!!");
      } else {
        setLoading(true);
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const emailType = params.get("type");
        const response = await axios.post("/api/users/resetpassword", {
          password,
          token,
          emailType
        });
        if(response.data.success){
          router.push('/login');
        }
      }
    } catch (error: any) {
      console.log(error);
      setMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex-1 pt-5 w-full">
        <Header />
      </div>
      <div className="flex-[5] flex flex-col w-full gap-2 items-center pt-10">
        {message && (
          <p className="text-red-500 font-bold text-lg tracking-wide">
            {message}
          </p>
        )}
        <div className="border-4 border-red-400 rounded-3xl w-[90%] md:w-[40%] min-h-[30vh] p-4 flex flex-col justify-center items-center gap-5">
          <h1 className="text-2xl font-bold">Reset Your Password</h1>
          <input
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[75%] outline-none border-b-2 border-red-400 text-xl bg-red-50 py-4 px-4 pb-2"
            type="password"
            placeholder="Enter your new password"
          />
          <input
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-[75%] outline-none border-b-2 border-red-400 text-xl bg-red-50 py-4 px-4 pb-2"
            type="password"
            placeholder="Confirm your password"
          />

          {loading ? (
            <div className="w-[40%] rounded bg-red-400 py-2 text-white shadow-inner shadow-red-100 uppercase font-bold hover:shadow-md flex items-center justify-center">
              <Loader color={"loader"} />
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-red-400 p-3 rounded-lg w-[40%] text-white font-bold"
            >
              Reset Password
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
