"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import getToken from "@/utils/getToken";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const EnterPassword = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility
  const [password, setPassword] = useState(""); // Password state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (!email) {
      router.push("/login");
    }

    setEmail(email);
  }, [email, router]);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password) {
      setError("Password is required");
      toast.error("Password is required");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Generate JWT by hitting the backend endpoint
      const response = await fetch("/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firebaseUid: user.uid,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate token.");

      const { token } = await response.json();

      // Store the token in localStorage
      toast.success("You are logged in Successfully!")
      localStorage.setItem("token", token);
      localStorage.removeItem("email");
      router.push("/");
    } catch (error) {
      setError("Please enter a valid password");
      toast.error("Please enter a valid password");
    }
  };

  return (
    <div className=" h-screen flex flex-col items-center justify-center">
      <div className="p-5 bg-slate-900 rounded-lg w-[90%] sm:w-[90%] md:max-w-[400px] lg:max-w-[500px] mx-auto">
        <h1 className="text-4xl text-white text-center mb-10">Password</h1>

        <div className="mt-2">
          <form onSubmit={handleLogin} className="">
            <div className="flex flex-col">
              <label className="font-semibold text-white text-sm">
                Please enter Password
              </label>
              <div className="w-full relative">
                <input
                  className={`text-white rounded-[5px] p-1 mt-2 outline-blue-200 bg-slate-800 w-full ${
                    error ? "outline-red-500" : ""
                  }`}
                  type={passwordVisible ? "text" : "password"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(""); // Clear the error when user starts typing
                  }}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-4 text-sm font-semibold text-blue-500"
                >
                  {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center text-center w-full p-2 bg-blue-500 text-white font-bold rounded-md mt-5"
            >
              Log in
            </button>
          </form>
        </div>
        <div className="mt-4 flex items-center justify-end w-full">
          <Link className="text-blue-500 underline" href={"/forget-password"}>
            Forget Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnterPassword;
