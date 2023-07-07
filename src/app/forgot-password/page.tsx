"use client";
import Header from "@/components/Header";
import { validateEmail } from "@/helpers/validateEmail";
import Loader from "@/utils/Loader";
import axios from "axios";
import { useState } from "react";

export default function ForgotPasswodPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!validateEmail(email)) setMessage("Please enter a valid email !!!");
      else {
        setLoading(true);
        const response = await axios.post("/api/users/sendmail", {
          email,
          emailType: "RESET",
        });
        if (response.data.success) {
          setEmailSent(true);
        }
      }
    } catch (error: any) {
      setMessage(error.response.data.message + " !!!");
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex-1 pt-5 w-full">
        <Header />
      </div>

      {emailSent ? (
        <div className="flex-[5] flex flex-col items-center">
          <h1 className="text-2xl text-green-500 font-bold text-center">
            Email Sent Successfully
          </h1>
          <p className="text-center font-semibold">
            Please check your email inbox to reset your password.
          </p>
        </div>
      ) : (
        <div className="flex-[5] flex flex-col w-full gap-2 items-center pt-10">
          {message && (
            <p className="text-red-500 font-bold text-lg tracking-wide">
              {message}
            </p>
          )}
          <div className="border-4 border-red-400 rounded-3xl w-[90%] md:w-[40%] h-[30vh] p-4 flex flex-col justify-center items-center gap-5">
            <h1 className="text-2xl font-bold">Enter Your Email</h1>
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[75%] outline-none border-b-2 border-red-400 text-xl bg-red-50 py-4 px-4 pb-2"
              type="text"
              placeholder="Enter your email"
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
                Send Email
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

{
  /* <div>
   */
}
