"use client";

import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {toast} from "react-hot-toast" 
import { auth } from "../../firebase/firebaseConfig";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  linkWithCredential,
  getAuth,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import handleSocialAuth from "@/utils/handleSocialAuth";
import getToken from "@/utils/getToken";
import { Loader } from "lucide-react";

const SignIn = () => {
  const router = useRouter();

  const [email, setEmail] = useState(""); // Email state
  const [error, setError] = useState(""); // State to handle error messages
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const validateEmail = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!email) {
        setError("Please enter an email address.");
        toast.error("Please enter a valid email address!")
        return;
      }
      const isRegistered = await fetch(`/api/users?email=${email}`, {
        method: "GET",
      });

      if (!isRegistered.ok) {
        setError("Email address is not registered.");
        toast.error("Please enter a valid email address!")
        setEmail("")
        setLoading(false)
        return;
      }

      localStorage.setItem("email", email);
      setLoading(false);

      router.push("/sign-in/password");
    } catch (err) {
      setError(err.message || "An error occurred during email validation.");
    }
  };

  return (
    <div className=" h-[80vh] max-xl:h-screen  flex items-center justify-center">
      <div className="p-5 bg-slate-900  rounded-lg w-[90%]  sm:w-[90%]  md:max-w-[400px] lg:max-w-[500px] mx-auto">
        <h1 className="text-4xl text-white text-center mb-10">Sign in</h1>

        <form onSubmit={validateEmail}>
          {" "}
          {/* Use onSubmit instead of onClick */}
          <div className="flex flex-col">
            <label className="font-semibold text-sm text-white">Email</label>
            <input
              disabled={loading}
              className="bg-slate-800 rounded-[5px] p-1 mt-2 text-white font-bold"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Bind email to state
            />
          </div>
          <button
            type="submit" // Make sure this is a submit button
            className="flex items-center justify-center text-center w-full p-2 bg-blue-500 text-white font-bold rounded-[5px] mt-5"
          >
            {loading ? (
              <Loader /> // Replace with a spinner component if needed
            ) : (
              `Login`
            )}
          </button>
          <div className="w-full flex items-center justify-between mt-5">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <h1>Don't have an Account?</h1>
              <Link href={"/sign-up"} className="text-blue-500 underline">
                Sign up
              </Link>
            </div>
<<<<<<< HEAD
            <div className="flex items-center gap-5 text-sm text-gray-500">
=======
            <button
              type="submit" // Make sure this is a submit button
              className="flex items-center justify-center text-center w-full p-2 bg-green-500 text-white font-bold rounded-[5px] mt-5"
            >

              {loading ? (
                <Loader />// Replace with a spinner component if needed
              ) : (
                `Continue`
              )}
            </button>
            <div className="w-full flex items-center justify-between mt-5">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <h1>Don't have an Account?</h1>
                <Link href={"/sign-up"} className="text-blue-500 underline">
                  Sign up
                </Link>
              </div>
              <div className="flex items-center gap-5 text-sm text-gray-500">
                <Link
                  href={"/forget-password"}
                  className="text-blue-500 underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-center">
              <hr className="h-3 bg-gray-200" />
              <h1 className="text-center text-gray-500 text-sm">or</h1>
              <hr className="h-3 bg-gray-200" />
            </div>
            <div className="flex flex-col gap-5 w-[90%] m-auto mt-5">
              <button
                className="flex gap-5 items-center w-[80%] p-3 border-white rounded-full mx-auto border justify-center"
                onClick={() => handleSocialAuth(new GoogleAuthProvider())}
              >
                <FcGoogle />
                <h1 className="text-white">Continue with Google</h1>
              </button>
              <button
                className="flex gap-5 items-center w-[80%] p-3 bg-blue-500 text-white rounded-full mx-auto justify-center"
                onClick={() => handleSocialAuth(new FacebookAuthProvider())}
              >
                <FaFacebookF />
                <h1>Continue with Facebook</h1>
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={validateEmail}>
            {" "}
            {/* Use onSubmit instead of onClick */}
            <div className="flex flex-col">
              <label className="font-semibold text-sm text-white">Email</label>
              <input
                disabled={loading}

                className="bg-slate-800 rounded-[5px] p-1 mt-2 text-white"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Bind email to state
              />
            </div>
            <div className="flex gap-2 mt-5 items-center ">
              <input
                className="w-3 h-3 bg-black rounded-full"
                type="checkbox"
              />
              <div className="text-sm text-gray-500">
                Remember me on this Device
              </div>
            </div>

            
            <button
              type="submit" // Make sure this is a submit button
              className="flex items-center justify-center text-center w-full p-2 bg-green-500 text-white font-bold rounded-[5px] mt-5"
            >
               {loading ? (
                <Loader />// Replace with a spinner component if needed
              ) : (
                `Continue`
              )}
            </button>
            <div className="flex items-center w-full justify-between gap-2 mt-5">
              <div className="flex items-center gap-2">
                <h1 className="text-sm text-gray-400">
                  Don't have an Account?
                </h1>
                <Link
                  className="text-sm text-blue-400 underline"
                  href={"/sign-up"}
                >
                  Sign up
                </Link>
              </div>
>>>>>>> ca263d1 (Fixes)
              <Link
                href={"/forget-password"}
                className="text-blue-500 underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-center">
            <hr className="h-3 bg-gray-200" />
            <h1 className="text-center text-gray-500 text-sm">or</h1>
            <hr className="h-3 bg-gray-200" />
          </div>
          <div className="flex flex-col gap-5 w-[90%] m-auto mt-5">
            <button
              className="flex gap-5 items-center w-[80%] p-3 border-white rounded-full mx-auto border justify-center"
              onClick={() => handleSocialAuth(new GoogleAuthProvider())}
            >
              <FcGoogle />
              <h1 className="text-white">Continue with Google</h1>
            </button>
            <button
              className="flex gap-5 items-center w-[80%] p-3 bg-blue-500 text-white rounded-full mx-auto justify-center"
              onClick={() => handleSocialAuth(new FacebookAuthProvider())}
            >
              <FaFacebookF />
              <h1>Continue with Facebook</h1>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
