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
        <meta charset="utf-8" />



        <meta content="ie=edge" http-equiv="x-ua-compatible" />



        <meta name="viewport" content="width=device-width, initial-scale=1.0" />



        <meta name="google" content="notranslate" />



        <meta name="p:domain_verify" content="eed8abd75641e89930e293770e1a608d" />



        <meta content="Investment Visa Search | LookVisa" property="og:title" />



        <meta content=" With LookVisa, you can search for investment projects and opportunities to obtain an immigrant investor visa. With tools for uploading investor profile, listed investment projects and more, you can find an investment visa." property="og:description" />



        <meta property="og:description" content="LOOKVISA is the easiest way to find an immigrant visa and streamline and find an immigrant investor to fund your projects and investment opportunities." />



        <meta property="og:url" content="https://www.lookvisa.com/" />



        <meta property="og:site_name" content="LOOKVISA" />



        <meta name="twitter:card" content="summary" />



        <meta name="twitter:title" content="Investment Visas – Find Immigrant Investor Visas" />
        <meta
          name="description"
          content="With LookVisa, you can seach for and match up with individuals seeking to invest in your projects for an investment visa, or golden visa."
        />
        <meta
          name="keywords"
          content="investment visa, lookvisa, visa sponsor, golden visa, investment opportunities, citizenship investment, foreign investor, immigrant investor, project funding, search engine platform for immigrant investment visas"
        />
        <title> Lookvisa – Find Investors Seeking Visa</title>
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
