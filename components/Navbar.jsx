"use client";
import React, { useState, useEffect } from "react";
import Logo from "../app/Lookvisa.png";
import Image from "next/image";
import Link from "next/link";
import { RiMenuLine } from "react-icons/ri";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"; // Added SheetHeader and SheetTitle
import getToken from "@/utils/getToken";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="w-full bg-gray-50 border-b">
      <div className="container mx-auto flex items-center h-[70px] justify-between px-4  ">
        <div className="flex gap-10 items-center">
          <Link href="/">
            <Image src={Logo} alt="Lookvisa" width={150} />
          </Link>
          {/* Navbar */}
          <ul className="flex gap-10 items-center max-md:hidden font-semibold text-sm">
            {/* navlink */}
            <Link href="/">Home</Link>
            <Link href="/">How it Works</Link>
            <Link href="/">Pricing</Link>
            <Link href="/">Blogs</Link>
          </ul>
        </div>
        {isLoggedIn ? (
          <>
            <div className="flex gap-5 items-center max-md:hidden">
              <button
                className="border border-black text-black hover:bg-black hover:text-white px-6 py-3 rounded-full font-bold"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-5 items-center max-md:hidden">
              <Link
                href="/sign-up"
                className="border border-black text-black hover:bg-black hover:text-white px-6 py-3 rounded-full font-bold"
              >
                Sign up
              </Link>
              <Link
                href="/sign-in"
                className="bg-blue-500 text-white hover:bg-blue-300 px-6 py-3 rounded-full font-bold"
              >
                Login
              </Link>
            </div>
          </>
        )}

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="p-3 bg-blue-400 rounded-full">
              <RiMenuLine size={20} color="white" />
            </SheetTrigger>
            <SheetContent className="bg-white">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <ul className="flex flex-col gap-5 items-left">
                {/* navlink */}
                <Link href="/">Home</Link>
                <Link href="/">How it Works</Link>
                <Link href="/">Pricing</Link>
                <Link href="/">Blogs</Link>
                {isLoggedIn ? (
                  <>
                    <button
                      className="border border-black text-black hover:bg-black hover:text-white px-6 py-3 rounded-full font-bold"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/sign-in" className="text-blue-400 font-bold">
                      Log in
                    </Link>
                  </>
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
