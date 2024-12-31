"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { Search, SearchCheck, SearchCheckIcon } from "lucide-react";
import { COUNTRIES } from "@/lib/constants";
import SearchImage from "../SearchPage.png";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState(""); // Track the selected country
  const router = useRouter(); // Use the Next.js router for navigation

  const handleSearch = () => {
    if (selectedCountry) {
      // Redirect to the search page with the selected country as a query parameter
      router.push(`/search/inner?country=${encodeURIComponent(selectedCountry)}`);
    } else {
      alert("Please select a country before searching.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center pt-16 px-4">
      <div className="w-full max-w-3xl mx-auto text-center space-y-6">
        <div className="space-y-4 flex items-center flex-col">

          <h1 className="text-2xl flex items-center gap-2 font-semibold text-blue-400">
            Find a visa investor for your project
          </h1>
          <p className="text-gray-600">
            Search for investors seeking a golden visa or investment visa in the country where you seek funds for your project.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3 bg-white  items-center justify-center   p-3 rounded-md border border-blue-400 shadow-md">
             
            <Select onValueChange={(value) => setSelectedCountry(value)}>
              <SelectTrigger className="h-12">
                <SearchCheckIcon /> <SelectValue placeholder="Find a visa investor for your project" />
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

              Find
            </Button>
          </div>

          <div className="flex w-full items-center justify-center bg-[#b4c4c4]  object-cover rounded-md ">
            <Image src={SearchImage} className="rounded-md object-cover w-[350px] h-[350px]" alt="Visa Investor" width="200" height="200" />
          </div>

          <div className="text-center">
            <Link
              href="/sign-in"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Post your investor profile
            </Link>{" "}
            <span className="text-gray-600 text-sm">
              - It only takes a few seconds
            </span>
          </div>

          <div className="text-center">

            <span className="text-gray-600 text-sm">
              LookVisa helps investors obtain investors visa, golden visas, EB5 visas
            </span>
          </div>
          <div className="text-center text-sm text-gray-500">
            <span>or</span>
          </div>

          <div className="text-center">
            <Link
              href="/sign-in"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              login as a visa sponsor
            </Link>{" "}
            <span className="text-gray-600 text-sm">
              to contact the investors seeking investment and golden visas directly
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
