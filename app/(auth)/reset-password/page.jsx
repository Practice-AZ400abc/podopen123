"use client";

import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "@/app/Lookvisa.png"
import Link from "next/link";
import Image from "next/image";

const ResetPassword = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const [showPassword, setShowPassword] = useState(false); // For password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For confirm password visibility
  const [showTooltip, setShowTooltip] = useState(false); // Tooltip visibility


  // Retrieve the token from the URL query parameters
  const token = searchParams.get("token");

  // Password validation rules
  const passwordValidation = {
    minLength: password.length >= 9,
    maxLength: password.length <= 32,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[^A-Za-z0-9\s]/.test(password),
  };

  const isPasswordValid = Object.values(passwordValidation).every((v) => v);

  useEffect(() => {
    if (!token) {
      setError("Invalid or expired link.");
    }
  }, [token]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!isPasswordValid) {
      setError("Password does not meet the required criteria.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true); // Start loading
    try {
      setError("");
      setMessage("");

      // Send the reset request to your backend
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Something went wrong.");
        setLoading(false); // Stop loading
        return;
      }

      toast.success("Password reset successful.");
      setMessage("Password reset successful.");
      setLoading(false); // Stop loading
      setTimeout(() => {
        router.push("/sign-in");
      }, 2000);
    } catch (err) {
      setError(err.message || "An error occurred during password reset.");
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="mx-auto container min-h-screen">
      <div className="p-4">
        <Image src={Logo} alt="logo" width={120} className="w-30 " />
      </div>
      <div className="p-5  rounded-lg w-[90%] sm:w-[90%] md:max-w-[400px] lg:max-w-[500px] mx-auto">

        <h1 className="text-center font-semibold text-2xl text-black">
          Reset Password
        </h1>
        <p className="text-center font-semibold text-sm text-gray-500 mt-2">
          Please enter your new password
        </p>

        <div className="mt-2 relative">
          <form onSubmit={handleResetPassword}>
            <div className="flex flex-col">
              <label className="font-semibold text-black text-sm">
                Enter New Password
              </label>
              <div className="flex w-full items-center relative">
                <input
                  className="border w-full text-black rounded-md p-1 mt-2 outline-blue-200"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  maxLength={20}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setShowTooltip(true)}
                  onBlur={() => setShowTooltip(false)}
                />
                <button
                  type="button"
                  className="absolute right-2 top-4 text-black"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {showTooltip && (
                <div className="absolute top-14 z-10 bg-white w-[300px] rounded-[5px] p-3">
                  <h1 className="text-sm font-semibold">
                    A password must contain:
                  </h1>
                  <ul className="ml-5">
                    {Object.entries(passwordValidation).map(
                      ([key, valid], idx) => (
                        <li
                          key={idx}
                          className={`list-disc text-sm font-bold ${valid ? "text-green-500" : "text-black"
                            }`}
                        >
                          {key === "minLength" && "At least 9 characters"}
                          {key === "maxLength" &&
                            "Not more than 32 characters"}
                          {key === "hasUpperCase" && "An uppercase letter"}
                          {key === "hasLowerCase" && "A lowercase letter"}
                          {key === "hasNumber" && "A number"}
                          {key === "hasSpecialChar" &&
                            "A special character such as @, £, or &"}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
              <label className="font-semibold text-black text-sm mt-5">
                Re-enter New Password
              </label>
              <div className="flex w-full items-center relative">
                <input
                  maxLength={20}
                  className="border w-full text-black rounded-md p-1 mt-2 outline-blue-200"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-2 top-4 text-black"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <button
              className={`flex items-center justify-center  hover:bg-green-400 text-center w-full p-2 font-bold rounded-md mt-5 text-white ${loading ? "bg-green-500" : "bg-green-500"
                }`}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Loader className="animate-spin" size={18} />
              ) : (
                "Reset password"
              )}
            </button>
          </form>
          {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
