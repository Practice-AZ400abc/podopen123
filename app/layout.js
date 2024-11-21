
import "./globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Lookvisa – Immigrant Visa Investors connect with investor seekers",
  description:
    "Investor Visa: The easiest way to find an immigrant investor visa opportunity & in a country of your choice. GlobalDoor is free, easy to use, and helps you get an investor immigration visa.",
  keywords:
    "Investor visa, immigration visa, foreign investor, investor seeker, investor project for a visa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <title>{metadata.title}</title>
      </head>
      <body
        className={` antialiased`}
      >
        <Toaster/>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
