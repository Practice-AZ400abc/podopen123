"use client";

import React, { useState, useContext, useEffect, useRef } from "react";
import Logo from "../app/Lookvisa.png";
import Image from "next/image";
import Link from "next/link";
import profile from "../assets/profile.png";
import { RiMenuLine } from "react-icons/ri";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AuthContext } from "@/components/AuthProvider";
import { LogOut } from "lucide-react";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode to decode the token

const Navbar = () => {
  const { isLoggedIn, logout, token } = useContext(AuthContext); // Get the token from AuthContext
  const [showLogout, setShowLogout] = useState(false);
  const profileRef = useRef(null); // Ref for the profile image and dropdown

  const [avatarURL, setAvatarURL] = useState(null); // Get the avatarURL from the token

  // Function to decode the token and get the avatarURL
  useEffect(() => {
    if (token) {
      setAvatarURL(jwtDecode(token).avatarURL);
    }
  }, [token]);

  const toggleLogout = () => setShowLogout((prev) => !prev);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full border-b border-gray-200 bg-white z-10 sticky">
      <div className="container mx-auto flex items-center h-[70px] justify-between px-4">
        <div className="flex gap-10 items-center">
          <Link href="/">
            <Image src={Logo} alt="Lookvisa" width={120} />
          </Link>
          <ul className="flex gap-10 items-center max-md:hidden font-regular text-[16px] text-black">
            <Link href="/">Home</Link>
            <Link href="/howItWorks">How it Works</Link>
            <Link href="/">Pricing</Link>
            <Link href="/">Blogs</Link>
            <Link href="/PrivacyPolicy">Privacy Policy</Link>
            <Link href="/OurStory">Our Story</Link>
            <Link href={"/search"}>Find investors</Link>
          </ul>
        </div>
        {isLoggedIn ? (
          <div
            ref={profileRef}
            className="relative flex gap-5 items-center max-md:hidden"
          >
            {/* Profile Image */}
            <Image
              src={avatarURL || profile} // Use the avatarURL if available, otherwise use the default image
              alt="Profile"
              className="rounded-full h-10 w-10 object-cover cursor-pointer"
              width={40}
              height={40}
              onClick={toggleLogout} // Toggle visibility on click
            />
            {/* Logout Div */}
            {showLogout && (
              <div className="absolute top-[120%] right-0 bg-slate-800 shadow-md px-8 py-2 rounded-md flex items-center gap-2">
                <div className="flex flex-col gap-2">
                  <ul className="flex flex-col items-start gap-2 text-white">
                    <Link href={"/profile"}>Profile</Link>
                  </ul>
                  <div className="flex gap-2 items-center ">
                    <button onClick={logout} className="text-white">
                      Logout
                    </button>
                    <LogOut size={14} color="white" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-5 items-center max-md:hidden">
            <Link
              href="/sign-up"
              className="text-black px-6 py-3 rounded-full font-bold"
            >
              Sponsor Sign In
            </Link>
            <Link
              href="/sign-in"
              className="bg-blue-300 hover:bg-blue-300 text-black px-6 py-3 rounded-sm font-bold"
            >
              Login
            </Link>
          </div>
        )}

        <div className="md:hidden flex gap-4">
          {isLoggedIn ? (
            <div className="flex gap-5 items-center relative">
              <Image
                src={avatarURL || profile} // Use the avatarURL if available, otherwise use the default image
                alt="Profile"
                className="rounded-full"
                width={40}
                height={40}
                onClick={toggleLogout}
              />
              {/* Logout Div */}
              {showLogout && (
                <div className="absolute top-[120%] right-0 bg-slate-800 shadow-md px-8 py-2 rounded-md flex items-center gap-2">
                  <div className="flex flex-col gap-2">
                    <ul className="flex flex-col items-start gap-2 text-white">
                      <Link href={"/profile"}>Profile</Link>
                    </ul>
                    <div className="flex gap-2 items-center ">
                      <button onClick={logout} className="text-white">
                        Logout
                      </button>
                      <LogOut size={14} color="white" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            ""
          )}

          <Sheet>
            <SheetTrigger className="p-3 bg-blue-400 rounded-full">
              <RiMenuLine size={20} color="white" />
            </SheetTrigger>
            <SheetContent className="bg-white">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <ul className="flex flex-col gap-5 items-left">
                <Link href="/">Home</Link>
                <Link href="/">How it Works</Link>
                <Link href="/">Pricing</Link>
                <Link href="/">Blogs</Link>
                {isLoggedIn ? (
                  <button
                    className="border border-black text-black hover:bg-black hover:text-white px-6 py-3 rounded-full font-bold text-[18px]"
                    onClick={logout}
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/sign-in"
                    className="text-blue-400 font-bold text-[18px]"
                  >
                    Log in
                  </Link>
                )}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
