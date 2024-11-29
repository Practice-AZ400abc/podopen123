"use client";
import { useState, useEffect, useContext } from "react";
import { auth } from "../../firebase/firebaseConfig";
import Logo from "../../Lookvisa.png";
import Link from "next/link";
import { ArrowLeft, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/components/AuthProvider"; // Import the AuthContext
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const { isLoggedIn } = useContext(AuthContext); // Access isLoggedIn from context
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
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
    setLoading(true); // Start loading
    try {
      const emailRegistered = await fetch(`/api/users?email=${email}`, {
        method: "GET",
      });

      if (!emailRegistered.ok) {
        setError("Email address is not registered!");
        setEmail("");
        setLoading(false); // Stop loading
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
        throw new Error("Failed to send email verification.");
      }

      setMessage("Password reset email sent successfully!");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to send password reset email. Please try again.");
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
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
                disabled={loading} // Disable input during loading
              />
            </div>
            <button
              className={`flex items-center justify-center text-center w-full text-white p-2 font-bold rounded-md mt-5 ${
                loading ? "bg-blue-400" : "bg-blue-500"
              }`}
              type="submit"
              disabled={loading} // Disable button during loading
            >
              {loading ? <Loader /> : "Reset password"} {/* Show loading text */}
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
