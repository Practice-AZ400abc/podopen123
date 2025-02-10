"use client";

import { useState, useEffect, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import handleSocialAuth from "@/utils/handleSocialAuth";
import { Loader } from "lucide-react";
import Logo from "../../Lookvisa.png";
import { AuthContext } from "@/components/AuthProvider";
import Image from "next/image";

const SignIn = () => {
  const { isLoggedIn, login } = useContext(AuthContext); // Access `isLoggedIn` and `login` from context
  const router = useRouter();

  const [redirectPath, setRedirectPath] = useState("/"); // State to store the redirect path

  const [email, setEmail] = useState(""); // Email state
  const [error, setError] = useState(""); // State to handle error messages
  const [emailNotVerified, setEmailNotVerified] = useState(false); // State to handle
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const redirectPathInStorage = localStorage.getItem("redirect");
    if (redirectPathInStorage) {
      setRedirectPath(redirectPathInStorage);
    }
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
        toast.error("Please enter a valid email address!");
        setLoading(false);
        return;
      }

      // Fetch user details from your MongoDB based on the email
      const userResponse = await fetch(`/api/users?email=${email}`, {
        method: "GET",
      });

      const userData = await userResponse.json();

      if (redirectPath === "/checkout" && userData.role !== "Visa Sponsor") {
        toast.error("You are not a Visa Sponsor! Please sign in as a Visa Sponsor");
        setEmail("");
        setLoading(false);
        return;
      }

      if (!userResponse.ok) {
        toast.error("Email address is not registered!");
        setEmail("");
        setLoading(false);
        return;
      }

      if (userData.authMethod !== "credentials") {
        toast.error(
          `This email address is registered with ${userData.authMethod}, kindly login with ${userData.authMethod} using this email`
        );
        setLoading(false);
        return;
      }

      // Check if the email is verified
      if (!userData.emailVerified) {
        setEmailNotVerified(true);
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

  const resendVerificationEmail = async () => {
    const emailVerificationResponse = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        action: "verify",
      }),
    });

    if (!emailVerificationResponse.ok) {
      toast.error("Failed to send verification email.");
      setLoading(false);
      return;
    }

    toast.success(
      "A verification email has been sent. Please verify your email to proceed."
    );
    setLoading(false);
  };

  const signInWithSocials = async (provider) => {
    try {
      const result = await handleSocialAuth(provider);

      if (result.error) {
        return
      }

      if (result.token !== undefined) {
        login(result.token);
      }

      if (result.completedProfile) {
        router.push("/");
      } else {
        router.push("/profile");
      }
    } catch (error) {
      console.error("Error in social sign-in:", error);
      toast.error("An error occurred during sign-in. Please try again.");
    }
  };

  return (
    <div className="mx-auto container">
      <div className="flex w-full justify-between items-center max-md:hidden h-[100px]">
        <Link href={"/"}>
          <Image src={Logo} alt="Lookvisa" width={120} className="" />
        </Link>
        {/* <Link href={"/sign-in"} className="underline flex items-center gap-4  text-center p-2">Login to your Account <ArrowRight size={15}/> </Link> */}
      </div>
      <div className="h-[80vh] max-xl:h-screen flex items-start justify-center">
        <div className="p-5 border rounded-lg w-[90%] sm:w-[90%] md:max-w-[400px] lg:max-w-[500px] mx-auto">
          <h1 className="text-4xl text-black text-center mb-3">Sign in {redirectPath === "/checkout" && "as Visa Sponsor"}</h1>
          <form onSubmit={validateEmail}>
            <div className="flex flex-col">

              <input
                disabled={loading}
                className="border rounded-[5px] p-2 mt-2 text-black "
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center text-center w-full p-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded-[5px] mt-5"
            >
              {loading ? (
                <Loader className="animate-spin" size={18} />
              ) : (
                "Continue"
              )}
            </button>

          </form>

          {redirectPath !== "/checkout" && (
            <>
              <div className="mt-5 flex items-center justify-center">
                <hr className="flex-1 bg-gray-200" />
                <h1 className="text-center text-gray-500 text-sm mx-3">or</h1>
                <hr className="flex-1 bg-gray-200" />
              </div>

              <div className="flex flex-col gap-5 w-[90%] m-auto mt-5">
                <button
                  className="flex gap-5 items-center w-[80%] p-1 border bg-blue-500 rounded-sm mx-auto  justify-start"
                  onClick={() => signInWithSocials(new GoogleAuthProvider())}
                >
                  <div className="flex items-center justify-center p-2 rounded-md bg-white">
                    <FcGoogle className="" />
                  </div>
                  <h1 className="text-white font-bold ml-6">Continue with Google</h1>
                </button>
                {/* <button
              className="flex gap-5 items-center w-[80%] p-3 bg-blue-500 text-white rounded-full mx-auto justify-center"
              onClick={() => signInWithSocials(new FacebookAuthProvider())}
            >
              <FaFacebookF />
              <h1>Continue with Facebook</h1>
            </button> */}
              </div>
              <div className="w-full flex items-center justify-between mt-5">
                <div className="flex flex-col justify-center w-full items-center gap-3 text-sm text-gray-500">
                  <h1>Don't have an Account?</h1>
                  <Link href="/sign-up" className=" border  px-6 border-green-500 text-green-500 hover:text-white  hover:bg-green-600 py-2 ">
                    Sign up
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Popup for email verification */}
        {emailNotVerified && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-lg shadow-md w-[90%] sm:max-w-[400px]">
              <h2 className="text-center font-semibold text-lg text-black">
                Email Not Verified
              </h2>
              <p className="text-center text-gray-600 text-sm mt-2">
                Please verify your email address to proceed. Click the button
                below to resend the verification email.
              </p>
              <button
                className="mt-5 bg-blue-500 text-white font-bold py-2 px-4 rounded w-full"
                onClick={resendVerificationEmail}
                disabled={loading}
              >
                {loading ? (
                  <Loader className="animate-spin" size={18} />
                ) : (
                  "Resend Verification Email"
                )}
              </button>
              <button
                className="mt-3 text-gray-600 underline text-sm w-full"
                onClick={() => setEmailNotVerified(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
