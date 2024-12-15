"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { Search } from "lucide-react";
import { COUNTRIES } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-blue-400">
            Find a Visa Investor
          </h1>
          <p className="text-gray-600">
            Search for investors seeking a golden visa or investment visa in the country where you seek funds for your project.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3">
            <Select onValueChange={(value) => setSelectedCountry(value)}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Investor desired country" />
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
              <Search className="mr-2 h-4 w-4" />
              Find
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500">
            <span>or</span>
          </div>

          <div className="text-center">
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Login as a visa sponsor
            </a>{" "}
            <span className="text-gray-600 text-sm">
              to contact the investors seeking investment and golden visas
              directly
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
