"use client";

import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "../../firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  linkWithCredential,
  getAuth,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import getToken from "@/utils/getToken";

const SignIn = () => {
  const router = useRouter();

  const [selectedForm, setSelectedForm] = useState("Investor"); // Track which form is selected
  const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const [error, setError] = useState(""); // State to handle error messages
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Handle login for form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
      localStorage.setItem("token", token);

      alert("Sign-in successful!");
      router.push("/");
    } catch (err) {
      setError(err.message || "An error occurred during login.");
    }
  };

  const handleSocialAuth = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const email = user.email;

      // Get Firebase Auth instance
      const firebaseAuth = getAuth();

      // Check if email is already associated with email/password sign-in
      const existingSignInMethods = await fetchSignInMethodsForEmail(
        firebaseAuth,
        email
      );

      if (existingSignInMethods.includes("password")) {
        // If the email is already registered with email/password, link the social provider with the existing account
        const credential = provider.credentialFromResult(result);
        await linkWithCredential(user, credential);

        alert("Account linked successfully with your social provider!");
      } else {
        // New user, handle social sign-up as usual
        const role = selectedForm; // Investor or Seeker (or any other role you may have)
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firebaseUid: user.uid,
            email: user.email,
            role,
            completedProfile: false, // Or any other profile logic you may have
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save user to MongoDB.");
        }

        const data = await response.json();
        console.log("User created in MongoDB:", data);

        alert("Sign-up successful!");
      }

      // Generate JWT from backend
      const generateToken = await fetch("/api/auth/generate-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firebaseUid: user.uid,
          email: user.email,
        }),
      });

      if (!generateToken.ok) throw new Error("Failed to generate token.");

      const { token } = await generateToken.json();

      // Store token in localStorage
      localStorage.setItem("token", token);

      // Redirect the user after successful sign-in or sign-up
      router.push("/");
    } catch (err) {
      console.error("Error during social authentication: ", err);
      setError(
        err.message || "An error occurred during social sign-in/sign-up."
      );
    }
  };

  return (
    <div className=" h-[80vh] max-xl:h-screen  flex items-center justify-center">
      <div className="p-5 bg-slate-900  rounded-lg w-[90%]  sm:w-[90%]  md:max-w-[400px] lg:max-w-[500px] mx-auto">
        {/* Radio buttons to select between Investor and Seeker */}
        <div className="flex justify-center gap-4 mb-5 text-white">
          <label className="flex items-center">
            <input
              type="radio"
              name="role"
              value="Investor"
              checked={selectedForm === "Investor"}
              onChange={() => setSelectedForm("Investor")}
              className="mr-2 text-white"
            />
            Investor Sign In
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="role"
              value="Seeker"
              checked={selectedForm === "Seeker"}
              onChange={() => setSelectedForm("Seeker")}
              className="mr-2 font-bold"
            />
            Visa Seeker Sign In
          </label>
        </div>

        {/* Conditionally render the form based on selectedForm */}
        {selectedForm === "Investor" ? (
          <form onSubmit={handleLogin}>
            {" "}
            {/* Use onSubmit instead of onClick */}
            <div className="flex flex-col">
              <label className="font-semibold text-sm text-white">Email</label>
              <input
                className="bg-slate-800 rounded-[5px] p-1 mt-2 text-white"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Bind email to state
              />
            </div>

            <button
              type="submit" // Make sure this is a submit button
              className="flex items-center justify-center text-center w-full p-2 bg-blue-500 text-white font-bold rounded-[5px] mt-5"
            >
              Sign In as Investor
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
              <button className="flex gap-5 items-center w-[80%] p-3 bg-blue-500 text-white rounded-full mx-auto justify-center">
                <FaFacebookF />
                <h1>Continue with Facebook</h1>
              </button>

            </div>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            {" "}
            {/* Use onSubmit instead of onClick */}
            <div className="flex flex-col">
              <label className="font-semibold text-sm text-white">Email</label>
              <input
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
              className="flex items-center justify-center text-center w-full p-2 bg-blue-500 text-white font-bold rounded-[5px] mt-5"
            >
              Sign In as Visa Seeker
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
              <Link
                className="text-blue-400 underline"
                href={"/forget-password"}
              >
                Forgot Password?
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignIn;
