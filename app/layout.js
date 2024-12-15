"use client";

import "./globals.css";
import Navbar from "../components/Navbar";
import SuspenseProvider from "@/components/SuspenseProvider";
import { AuthProvider } from "@/components/AuthProvider"; // Ensure the correct path
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation"; // Correct way to access current route in app directory

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Define routes where Navbar should be hidden
  const noNavbarRoutes = ["/sign-in", "/sign-up", "/sign-in/password", "/forget-password", "/reset-password"];

  return (
    <html lang="en">
      <head>
        <meta
          name="description"
          content="Investor Visa: The easiest way to find an immigrant investor visa opportunity & in a country of your choice. GlobalDoor is free, easy to use, and helps you get an investor immigration visa."
        />
        <meta
          name="keywords"
          content="Investor visa, immigration visa, foreign investor, investor seeker, investor project for a visa"
        />
        <title>Lookvisa – Immigrant Visa Investors connect with investor seekers</title>
      </head>
      <body className="antialiased">
        <SuspenseProvider>
          <AuthProvider>
            <Toaster />
            {/* Conditionally render Navbar */}
            {!noNavbarRoutes.includes(pathname) && <Navbar />}
            {children}
          </AuthProvider>
        </ SuspenseProvider >
      </body>
    </html>
  );
}
