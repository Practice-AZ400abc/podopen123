"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

import { COUNTRIES } from "@/lib/constants";
import People from "../app/people.jpg";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SearchImage from "@/app/SearchPage.png";
import Image from "next/image";
import { SearchCheck } from "lucide-react";
export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState(""); // Track the selected country
  const router = useRouter(); // Use the Next.js router for navigation

  const [redirectPath, setRedirectPath] = useState(null);

  useEffect (() => {
    const redirectPathInStorage = sessionStorage.getItem("redirect");
    if (redirectPathInStorage) {
      setRedirectPath(redirectPathInStorage)
    }
  }, [])

  useEffect(() => {
    if (redirectPath) {
      sessionStorage.removeItem("redirect");
      router.push(redirectPath)
    }
  }, [redirectPath])

  const handleSearch = () => {
    if (selectedCountry) {
      // Redirect to the search page with the selected country as a query parameter
      router.push(`/Projects-search?country=${encodeURIComponent(selectedCountry)}`);
    } else {
      alert("Please select a country before searching.");
    }
  };

  return (
    <main className="min-h-full bg-gray-50 mb-10 flex flex-col items-center pt-4 px-4">
      <div className="w-full max-w-4xl mx-auto text-center space-y-6 mt-6">
        <div className="flex gap-3 bg-white  items-center justify-center   p-3 rounded-md border border-blue-400 shadow-md">

          <Select onValueChange={(value) => setSelectedCountry(value)}>
            <SelectTrigger className="h-12">
              <SearchCheck /> <SelectValue placeholder="Countries with Visa Sponsor" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            className="h-12 px-8 bg-blue-400 hover:bg-blue-500"
            size="lg"
            onClick={handleSearch} // Call handleSearch on button click
          >

            Search
          </Button>
        </div>
        <h1 className="text-2xl md:text-[54px] w-full leading-snug  text-black font-bold">Connect with Investors to Secure Your
          Golden or EB-5 Visa</h1>

        <div className="space-y-4 flex items-center flex-col">

          <div className="bg-gray-100 w-full flex items-center justify-center border">
            <Image src={People} alt="Visa Investor" className="rounded-md" width="400" height="200" />
          </div>

          <h1 className="text-2xl font-semibold text-blue-400">
            Create your Listing - It only takes a few seconds.
            Join our network of successful visa sponsors.
     
          </h1>
          {/* <p className="text-gray-600">
            Search for investors seeking a golden visa or investment visa in the country where you seek funds for your project.
          </p> */}
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <Link href={"/sign-up"}>
              <Button className="bg-green-500 text-white hover:bg-green-400 shadow-sm">Get Started Now !</Button>
            </Link>
          </div>
          <div className="flex flex-col">
          {/* <span className="text-gray-600 text-sm mt-4 max-w-[400px] m-auto">
            Create your Listing - It only takes a few seconds
          </span>
          <span className="text-gray-600 text-sm mt-4 max-w-[400px] m-auto">
            Join our network of successful visa sponsors.
          </span> */}
          </div>
        </div>

      </div>
    </main >
  );
}
