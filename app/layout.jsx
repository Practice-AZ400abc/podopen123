"use client";

import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import SuspenseProvider from "@/components/SuspenseProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import CookieConsent from "@/components/CookieConsent";
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Define routes where Navbar should be hidden
  const noNavbarRoutes = ["/sign-in", "/sign-up", "/sign-in/password", "/forget-password", "/reset-password"];

  return (
    <html lang="en">
      <head>
        <meta
          name="description"
          content="With LookVisa, you can search for and match up with individuals seeking to invest in your projects for an investment visa, or golden visa."
        />
        <meta name="keywords" content="investment visa, lookvisa, visa sponsor, golden visa, investment opportunities, citizenship investment, foreign investor, immigrant investor, project funding, search engine platform for immigrant investment visas" />
        <meta content="With LookVisa, you can search for investment projects and opportunities to obtain an immigrant investor visa. With tools for uploading investor profile, listed investment projects and more, you can find an investment visa." property="og:description" />
        <meta property="og:description" content="LOOKVISA is the easiest way to find an immigrant visa and streamline and find an immigrant investor to fund your projects and investment opportunities." />
        <meta name="twitter:description" content="LOOKVISA is the easiest way to find an immigrant visa and streamline and find an immigrant investor for your projects and investment opportunities." />

        <title>Lookvisa – Find Projects Seeking Funding for investment, Golden and EB5 visas</title>

        {/* Google Analytics */}
        {/* <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XCB8H8JXLK" //testing measurement id
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XCB8H8JXLK', {
                page_path: window.location.pathname,
              });
            `,
          }}
        /> */}
      </head>
      <body className="antialiased">
        <SuspenseProvider>
          <AuthProvider>
            <Toaster />
            {/* Conditionally render Navbar */}
            {!noNavbarRoutes.includes(pathname) && <Navbar />}
            {children}
            <CookieConsent />
            {!noNavbarRoutes.includes(pathname) && <Footer />}
          </AuthProvider>
        </SuspenseProvider>
      </body>
      <GoogleAnalytics gaId="G-XCB8H8JXLK" />
    </html>
  );
}