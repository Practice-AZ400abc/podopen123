"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const VerifyEmail = () => {
  const [message, setMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      const verifyEmail = async () => {
        try {
          const response = await fetch("/api/verify-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }), // Send token in the request body
          });

          const data = await response.json();
          if (response.ok) {
            setMessage(data.message); // Success message
            setIsVerified(true); // Mark email as verified
          } else {
            setMessage(data.error); // Error message
          }
        } catch (error) {
          console.error("Error:", error);
          setMessage("An error occurred while verifying your email.");
        }
      };

      verifyEmail(); // Call the function to verify the email
    }
  }, [token]);

  return (
    <div className="h-[50vh] flex flex-col items-center justify-center">
     <div className="bg-slate-900 p-4 rounded-md text-blue-500 ">
     <h1 className="text-2xl font-bold">Email Verification</h1>
      <p className="text-center text-white text-sm">{message}</p>

      {isVerified && (
        <div className="mt-4">
          <Link href="/sign-in">
            <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg">
              Go to Sign In
            </button>
          </Link>
        </div>
      )}
     </div>
    </div>
  );
};

export default VerifyEmail;
