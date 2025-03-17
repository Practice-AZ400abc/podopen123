"use client";

import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import toast, { ToastBar } from "react-hot-toast";
import { AuthContext } from "@/components/AuthProvider";
import { Loader } from "lucide-react";
import Logo from "@/app/Lookvisa.png";
import Image from "next/image";
import PrivacyFooter from "@/components/PrivacyFooter";

const EnterPassword = () => {
  const router = useRouter();
  const { isLoggedIn, login } = useContext(AuthContext);
  const [redirectPath, setRedirectPath] = useState("/");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const maxAttempts = 5;

  useEffect(() => {
    const redirectPathInStorage = sessionStorage.getItem("redirect");
    if (redirectPathInStorage) {
      setRedirectPath(redirectPathInStorage);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (!storedEmail) {
      router.push("/sign-in");
    }
    setEmail(storedEmail);
  }, [router]);

  useEffect(() => {
    const checkAccountStatus = async () => {
      try {
        const response = await fetch(`/api/users?email=${email}`);
        if (!response.ok) throw new Error("Failed to fetch user data");
        const user = await response.json();
        if (user.isLocked) {
          setIsLocked(true);
          // toast.error("Your account is locked. Please reset your password.");
          setError("Your account is locked due to multiple password attempts for your security. Please reset your password");
          router.push("/forget-password")
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (email) {
      checkAccountStatus();
    }
  }, [email])

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password) {
      setError("Password is required");
      toast.error("Password is required");
      return;
    }
    if (attempts >= maxAttempts) {
      toast.error("Too many failed attempts. Try again later.");
      toast.error("Your account has been locked due to too many failed attempts.");
      router.push("/forget-password");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const response = await fetch("/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firebaseUid: user.uid }),
      });

      if (!response.ok) throw new Error("Failed to generate token.");

      const { token, role, completedProfile } = await response.json();
      localStorage.setItem("token", token);
      sessionStorage.removeItem("email");
      toast.success("You are logged in successfully!");
      login(token);

      if (redirectPath === "/") {
        if (!completedProfile) {
          setRedirectPath("/profile");
        } else if (role === "Admin") {
          setRedirectPath("/admin/home");
        }
      }

      router.replace(redirectPath);
    } catch (err) {
      setAttempts((prev) => {
        const newAttempts = prev + 1;
        if (newAttempts >= maxAttempts) {
          fetch("/api/lock-account", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          }).then(() => {
            setIsLocked(true);
            router.push("/forget-password");
          });
        }
        return newAttempts;
      });
      setError(err.message);
      toast.error("Please enter a valid password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mx-auto container min-h-screen">
        <div className="flex p-4 w-full items-center justify-start">
          <Link href={"/"}>
            <Image src={Logo} alt="Lookvisa" width={120} />
          </Link>
        </div>
        <div className="min-h-[70vh] flex flex-col items-center justify-center">
          <div className="p-5 rounded-lg w-[90%] sm:w-[90%] md:max-w-[400px] lg:max-w-[500px] mx-auto">
            <h1 className="text-4xl text-black text-center mb-10">Password</h1>
            <div className="mt-2">
              <form onSubmit={handleLogin}>
                <div className="flex flex-col">
                  <label className="font-semibold text-black text-sm">Please enter Password</label>
                  <div className="w-full relative">
                    <input
                      className={`text-black rounded-[5px] p-1 mt-2 outline-blue-200 w-full border ${error ? "outline-red-500" : ""}`}
                      maxLength={20}
                      type={passwordVisible ? "text" : "password"}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      disabled={attempts >= maxAttempts || isLocked}
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-4 text-sm font-semibold text-black"
                      disabled={attempts >= maxAttempts || isLocked}
                    >
                      {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                  {isLocked && <p className="text-red-500 text-sm mt-2">Your account has been locked due to too many failed attempts.</p>}
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center text-center w-full p-2 bg-green-500 text-white font-bold rounded-md mt-5 disabled:bg-gray-400"
                  disabled={loading || attempts >= maxAttempts || isLocked}
                >
                  {loading ? <Loader className="animate-spin" size={18} /> : "Sign in"}
                </button>
              </form>
            </div>
            <div className="mt-4 flex items-center justify-end w-full">
              <Link className="text-blue-500 underline" href={"/forget-password"}>
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>
      </div>
      <PrivacyFooter />
    </>
  );
};

export default EnterPassword;
