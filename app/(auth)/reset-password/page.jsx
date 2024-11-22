"use client";

import { confirmPasswordReset } from "firebase/auth";
import { auth } from "@/app/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [oobCode, setOobCode] = useState(null); // State for the reset code
  const router = useRouter();

  useEffect(() => {
    // Access window object safely inside useEffect
    const queryCode = new URLSearchParams(window.location.search).get("oobCode");
    if (!queryCode) {
      setError("Invalid or expired reset link.");
    } else {
      setOobCode(queryCode); // Store the oobCode in state
    }
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!oobCode) {
      setError("Invalid or expired reset link.");
      return;
    }

    try {
      // Confirm the password reset
      await confirmPasswordReset(auth, oobCode, password);
      setMessage("Password reset successful.");
      // Redirect user to login page after a successful reset
      setTimeout(() => {
        router.push("/sign-in");
      }, 2000);
    } catch (error) {
      setError("Error resetting password: " + error.message);
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
          <form onSubmit={handleResetPassword} className="">
            <div className="flex flex-col">
              <label className="font-semibold text-white text-sm">Enter New Password</label>
              <input
                className="bg-slate-800 text-white rounded-md p-1 mt-2 outline-blue-200"
                type="password"
                autoComplete="false"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="font-semibold text-white text-sm mt-5">Re-Enter New Password</label>
              <input
                className="bg-slate-800 text-white rounded-md p-1 mt-2 outline-blue-200"
                type="password"
                autoComplete="false"
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
