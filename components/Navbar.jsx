"use client";

import React, { useContext } from "react";
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
import { AuthContext } from "@/components/AuthProvider"; // Import AuthContext
import { UserCircle } from "lucide-react";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext); // Use AuthContext

  return (
    <div className="w-full bg-slate-900">
      <div className="container mx-auto flex items-center h-[70px] justify-between px-4">
        <div className="flex gap-10 items-center">
          <Link href="/">
            <Image src={Logo} alt="Lookvisa" width={150} />
          </Link>
          {/* Navbar */}
          <ul className="flex gap-10 items-center max-md:hidden font-regular text-[13px] text-white">
            {/* navlink */}
            <Link href="/">Home</Link>
            <Link href="/">How it Works</Link>
            <Link href="/">Pricing</Link>
            <Link href="/">Blogs</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/OurStory">Our Story</Link>
          </ul>
        </div>
        {isLoggedIn ? (
          <div className="flex gap-5 items-center max-md:hidden">
            <button
              className="border border-white text-white hover:border-none hover:bg-blue-500 hover:text-white px-6 py-3 rounded-full font-bold"
              onClick={logout}
            >
              Logout
            </button>
            <UserCircle height={40} width={40} color="white"/>
          </div>
        ) : (
          <div className="flex gap-5 items-center max-md:hidden">
            <Link
              href="/sign-up"
              className="border-blue-500 border text-white hover:text-blue-500 px-6 py-3 rounded-full font-bold"
            >
              Signup
            </Link>
            <Link
              href="/sign-in"
              className="bg-blue-500 text-white hover:bg-blue-300 hover:text-black px-6 py-3 rounded-full font-bold"
            >
              Login
            </Link>
          </div>
        )}

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="p-3 bg-blue-400 rounded-full">
              {isLoggedIn ? (
                <UserCircle />
              ) : (
                <RiMenuLine size={20} color="white" />
              )}
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
                  <button
                    className="border border-black text-black hover:bg-black hover:text-white px-6 py-3 rounded-full font-bold"
                    onClick={logout}
                  >
                    Logout
                  </button>
                ) : (
                  <Link href="/sign-in" className="text-blue-400 font-bold">
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
