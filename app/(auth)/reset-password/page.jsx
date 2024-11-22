"use client";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const ResetPassword = () => {

  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");



  return (
    <div className=" h-screen  flex flex-col items-center justify-center">
      <div className="p-5 bg-slate-900 rounded-lg w-[90%] sm:w-[90%] md:max-w-[400px] lg:max-w-[500px] mx-auto">
        <h1 className="text-center font-semibold text-2xl text-white">
         Reset Password
        </h1>
        <p className="text-center font-semibold text-sm text-gray-500 mt-2">
          Please enter your new password
        </p>

        <div className="mt-2">
          <form onSubmit={""} className="">
            <div className="flex flex-col">
              <label className="font-semibold text-white text-sm">Enter New Password</label>
              <input
                className="bg-slate-800 text-white rounded-md p-1 mt-2 outline-blue-200"
                type="password"
                autoComplete="false"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="font-semibold text-white text-sm mt-5">Re-Enter New Password</label>
              <input
                className="bg-slate-800 text-white rounded-md p-1 mt-2 outline-blue-200"
                type="password"
                autoComplete="false"
                value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              className="flex items-center justify-center text-center w-full p-2 bg-blue-500 text-white font-bold  rounded-md mt-5"
              type="submit"
            >
              Reset password
            </button>
          </form>
          {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>

      <Link
        className="mt-5 text-gray-500 underline flex items-center justify-center gap-2"
        href={"/sign-in"}
      >
        <ArrowLeft size={15} /> Back to login
      </Link>
    </div>
  );
};

export default ResetPassword;
