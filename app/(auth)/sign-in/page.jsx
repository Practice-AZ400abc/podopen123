"use client";
import { useState } from "react"; // Import useState for state management
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignIn = () => {
  const router = useRouter();

  const [selectedForm, setSelectedForm] = useState("Investor"); // Track which form is selected
  const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Handle login for form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        console.log("Invalid credentials")
        return;
      }

      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white h-[80vh] max-xl:h-screen bg-gray-50 flex items-center justify-center">
      <div className="p-5 bg-white rounded-lg w-[90%] border sm:w-[90%]  md:max-w-[400px] lg:max-w-[500px] mx-auto">

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
            Investor Sign In
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="role"
              value="Seeker"
              checked={selectedForm === "Seeker"}
              onChange={() => setSelectedForm("Seeker")}
              className="mr-2 font-bold"
            />
            Visa Seeker Sign In
          </label>
        </div>

        {/* Conditionally render the form based on selectedForm */}
        {selectedForm === "Investor" ? (
          <form onSubmit={handleLogin}> {/* Use onSubmit instead of onClick */}
            <div className="flex flex-col">
              <label className="font-semibold text-sm">Email</label>
              <input
                className="bg-gray-50 rounded-[5px] p-1 mt-2 outline-blue-200"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Bind email to state
              />
            </div>

            <div className="flex flex-col mt-5 relative">
              <label className="font-semibold text-sm">Password</label>
              <input
                className="bg-gray-50 rounded-[5px] p-1 mt-2 outline-blue-200"
                type={passwordVisible ? "text" : "password"} // Conditionally render input type
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Bind password to state
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-9 text-sm font-semibold text-blue-500"
              >
                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <button
              type="submit" // Make sure this is a submit button
              className="flex items-center justify-center text-center w-full p-2 bg-blue-500 text-white font-bold rounded-[5px] mt-5"
            >
              Sign In as Investor
            </button>

            <div className="w-full flex items-center justify-between mt-5">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <h1>Don't have an Account?</h1>
                <Link href={"/sign-up"} className="text-blue-500 underline">
                  Sign up
                </Link>
              </div>
              <div className="flex items-center gap-5 text-sm text-gray-500">
                <Link href={"/forget-password"} className="text-blue-500 underline">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center">
              <hr className="h-3 bg-gray-200" />
              <h1 className="text-center text-gray-500 text-sm">or</h1>
              <hr className="h-3 bg-gray-200" />
            </div>

            <div className="flex flex-col gap-5 w-[90%] m-auto mt-5">
              <button onClick={(e) => signIn("google")} className="flex gap-5 items-center w-[80%] p-3 border-black rounded-full mx-auto border justify-center">
                <FcGoogle />
                <h1>Continue with Google</h1>
              </button>
              <button onClick={(e) => signIn("facebook")} className="flex gap-5 items-center w-[80%] p-3 bg-blue-500 text-white rounded-full mx-auto justify-center">
                <FaFacebookF />
                <h1>Continue with Facebook</h1>
              </button>
              <button onClick={(e) => signIn("apple")} className="flex gap-5 items-center w-[80%] p-3 bg-black text-white border-black rounded-full mx-auto justify-center">
                <FaApple color="white" />
                <h1>Continue with Apple</h1>
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleLogin}> {/* Use onSubmit instead of onClick */}
            <div className="flex flex-col">
              <label className="font-semibold text-sm">Email</label>
              <input
                className="bg-gray-50 rounded-[5px] p-1 mt-2 outline-blue-200"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Bind email to state
              />
            </div>

            <div className="flex flex-col mt-5 relative">
              <label className="font-semibold text-sm">Password</label>
              <input
                className="bg-gray-50 rounded-[5px] p-1 mt-2 outline-blue-200"
                type={passwordVisible ? "text" : "password"} // Conditionally render input type
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Bind password to state
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-9 text-sm font-semibold text-blue-500"
              >
                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <div className="flex gap-2 mt-5 items-center ">
              <input className="w-3 h-3 bg-black rounded-full" type="checkbox" />
              <div className="text-sm text-gray-500">Remember me on this Device</div>
            </div>

            <button
              type="submit" // Make sure this is a submit button
              className="flex items-center justify-center text-center w-full p-2 bg-blue-500 text-white font-bold rounded-[5px] mt-5"
            >
              Sign In as Visa Seeker
            </button>

            <div className="flex items-center w-full justify-between gap-2 mt-5">
              <div className="flex items-center gap-2">
                <h1 className="text-sm text-gray-400">Don't have an Account?</h1>
                <Link className="text-sm text-blue-400 underline" href={"/sign-up"}>
                  Sign up
                </Link>
              </div>
              <Link className="text-blue-400 underline" href={"/forget-password"}>
                Forgot Password?
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignIn;
