"use client";
import { useState } from "react";
import Image from "next/image";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import Logo from "../../Lookvisa.png";
import getToken from "@/utils/getToken";

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
    <div className="bg-white h-screen bg-gray-50 flex items-center justify-center">
      <div className="p-5 bg-white rounded-lg w-[90%] border sm:w-[90%]  md:max-w-[400px] lg:max-w-[500px] mx-auto">
        <Image src={Logo} alt="Logo" width={200} height={100} />
        <div className="mt-10">
          <form onSubmit={handlePasswordReset} className="">
            <div className="flex flex-col">
              <label className="font-semibold text-sm">
                Please enter your Email
              </label>
              <input
                className="bg-gray-50 rounded-md p-1 mt-2 outline-blue-200"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="flex items-center justify-center text-center w-full p-2 bg-blue-500 text-white font-bold  rounded-md mt-5">
              Send Password Reset Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
