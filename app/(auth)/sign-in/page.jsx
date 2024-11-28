"use client";

import { useState, useEffect, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { auth } from "@/app/firebase/firebaseConfig";
import handleSocialAuth from "@/utils/handleSocialAuth";
import { Loader } from "lucide-react";
import { AuthContext } from "@/components/AuthProvider"; // Adjust the path

const SignIn = () => {
  const { isLoggedIn } = useContext(AuthContext); // Access `isLoggedIn` and `login` from context
  const router = useRouter();

  const [email, setEmail] = useState(""); // Email state
  const [error, setError] = useState(""); // State to handle error messages
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect if user is logged in
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
      toast.error("Please enter a valid email address!");
      setLoading(false);
      return;
    }

    // Fetch user details from your MongoDB based on the email
    const userResponse = await fetch(`/api/users?email=${email}`, {
      method: "GET",
    });

    const userData = await userResponse.json();

    if (!userResponse.ok) {
      toast.error("Email address is not registered!");
      setEmail("");
      setLoading(false);
      return;
    }

    // Check if the email is verified
    if (!userData.emailVerified) {
      // If email is not verified, send a verification email
      const emailVerificationResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          action: "verify",
        }),
      });

      if (!emailVerificationResponse.ok) {
        toast.error("Failed to send verification email.");
        setLoading(false);
        return;
      }

      toast.error("A verification email has been sent. Please verify your email to proceed.");
      setLoading(false);
      return;
    }

    // If the email is verified, proceed to the password reset page
    localStorage.setItem("email", email);
    setLoading(false);
    router.push("/sign-in/password");

  } catch (err) {
    console.error(err);
    toast.error(err.message || "An error occurred during email validation.");
    setLoading(false);
  }
};

  return (
    <div className="h-[80vh] max-xl:h-screen flex items-center justify-center">
      <div className="p-5 bg-slate-900 rounded-lg w-[90%] sm:w-[90%] md:max-w-[400px] lg:max-w-[500px] mx-auto">
        <h1 className="text-4xl text-white text-center mb-10">Sign in</h1>

        <form onSubmit={validateEmail}>
          <div className="flex flex-col">
            <label className="font-semibold text-sm text-white">Email</label>
            <input
              disabled={loading}
              className="bg-slate-800 rounded-[5px] p-1 mt-2 text-white font-bold"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center text-center w-full p-2 bg-blue-500 text-white font-bold rounded-[5px] mt-5"
          >
            {loading ? <Loader /> : "Login"}
          </button>
          <div className="w-full flex items-center justify-between mt-5">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <h1>Don't have an Account?</h1>
              <Link href="/sign-up" className="text-blue-500 underline">
                Sign up
              </Link>
            </div>
          </div>
        </form>

        <div className="mt-5 flex items-center justify-center">
          <hr className="flex-1 bg-gray-200" />
          <h1 className="text-center text-gray-500 text-sm mx-3">or</h1>
          <hr className="flex-1 bg-gray-200" />
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
      </div>
    </div>
  );
};

export default SignIn;
