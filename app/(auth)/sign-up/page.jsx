"use client";
import { useEffect, useState } from "react"; // Import useState for state management
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  linkWithCredential,
  getAuth,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import getToken from "@/utils/getToken";

export default function Signup() {
  const router = useRouter();

  const [selectedForm, setSelectedForm] = useState("Investor"); // Track which form is selected
  const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // Send email verification
      await sendEmailVerification(firebaseUser);

      // Save user to MongoDB via API route using Fetch
      const role = selectedForm; // Investor or Seeker
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
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save user to MongoDB.");
      }

      const data = await response.json();
      console.log("User created in MongoDB:", data);

      setLoading(false);
      alert("Sign-up successful! Please verify your email before signing in.");
      router.push("/sign-in");
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred during sign-up.");
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const email = user.email;

      // Get Firebase Auth instance
      const firebaseAuth = getAuth();

      // Check if email is already associated with email/password sign-in
      const existingSignInMethods = await fetchSignInMethodsForEmail(
        firebaseAuth,
        email
      );

      if (existingSignInMethods.includes("password")) {
        // If the email is already registered with email/password, link the social provider with the existing account
        const credential = provider.credentialFromResult(result);
        await linkWithCredential(user, credential);

        alert("Account linked successfully with your social provider!");
      } else {
        // New user, handle social sign-up as usual
        const role = selectedForm; // Investor or Seeker (or any other role you may have)
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firebaseUid: user.uid,
            email: user.email,
            role,
            completedProfile: false, // Or any other profile logic you may have
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save user to MongoDB.");
        }

        const data = await response.json();
        console.log("User created in MongoDB:", data);

        alert("Sign-up successful!");
      }

      // Generate JWT from backend
      const generateToken = await fetch("/api/auth/generate-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firebaseUid: user.uid,
          email: user.email,
        }),
      });

      if (!generateToken.ok) throw new Error("Failed to generate token.");

      const { token } = await generateToken.json();

      // Store token in localStorage
      localStorage.setItem("token", token);

      // Redirect the user after successful sign-in or sign-up
      router.push("/");
    } catch (err) {
      console.error("Error during social authentication: ", err);
      setError(
        err.message || "An error occurred during social sign-in/sign-up."
      );
    }
  };

  return (
    <div className="bg-white h-[80vh] max-xl:h-screen bg-gray-50 flex items-center justify-center">
      <div className="p-5 bg-white rounded-lg w-[90%] border sm:w-[90%]  md:max-w-[400px] lg:max-w-[500px] mx-auto">
        <h1 className="text-sm text-gray-400 text-center">
          Are you a Visa Investor or Seeker?
        </h1>
        {/* Radio buttons to select between Investor and Seeker */}
        <div className="flex justify-center gap-4 mb-5">
          <label className="flex items-center">
            <input
              type="radio"
              name="role"
              value="Investor"
              checked={selectedForm === "Investor"}
              onChange={() => setSelectedForm("Investor")}
              className="mr-2"
            />
            Investor
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
            Seeker
          </label>
        </div>

        {/* Conditionally render the form based on selectedForm */}
        <form onSubmit={handleRegister}>
          <div className="flex flex-col">
            <label className="font-semibold text-sm">Email</label>
            <input
              className="bg-gray-50 rounded-[5px] p-1 mt-2 outline-blue-200"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col mt-5 relative">
            <label className="font-semibold text-sm">Password</label>
            <input
              className="bg-gray-50 rounded-[5px] p-1 mt-2 outline-blue-200"
              type={passwordVisible ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-9 text-sm font-semibold text-blue-500"
            >
              {passwordVisible ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <div className="flex flex-col mt-5 relative">
            <label className="font-semibold text-sm">Confirm Password</label>
            <input
              className="bg-gray-50 rounded-[5px] p-1 mt-2 outline-blue-200"
              type={passwordVisible ? "text" : "password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-9 text-sm font-semibold text-blue-500"
            >
              {passwordVisible ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <button className="flex items-center justify-center text-center w-full p-2 bg-blue-500 text-white font-bold rounded-[5px] mt-5">
            Sign Up as {selectedForm}
          </button>
        </form>

        <div className="w-full flex items-center justify-between mt-5">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <h1>Already have an Account ?</h1>
            <Link href={"/sign-in"} className="text-blue-500 underline">
              Sign in
            </Link>
          </div>
        </div>

        {/* Social login buttons */}
        {selectedForm === "Investor" && (
          <div className="mt-5 flex flex-col items-center justify-center gap-5">
            <button
              className="flex gap-5 items-center w-[80%] p-3 border-black rounded-full mx-auto border justify-center"
              onClick={() => handleSocialAuth(new GoogleAuthProvider())}
            >
              <FcGoogle />
              <h1>Continue with Google</h1>
            </button>
            {/* <button className="flex gap-5 items-center w-[80%] p-3 bg-blue-500 text-white rounded-full mx-auto justify-center">
              <FaFacebookF />
              <h1>Continue with Facebook</h1>
            </button>
            <button className="flex gap-5 items-center w-[80%] p-3 bg-black text-white border-black rounded-full mx-auto justify-center">
              <FaApple color="white" />
              <h1>Continue with Apple</h1>
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
}
