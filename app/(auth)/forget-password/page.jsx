"use client";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { ArrowLeft, Fingerprint, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/components/AuthProvider"; // Import the AuthContext
import Image from "next/image";
import Logo from "@/app/Lookvisa.png"
import PrivacyFooter from "@/components/PrivacyFooter";


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

      setMessage("A password reset link has been sent to reset your password. Please check your inbox and spam folder to reset your password.");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to send password reset email. Please try again.");
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <div className="mx-auto container min-h-screen">
        <div className="flex p-4 w-full  items-center justify-start">
          <Link href={"/"}>
            <Image src={Logo} alt="Lookvisa" width={120} className="" />
          </Link>
        </div>
        <div className="h-[70vh] flex flex-col items-center justify-center">
          <div className="p-5  rounded-lg w-[90%] sm:w-[90%] md:max-w-[400px] lg:max-w-[500px] mx-auto">
            <div className="w-full items-center justify-center">
              <div className="rounded-sm p-2   flex items-center justify-center">
                <div className="rounded-sm p-2 border  flex items-center justify-center">
                  <Fingerprint />
                </div>
              </div>
            </div>

            <h1 className="text-center font-semibold text-2xl text-black">
              Lookvisa - Forgot Password?
            </h1>
            <p className="text-center font-semibold text-sm text-black mt-2">
              No worries, we'll send you reset instructions.
            </p>

            <div className="mt-2">
              <form onSubmit={handlePasswordReset} className="">
                <div className="flex flex-col">
                  <label className="font-semibold text-black text-sm">Email</label>
                  <input
                    className="border text-black rounded-md p-1 mt-2 outline-blue-200"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading} // Disable input during loading
                  />
                </div>
                <button
                  className={`flex items-center justify-center text-center w-full text-white p-2 font-bold rounded-md mt-5 ${loading ? "bg-green-400" : "bg-green-500"
                    }`}
                  type="submit"
                  disabled={loading} // Disable button during loading
                >
                  {loading ? <Loader className="animate-spin" size={18} /> : "Reset password"} {/* Show loading text */}
                </button>
              </form>
              {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
          </div>

          <Link
            className="mt-5 text-black underline flex items-center justify-center gap-2"
            href={"/sign-in"}
          >
            <ArrowLeft size={15} /> Back to login
          </Link>
        </div>

      </div>
      <PrivacyFooter />
    </>
  );
};

export default ForgetPassword;
