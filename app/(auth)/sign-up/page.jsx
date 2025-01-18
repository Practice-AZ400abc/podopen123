"use client";
import { useEffect, useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "../../Lookvisa.png";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { AuthContext } from "@/components/AuthProvider";
import handleSocialAuth from "@/utils/handleSocialAuth";
import toast from "react-hot-toast";
import { ArrowLeft, ArrowRight, Loader } from "lucide-react";
import Image from "next/image";

export default function Signup() {
  const router = useRouter();
  const { isLoggedIn, login } = useContext(AuthContext); // Access isLoggedIn

  const [selectedForm, setSelectedForm] = useState("Visa Sponsor");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
      const emailRegistered = await fetch(`/api/users?email=${email}`, {
        method: "GET",
      });

      if (emailRegistered.ok) {
        toast.error(
          `This email is already registered, kindly login or reset your password`
        );
        setLoading(false);
        return;
      }

      // Attempt to create the user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
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
          authMethod: "credentials",
        }),
      });

      if (!response.ok) {
        toast.error("Failed to save user to the database.");
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
      setMessage("A confirmation email has been sent to your email!");
      setShowModal(true);
      setLoading(false);
      // router.push("/sign-in");
    } catch (err) {
      console.log(err);

      if (err.code === "auth/email-already-in-use") {
        // Firebase-specific error for an already registered email
        toast.error(
          "This email account is already registered with this platform. You can login or reset your password if needed."
        );
      } else {
        toast.error(err.message || "An error occurred during sign-up.");
      }

      setError(err.message || "An error occurred during sign-up.");
      setLoading(false);
    }
  };

  const signInWithSocials = async (provider) => {
    try {
      const result = await handleSocialAuth(provider);

      if (result.error) {
        return;
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
        <Link
          href={"/"}
          className="underline flex items-center gap-4  text-center p-2"
        >
          <Image src={Logo} alt="Lookvisa" width={120} className="" />
        </Link>
        <Link
          href={"/sign-in"}
          className="underline flex items-center gap-4  text-center p-2"
        >
          Login to your Account <ArrowRight size={15} />{" "}
        </Link>
      </div>

      <div className="h-[80vh] flex flex-col items-center justify-center">
        <div className="p-5  rounded-lg w-[90%] sm:w-[90%] md:max-w-[400px] lg:max-w-[500px] mx-auto">
          <h1 className="text-4xl text-black text-left ">Get Started Now</h1>
          <h1 className="text-sm text-black text-left mb-4">
            Enter your credentials to access your account
          </h1>

          <h1 className="text-sm text-black text-center mb-2">Are you a ?</h1>
          <div className="flex justify-center gap-4 mb-2 text-black">
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="Visa Sponsor"
                checked={selectedForm === "Visa Sponsor"}
                onChange={() => setSelectedForm("Visa Sponsor")}
                className="mr-2"
              />
              Visa Sponsor
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="Visa Seeker"
                checked={selectedForm === "Visa Seeker"}
                onChange={() => setSelectedForm("Visa Seeker")}
                className="mr-2"
              />
              Visa Seeker
            </label>
          </div>

          <form onSubmit={handleRegister}>
            {/* Email and Password Fields */}
            <div className="flex flex-col">
              <label className="font-semibold text-sm text-black">Email</label>
              <input
                disabled={loading}
                className="text-black border font-bold rounded-[5px] p-1 mt-2 outline-blue-200 "
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative flex flex-col mt-5">
              <label className="font-semibold text-sm text-black">
                Password
              </label>
              <input
                maxLength={20}
                disabled={loading}
                className="text-black font-bold rounded-[5px] p-1 mt-2 outline-blue-200 border"
                type={passwordVisible ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-9 text-sm font-semibold text-black"
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
                          className={`list-disc text-sm font-bold ${valid ? "text-green-500" : "text-black"
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
              <label className="font-semibold text-sm text-black">
                Confirm Password
              </label>
              <input
                maxLength={20}
                disabled={loading}
                className="text-black font-bold rounded-[5px] p-1 mt-2 outline-blue-200  border"
                type={passwordVisible ? "text" : "password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center w-full p-2 bg-black text-white font-bold rounded-[5px] mt-5"
              disabled={loading}
            >
              {loading ? (
                <Loader className="animate-spin" size={18} />
              ) : (
                `Sign up as ${selectedForm}`
              )}
            </button>
            {message && (
              <p className="text-green-500 text-sm mt-2">{message}</p>
            )}
          </form>

          <div className="w-full flex items-center justify-between mt-5">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <h1>Already have an Account?</h1>
              <Link href={"/sign-in"} className="text-black underline">
                Sign in
              </Link>
            </div>
          </div>

          {selectedForm === "Visa Seeker" && (
            <div className="mt-5 flex flex-col items-center justify-center gap-5">
              <button
                className="flex gap-5 items-center w-[80%] p-3 border bg-blue-500 rounded-full mx-auto  justify-center"
                onClick={() => signInWithSocials(new GoogleAuthProvider())}
              >
                <div className="flex items-center justify-center p-2 rounded-full bg-white">
                  <FcGoogle className="" />
                </div>
                <h1 className="text-white">Continue with Google</h1>
              </button>
              {/* <button
                className="flex gap-5 items-center w-[80%] p-3 bg-blue-600 text-white rounded-full mx-auto justify-center"
                onClick={() => signInWithSocials(new FacebookAuthProvider())}
              >
                <FaFacebookF />
                <h1>Continue with Facebook</h1>
              </button> */}
            </div>
          )}
        </div>
        <div>
          <Link
            href={"/"}
            className="text-left underline flex items-center gap-4"
          >
            <ArrowLeft size={15} /> Back to home
          </Link>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-5 max-w-md w-full text-center">
            <h2 className="text-xl font-bold mb-4">Email Sent</h2>
            <p className="text-sm mb-4">
              An email has been sent to confirm your account. Please check your
              inbox to proceed.
            </p>
            <button
              onClick={() => {
                setShowModal(false);
                router.push("/sign-in"); // Redirect to home
              }}
              className="px-4 py-2 bg-black text-white rounded"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
