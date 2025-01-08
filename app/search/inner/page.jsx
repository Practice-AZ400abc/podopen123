"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // To get query params
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, Filter, SearchCheckIcon, CheckIcon } from "lucide-react";
import PopupImg from "../../Popupimg.jpg";
import {
  COUNTRIES,
  INDUSTRIES,
  INVESTMENT_RANGES,
  RELOCATION_TIMEFRAMES,
} from "@/lib/constants";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";

import { FaExclamationTriangle } from "react-icons/fa";


export default function SearchPage() {
  const router = useRouter(); // Use the Next.js router for navigation
  const searchParams = useSearchParams(); // Get query params from the URL
  const country = searchParams.get("country"); // Extract 'country' parameter
  const [investors, setInvestors] = useState([]); // Store fetched investors
  const [loading, setLoading] = useState(true); // Loading state
  const [filters, setFilters] = useState({
    netWorth: "",
    industry: "",
    relocationTimeframe: "",
  });

  const [sortOption, setSortOption] = useState(""); // State for sorting

  const fetchInvestors = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/search/seeker?country=${country}`);
      const data = await response.json();
      setInvestors(data);
    } catch (error) {
      console.error("Error fetching investors:", error);
    } finally {
      setLoading(false);
    }
  };

  const parseRangeValue = (rangeString) => {
    if (!rangeString) return 0; // Default value for missing ranges

    // Extract the lower bound of the range
    const match = rangeString.match(/([\d,\.]+)\s*(million|billion)?/i);
    if (!match) return 0;

    let [_, value, unit] = match; // Extract value and unit
    value = parseFloat(value.replace(/,/g, "")); // Remove commas and convert to a number

    // Convert units
    if (unit?.toLowerCase() === "million") {
      value *= 1_000_000;
    } else if (unit?.toLowerCase() === "billion") {
      value *= 1_000_000_000;
    }

    return value;
  };

  const applyFilters = () => {
    let filtered = [...investors];

    // Apply filters
    if (filters.netWorth) {
      filtered = filtered.filter((inv) => inv.netWorth === filters.netWorth);
    }
    if (filters.industry) {
      filtered = filtered.filter(
        (inv) => inv.industryToInvest === filters.industry
      );
    }
    if (filters.relocationTimeframe) {
      filtered = filtered.filter(
        (inv) => inv.relocationTimeframe === filters.relocationTimeframe
      );
    }

    // Apply sorting
    if (sortOption === "netWorthDesc") {
      filtered.sort(
        (a, b) => parseRangeValue(b.netWorth) - parseRangeValue(a.netWorth)
      );
    } else if (sortOption === "netWorthAsc") {
      filtered.sort(
        (a, b) => parseRangeValue(a.netWorth) - parseRangeValue(b.netWorth)
      );
    } else if (sortOption === "investmentDesc") {
      filtered.sort(
        (a, b) =>
          parseRangeValue(b.investmentAmount) -
          parseRangeValue(a.investmentAmount)
      );
    } else if (sortOption === "investmentAsc") {
      filtered.sort(
        (a, b) =>
          parseRangeValue(a.investmentAmount) -
          parseRangeValue(b.investmentAmount)
      );
    }

    return filtered;
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSortChange = (option) => {
    setSortOption(option); // Update sorting option
  };

  useEffect(() => {
    if (country) fetchInvestors(); // Fetch investors when the country changes
  }, [country]);

  const filteredInvestors = applyFilters(); // Apply filters and sorting to fetched data
  const handleSearch = () => {
    if (selectedCountry) {
      // Redirect to the search page with the selected country as a query parameter
      router.push(`/search/inner?country=${encodeURIComponent(selectedCountry)}`);
    } else {
      alert("Please select a country before searching.");
    }
  };

  const handleCountryChange = (country) => {
    router.push(`/search/inner?country=${country}`);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <header className="bg-white border-b">
        <div className="flex gap-3 bg-white  items-center justify-center max-w-[1000px] mt-6 mx-auto p-3 rounded-md border border-blue-400 shadow-md">

          <Select onValueChange={(value) => handleCountryChange(value)}>
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
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="">
          <h1 className="text-xl font-semibold">
            Investors Seeking Golden Visas in {country}
          </h1>
          <p> Result: {investors.length}</p>
          </div>
        
          <div className="flex gap-4 w-full md:w-[200px] mt-2 md:mt-0">
            <Select onValueChange={(value) => handleSortChange(value)}>
              <SelectTrigger className="h-12">
                <div className="flex items-center gap-2">
                  <Filter />
                  <SelectValue
                    className="text-lg font-bold"
                    placeholder="Sort"
                  />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="netWorthDesc">
                  Highest net worth to lowest net worth
                </SelectItem>
                <SelectItem value="netWorthAsc">
                  Lowest net worth to highest net worth
                </SelectItem>
                <SelectItem value="investmentDesc">
                  Investment Amount high to low
                </SelectItem>
                <SelectItem value="investmentAsc">
                  Investment Amount low to high
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>
      <main className="max-w-full mx-auto px-4 py-6">
        
        <div className="flex flex-col md:flex-row gap-6 mx-auto max-w-7xl">
          {/* Filters */}
          
          <div className="col-span-3">
            <Card className="p-4">
              <h2 className="font-semibold mb-4">Apply Filters</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Net Worth</h3>
                  <select
                    className="w-full border p-2"
                    value={filters.netWorth}
                    onChange={(e) =>
                      handleFilterChange("netWorth", e.target.value)
                    }
                  >
                    <option value="">All</option>
                    {INVESTMENT_RANGES.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Industry</h3>
                  <select
                    className="w-full border p-2"
                    value={filters.industry}
                    onChange={(e) =>
                      handleFilterChange("industry", e.target.value)
                    }
                  >
                    <option value="">All</option>
                    {INDUSTRIES.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Relocation Timeframe
                  </h3>
                  <select
                    className="w-full border p-2"
                    value={filters.relocationTimeframe}
                    onChange={(e) =>
                      handleFilterChange("relocationTimeframe", e.target.value)
                    }
                  >
                    <option value="">All</option>
                    {RELOCATION_TIMEFRAMES.map((timeframe) => (
                      <option key={timeframe} value={timeframe}>
                        {timeframe}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <Separator />
            </Card>
          </div>

          {/* Investors Listings */}
          <div className=" w-full ">
            {loading ? (
              <p>Loading investors...</p>
            ) : filteredInvestors.length > 0 ? (
              <div className="space-y-4 w-full">
                {filteredInvestors.map((investor) => (
                  <Card
                    key={investor._id}
                    className="p-4 w-full hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-wrap justify-between items-start w-full">
                      <div className="grid grid-cols-2 items-center gap-5 ">
                        <div className="flex gap-2">
                          <h1 className="text-sm text-blue-500">
                            Country of Nationality{" "}
                          </h1>
                          <p> {investor.nationality}</p>
                        </div>
                        <div className="flex gap-2">
                          <h1 className="text-sm text-blue-500">
                            Dual Citizenship{" "}
                          </h1>
                          <p>
                            {" "}
                            {investor.dualCitizenship == true ? "Yes" : "No"}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <h1 className="text-sm text-blue-500">
                            Dual Citizenship{" "}
                          </h1>
                          <p>
                            {" "}
                            {investor.dualCitizenship == true ? "Yes" : "No"}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <h1 className="text-sm text-blue-500">Networth </h1>
                          <p> {investor.netWorth}</p>
                        </div>
                        <div className="flex gap-2">
                          <h1 className="text-sm text-blue-500">
                            Liquid Assets{" "}
                          </h1>
                          <p> {investor.liquidAssets}</p>
                        </div>
                        <div className="flex gap-2">
                          <h1 className="text-sm text-blue-500">
                            Industry to invest
                          </h1>
                          <p> {investor.industryToInvest}</p>
                        </div>
                        <div className="flex gap-2">
                          <h1 className="text-sm text-blue-500">
                            Amount willing to invest
                          </h1>
                          <p> {investor.investmentAmount}</p>
                        </div>
                        <div className="flex gap-2">
                          <h1 className="text-sm text-blue-500">
                            Country to Relocate
                          </h1>
                          <p> {investor.relocationCountry}</p>
                        </div>
                        <div className="flex gap-2">
                          <h1 className="text-sm text-blue-500">
                            Time to Relocate
                          </h1>
                          <p> {investor.relocationTimeframe}</p>
                        </div>
                        <div className="flex gap-2">
                          <h1 className="text-sm text-blue-500">
                            can you provide evidence of liquid assets{" "}
                          </h1>
                          <p>
                            {" "}
                            {investor.canProvideLiquidityEvidence == true
                              ? "Yes"
                              : "No"}
                          </p>
                        </div>
                      </div>

                      <Dialog>
                        <DialogTrigger className="bg-blue-400 flex items-center p-2 text-white justify-center rounded-md">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Connect with investors</DialogTitle>
                          </DialogHeader>
                          <hr className="mt-2 mb-2 h-1 bg-gray-300" />
                          <div className="flex items-center justify-center w-full">
                            <Image src={PopupImg} alt="connect with Invetors" className="h-[200px] w-[200px] rounded-sm  object-cover" />
                          </div>
                          <DialogDescription>
                            To contact and connect with investors and see their profile please get started with a fast, secure, payment. You’ll also get full access to create a listing to obtain funding from a visa investor for your projects.
                          </DialogDescription>

                          <div className="w-full flex items-center justify-center gap-4 mt-4">
                            <div className="p-3 border rounded-md w-[60%] flex flex-col gap-4 ">
                              <div>
                                <h1 className="text-sm font-semibold">30 Days Pass</h1>
                                <p className="text-4xl text-blue-400 font-bold"> $30.00</p>
                              </div>
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                  <div>
                                    <CheckIcon size={20} />
                                  </div>
                                  <h1 className="text-sm text-gray-500 ">Allows you to contact investors for 30 days to get funding for your projects</h1>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div>
                                    <CheckIcon size={20} />
                                  </div>
                                  <h1 className="text-sm text-gray-500 ">Allows you to create a lisLng to get funding for your project </h1>
                                </div>
                              </div>
                              <div className="p-2 border flex gap-2 rounded-md bg-gray-100">
                                <FaExclamationTriangle />
                              <p className="text-sm uppercase">Renew your pass as needed</p>
                              </div>
                            </div>
                          </div>

                          <div className="w-full flex items-center justify-end gap-4 ">
                            <Link href={"/"} className="underline">Not Now</Link>
                            <Link href={"/"} className="text-white bg-green-500 rounded-sm p-2 hover:bg-green-400">Get Started</Link>
                          </div>
                        </DialogContent>
                      </Dialog>


                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p>No investors found.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
