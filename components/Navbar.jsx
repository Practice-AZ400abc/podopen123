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

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);
  const profileRef = useRef(null); // Ref for the profile image and dropdown

  const toggleLogout = () => setShowLogout((prev) => !prev);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };

    // Attach the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full border-b border-gray-200">
      <div className="container mx-auto flex items-center h-[70px] justify-between px-4">
        <div className="flex gap-10 items-center">
          <Link href="/">
            <Image src={Logo} alt="Lookvisa" width={120} />
          </Link>
          <ul className="flex gap-10 items-center max-md:hidden font-regular text-[16px] text-black">
            <Link href="/">Home</Link>
            <Link href="/">How it Works</Link>
            <Link href="/">Pricing</Link>
            <Link href="/">Blogs</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/OurStory">Our Story</Link>
          </ul>
        </div>
        {isLoggedIn ? (
          <div ref={profileRef} className="relative flex gap-5 items-center max-md:hidden">
            {/* Profile Image */}
            <Image
              src={profile}
              alt="Profile"
              className="rounded-full cursor-pointer"
              width={40}
              height={40}
              onClick={toggleLogout} // Toggle visibility on click
            />
            {/* Logout Div */}
            {showLogout && (
              <div className="absolute top-12 bg-white shadow-md px-8 py-2 flex items-center gap-2">
                <LogOut size={14} />
                <button onClick={logout} className="text-black">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-5 items-center max-md:hidden">
            <Link
              href="/sign-up"
              className=" text-black px-6 py-3 rounded-full font-bold"
            >
              Become Visa Investor
            </Link>
            <Link
              href="/sign-in"
              className="bg-blue-300 hover:bg-blue-300 text-black px-6 py-3 rounded-sm font-bold"
            >
              Login As Visa Seeker
            </Link>
          </div>
        )}

        <div className="md:hidden flex gap-4">
          {isLoggedIn ? (
            <div className="flex gap-5 items-center relative">
              <Image
                src={profile}
                alt="Profile"
                className="rounded-full"
                width={40}
                height={40}
              />
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
                  <Link href="/sign-in" className="text-blue-400 font-bold text-[18px]">
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
