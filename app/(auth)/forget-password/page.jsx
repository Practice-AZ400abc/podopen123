"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import Logo from "../../Lookvisa.png";
import getToken from "@/utils/getToken";
import Link from "next/link";
import { ArrowBigLeft, ArrowLeft } from "lucide-react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      setError("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <div className=" h-screen  flex flex-col items-center justify-center">
      <div className="p-5 bg-slate-900 rounded-lg w-[90%]  sm:w-[90%]  md:max-w-[400px] lg:max-w-[500px] mx-auto">
        <h1 className="text-center font-semibold text-2xl text-white">Forget Password?</h1>
        <p className="text-center font-semibold text-sm text-gray-500 mt-2">No worries, we'll send you reset instruction?</p>

        <div className="mt-2">
          <form onSubmit={handlePasswordReset} className="">
            <div className="flex flex-col">
              <label className="font-semibold text-white text-sm">
                Email
              </label>
              <input
                className="bg-slate-800 text-white rounded-md p-1 mt-2 outline-blue-200"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="flex items-center justify-center text-center w-full p-2 bg-blue-500 text-white font-bold  rounded-md mt-5">
              Reset password
            </button>
          </form>

        </div>
      </div>


      <Link className="mt-5 text-gray-500 underline flex items-center justify-center gap-2" href={"/sign-in"}> <ArrowLeft size={15} /> Back to login</Link>

    </div>
  );
};

export default ForgetPassword;
