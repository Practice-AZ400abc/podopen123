"use client";
import { useState, useEffect, useContext } from "react";
import { auth } from "../../firebase/firebaseConfig";
import Logo from "../../Lookvisa.png";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/components/AuthProvider"; // Import the AuthContext

const ForgetPassword = () => {
  const { isLoggedIn } = useContext(AuthContext); // Access isLoggedIn from context
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // For navigation

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/"); // Redirect if already logged in
    }
  }, [isLoggedIn, router]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const emailRegistered = await fetch(`/api/users?email=${email}`, {
        method: "GET",
      });

      if (!emailRegistered.ok) {
        setError("Email address is not registered!");
        setEmail("");
        return;
      }

      const passwordResetResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          action: "reset",
        }),
      });

      if (!passwordResetResponse.ok) {
        toast.error("Failed to send email verification.");
        throw new Error("Failed to send email verification.");
      }

      toast.success("Password reset email has been sent to your email!");
      setLoading(false);
      router.push("/sign-in");
    } catch (err) {
      console.log(err);
      setError("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <div className=" h-screen  flex flex-col items-center justify-center">
      <div className="p-5 bg-slate-900 rounded-lg w-[90%] sm:w-[90%] md:max-w-[400px] lg:max-w-[500px] mx-auto">
        <h1 className="text-center font-semibold text-2xl text-white">
          Forget Password?
        </h1>
        <p className="text-center font-semibold text-sm text-gray-500 mt-2">
          No worries, we'll send you reset instructions.
        </p>

        <div className="mt-2">
          <form onSubmit={handlePasswordReset} className="">
            <div className="flex flex-col">
              <label className="font-semibold text-white text-sm">Email</label>
              <input
                className="bg-slate-800 text-white rounded-md p-1 mt-2 outline-blue-200"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

export default ForgetPassword;
