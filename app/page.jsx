"use client";

import { useState } from "react";
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

  const handleSearch = () => {
    if (selectedCountry) {
      // Redirect to the search page with the selected country as a query parameter
      router.push(`/Projects-search?country=${encodeURIComponent(selectedCountry)}`);
    } else {
      alert("Please select a country before searching.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center pt-4 px-4">
      <div className="w-full max-w-3xl mx-auto text-center space-y-6 mt-6">
        <h1 className="text-3xl  text-black font-bold">Get sponsorship for your golden, eb5, investor visa</h1>
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
        <div className="space-y-4 flex items-center flex-col">

          <div className="bg-gray-100 w-full flex items-center justify-center border">
            <Image src={People} alt="Visa Investor" className="rounded-md" width="400" height="200" />
          </div>

          <h1 className="text-2xl font-semibold text-blue-400">
            Create a listing to get funding for your project from an investor seeking a golden, EB5 Visa<br />
          </h1>
          {/* <p className="text-gray-600">
            Search for investors seeking a golden visa or investment visa in the country where you seek funds for your project.
          </p> */}
        </div>

        <div className="space-y-4">
          <span className="text-gray-600 text-sm">
            Create your Listing  - It only takes a few seconds
          </span>
          <div>
            <Link href={"/sign-up"}>
              <Button className="bg-blue-400">Get Started</Button>
            </Link>
          </div>

          {/* <div className="text-center">

            <span className="text-gray-600 text-sm">
              LookVisa helps investors obtain investors visa, golden visas, EB5 visas
            </span>
          </div>
          <div className="text-center text-sm text-gray-500">
            <span>or</span>
          </div> */}

          {/* <div className="text-center">
            <Link
              href="/sign-in"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              login as a visa sponsor
            </Link>{" "}
            <span className="text-gray-600 text-sm">
              to contact the investors seeking investment and golden visas directly
            </span>
          </div> */}
        </div>
      </div>
    </main>
  );
}
