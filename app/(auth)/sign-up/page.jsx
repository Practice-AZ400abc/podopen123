"use client";
import { useEffect, useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { AuthContext } from "@/components/AuthProvider"; // Import AuthContext
import handleSocialAuth from "@/utils/handleSocialAuth";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext); // Access isLoggedIn

  const [selectedForm, setSelectedForm] = useState("Investor");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/"); // Redirect to home page if already logged in
    }
  }, [isLoggedIn, router]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const passwordValidation = {
    minLength: password.length >= 9,
    maxLength: password.length <= 32,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[^A-Za-z0-9\s]/.test(password),
  };

  const isPasswordValid = Object.values(passwordValidation).every((v) => v);

  const handleRegister = async (e) => {
    e.preventDefault();
  
    // Basic validations
    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
  
    if (password !== confirmPassword) {
      toast.error("Password & confirm password should be the same!");
      setError("Passwords do not match.");
      return;
    }
  
    if (!isPasswordValid) {
      setError("Password does not meet the required criteria.");
      return;
    }
  
    setError(null);
    setLoading(true);
  
    try {
      // Attempt to create the user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
  
      // Save user to MongoDB with emailVerified set to false
      const role = selectedForm;
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firebaseUid: firebaseUser.uid,
          email: firebaseUser.email,
          role,
          completedProfile: false,
          emailVerified: false,
        }),
      });
  
      if (!response.ok) {
        if (response.status === 409) { // Conflict status for existing user
          toast.error("This email account is already registered with this platform. You can login or reset your password if needed.");
        } else {
          toast.error("Failed to save user to the database.");
        }
        throw new Error("Failed to save user to MongoDB.");
      }
  
      // Send verification email
      const emailVerificationResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: firebaseUser.email,
          action: "verify",
        }),
      });
  
      if (!emailVerificationResponse.ok) {
        toast.error("Failed to send email verification.");
        throw new Error("Failed to send email verification.");
      }
  
      // Display success message and redirect
      toast.success("A confirmation email has been sent to your email!");
      setLoading(false);
      router.push("/sign-in");
    } catch (err) {
      console.log(err);
  
      if (err.code === "auth/email-already-in-use") {
        // Firebase-specific error for an already registered email
        toast.error("This email account is already registered with this platform. You can login or reset your password if needed.");
      } else {
        toast.error(err.message || "An error occurred during sign-up.");
      }
  
      setError(err.message || "An error occurred during sign-up.");
      setLoading(false);
    }
  };
  

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div className="p-5 bg-slate-900 rounded-lg w-[90%] sm:w-[90%] md:max-w-[400px] lg:max-w-[500px] mx-auto">
        <h1 className="text-4xl text-white text-center mb-10">Sign up</h1>
        <h1 className="text-sm text-gray-400 text-center mb-5">Are you a ?</h1>
        <div className="flex justify-center gap-4 mb-5 text-white">
          <label className="flex items-center">
            <input
              type="radio"
              name="role"
              value="Investor"
              checked={selectedForm === "Investor"}
              onChange={() => setSelectedForm("Investor")}
              className="mr-2"
            />
            Investor Seeker
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="role"
              value="Seeker"
              checked={selectedForm === "Seeker"}
              onChange={() => setSelectedForm("Seeker")}
              className="mr-2"
            />
            Visa Seeker
          </label>
        </div>

        <form onSubmit={handleRegister}>
          {/* Email and Password Fields */}
          <div className="flex flex-col">
            <label className="font-semibold text-sm text-white">Email</label>
            <input
              disabled={loading}
              className="text-white font-bold rounded-[5px] p-1 mt-2 outline-blue-200 bg-slate-800"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative flex flex-col mt-5">
            <label className="font-semibold text-sm text-white">Password</label>
            <input
            maxLength={20}
              disabled={loading}
              className="text-white font-bold rounded-[5px] p-1 mt-2 outline-blue-200 bg-slate-800"
              type={passwordVisible ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setShowTooltip(true)}
              onBlur={() => setShowTooltip(false)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-9 text-sm font-semibold text-blue-500"
            >
              {passwordVisible ? <FaEye /> : <FaEyeSlash />}
            </button>

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
                        className={`list-disc text-sm font-bold ${
                          valid ? "text-green-500" : "text-black"
                        }`}
                      >
                        {key === "minLength" && "At least 9 characters"}
                        {key === "maxLength" && "Not more than 32 characters"}
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
          </div>

          <div className="flex flex-col mt-5">
            <label className="font-semibold text-sm text-white">
              Confirm Password
            </label>
            <input
            maxLength={20}

              disabled={loading}
              className="text-white font-bold rounded-[5px] p-1 mt-2 outline-blue-200 bg-slate-800"
              type={passwordVisible ? "text" : "password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center w-full p-2 bg-blue-500 text-white font-bold rounded-[5px] mt-5"
            disabled={loading}
          >
            {loading ? "Loading..." : `Sign up as ${selectedForm}`}
          </button>
        </form>

        <div className="w-full flex items-center justify-between mt-5">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <h1>Already have an Account?</h1>
            <Link href={"/sign-in"} className="text-blue-500 underline">
              Sign in
            </Link>
          </div>
        </div>

        {selectedForm === "Investor" && (
          <div className="mt-5 flex flex-col items-center justify-center gap-5">
            <button
              className="flex gap-5 items-center w-[80%] p-3 border-white rounded-full mx-auto border justify-center"
              onClick={() => handleSocialAuth(new GoogleAuthProvider())}
            >
              <FcGoogle />
              <h1 className="text-white">Continue with Google</h1>
            </button>
            <button
              className="flex gap-5 items-center w-[80%] p-3 bg-blue-600 text-white rounded-full mx-auto justify-center"
              onClick={() => handleSocialAuth(new FacebookAuthProvider())}
            >
              <FaFacebookF />
              <h1>Continue with Facebook</h1>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
