"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // To get query params
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building, MessageSquare, Baby, Filter } from "lucide-react";
import {
  INDUSTRIES,
  INVESTMENT_RANGES,
  RELOCATION_TIMEFRAMES,
} from "@/lib/constants";
import Link from "next/link";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";

export default function SearchPage() {
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

      console.log(data);
    } catch (error) {
      console.error("Error fetching investors:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    // Filter investors based on selected filters
    let filtered = [...investors];

    if (filters.netWorth) {
      filtered = filtered.filter((inv) => inv.netWorth === filters.netWorth);
    }
    if (filters.industry) {
      filtered = filtered.filter((inv) => inv.industry === filters.industry);
    }
    if (filters.relocationTimeframe) {
      filtered = filtered.filter(
        (inv) => inv.relocationTimeframe === filters.relocationTimeframe
      );
    }

    // Apply sorting based on the selected option
    if (sortOption === "netWorthDesc") {
      filtered.sort((a, b) => b.netWorth - a.netWorth);
    } else if (sortOption === "netWorthAsc") {
      filtered.sort((a, b) => a.netWorth - b.netWorth);
    } else if (sortOption === "investmentDesc") {
      filtered.sort((a, b) => b.investmentAmount - a.investmentAmount);
    } else if (sortOption === "investmentAsc") {
      filtered.sort((a, b) => a.investmentAmount - b.investmentAmount);
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

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            Investors Seeking Golden Visas in {country}
          </h1>
          <div className="flex gap-4 w-[200px]">
            <Select>
              <SelectTrigger className="h-12">
                <div className="flex items-center gap-2">
                  <Filter />
                  <SelectValue className="text-lg font-bold" placeholder="Sort" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="highToLowNetWorth">
                  High net worth to Lowest net worth
                </SelectItem>
                <SelectItem value="lowToHighNetWorth">
                  Lowest net worth to highest net worth
                </SelectItem>
                <SelectItem value="highToLowInvestment">
                  Investment Amount high to low
                </SelectItem>
                <SelectItem value="lowToHighInvestment">
                  Investment Amount low to high
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
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
                      handleFilterChange(
                        "relocationTimeframe",
                        e.target.value
                      )
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
          <div className="col-span-9">
            {loading ? (
              <p>Loading investors...</p>
            ) : filteredInvestors.length > 0 ? (
              <div className="space-y-4">
                {filteredInvestors.map((investor) => (
                  <Card
                    key={investor._id}
                    className="p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="grid grid-cols-2 items-center gap-5 ">
                        <div className="flex gap-2">
                          <h1 className="text-sm text-blue-500">Country of Nationality </h1>
                          <p> {investor.nationality}</p>
                        </div>
                        <div className="flex gap-2">
                          <h1 className="text-sm text-blue-500">Dual Citizenship </h1>
                          <p> {investor.dualCitizenship == true ? "Yes" : "No"}</p>
                        </div>
                        <div className="flex gap-2">
                          <h1 className="text-sm text-blue-500">Dual Citizenship </h1>
                          <p> {investor.dualCitizenship == true ? "Yes" : "No"}</p>
                        </div>
                        <div className="flex gap-2">
                          <h1 className="text-sm text-blue-500">Networth </h1>
                          <p> {investor.netWorth}</p>
                        </div>
                        <div className="flex gap-2">
                          <h1 className="text-sm text-blue-500">Liquid Assets </h1>
                          <p> {investor.liquidAssets}</p>
                        </div>
                        <div className="flex gap-2">
                          <h1 className="text-sm text-blue-500">Industry to invest</h1>
                          <p> {investor.industryToInvest}</p>
                        </div>
                        <div className="flex gap-2">
                          <h1 className="text-sm text-blue-500">Amount willing to invest</h1>
                          <p> {investor.investmentAmount}</p>
                        </div>
                        <div className="flex gap-2">
                          <h1 className="text-sm text-blue-500">Country to Relocate</h1>
                          <p> {investor.relocationCountry}</p>
                        </div>
                        <div className="flex gap-2">
                          <h1 className="text-sm text-blue-500">Time to Relocate</h1>
                          <p> {investor.relocationTimeframe}</p>
                        </div>
                        <div className="flex gap-2">
                          <h1 className="text-sm text-blue-500">can you provide evidence of liquid assets </h1>
                          <p> {investor.canProvideLiquidityEvidence == true ? "Yes" : "No"}</p>
                        </div>
                      </div>
                      <Link href={"/sign-in"}>
                        <Button variant="outline" className="bg-blue-500 hover:bg-blue-600 text-white hover:text-white">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                      </Link>
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
