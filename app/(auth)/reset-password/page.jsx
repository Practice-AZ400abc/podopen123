"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams(); // Get URL parameters

  // Retrieve the token from the URL query parameters
  const token = searchParams.get("token");
  console.log(token);

  useEffect(() => {
    if (!token) {
      setError("Invalid or expired link.");
    }
  }, [token]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

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
        return;
      }

      setMessage("Password reset successful.");
      // Redirect to login page after success
      setTimeout(() => {
        router.push("/sign-in");
      }, 2000);
    } catch (err) {
      setError(err.message || "An error occurred during password reset.");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="p-5 bg-slate-900 rounded-lg w-[90%] sm:w-[90%] md:max-w-[400px] lg:max-w-[500px] mx-auto">
        <h1 className="text-center font-semibold text-2xl text-white">
          Reset Password
        </h1>
        <p className="text-center font-semibold text-sm text-gray-500 mt-2">
          Please enter your new password
        </p>

        <div className="mt-2">
          <form onSubmit={handleResetPassword}>
            <div className="flex flex-col">
              <label className="font-semibold text-white text-sm">
                Enter New Password
              </label>
              <input
                className="bg-slate-800 text-white rounded-md p-1 mt-2 outline-blue-200"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="font-semibold text-white text-sm mt-5">
                Re-Enter New Password
              </label>
              <input
                className="bg-slate-800 text-white rounded-md p-1 mt-2 outline-blue-200"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              className="flex items-center justify-center text-center w-full p-2 bg-blue-500 text-white font-bold rounded-md mt-5"
              type="submit"
            >
              Reset password
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
