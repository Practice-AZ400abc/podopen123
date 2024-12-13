"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, MessageSquare, Building, Flag } from "lucide-react";
import { COUNTRIES, COUNTRY_CODES, INDUSTRIES, INVESTMENT_RANGES, RELOCATION_TIMEFRAMES } from "@/lib/constants";

export default function SearchPage() {
  const [location, setLocation] = useState("");
  const [keywords, setKeywords] = useState("");

  const Listings = [
    {
      id: 1,
      FirstName: "Faizan",
      lastName: "Haider",
      location: "Canada",
      isNew: true,
      postedDate: "2 days ago",
      countryOfBirth:"United States",
      Nationality:"USA",
      NetWorth:"$5 Million to $10 Million",
      LiquidAssets:"$5 Million Dollers",
      Telegram:"+1846328239",
      Whatsapp:"+1846328239",
      PhoneNumber:"+1846328239",
      IndustryToInvest:"construction",
      AmountWillingToInvest:"$1 Million to $5 Million Dollers",
      Evidence:"Yes",
      InstagramIDlink:"http://localhost:3000/search",
      LinkedinProfilelink:"http://localhost:3000/search",
      Visibilty:"Public",
      Comment: "Are you looking for Visa...",
    },
  
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="Job title, keywords, or company"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="City, state, or zip code"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Search className="w-4 h-4 mr-2" />
                  Search Investor
                </Button>
              </div>
            </div>
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

                  <div className="space-y-2">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Country of Nationality</h3>
                      <select name="" id="" className="w-full border p-2">
                        {COUNTRIES.map((country) => (
                          <option className="text-sm font-medium mb-2" key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Dual citizenship</h3>
                      <select name="" id="" className="w-full border p-2" defaultValue={"Select"}>
                        <option value="yes">Yes</option>
                        <option value="yes">No</option>
                      </select>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2"> Networth (in usd dollars) </h3>
                      <select name="" id="" className="w-full border p-2">
                        {INVESTMENT_RANGES.map((range) => (
                          <option className="text-sm font-medium mb-2" key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2"> Liquid assets (cash or cash equivalents in usd dollars) </h3>
                      <select name="" id="" className="w-full border p-2">
                        {INVESTMENT_RANGES.map((range) => (
                          <option className="text-sm font-medium mb-2" key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Industry to invest </h3>
                      <select name="" id="" className="w-full border p-2">
                        {INDUSTRIES.map((industry) => (
                          <option className="text-sm font-medium mb-2" key={industry} value={industry}>
                            {industry}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Amount willing to invest (in USD dollars) </h3>
                      <select name="" id="" className="w-full border p-2">
                        {INVESTMENT_RANGES.map((investment) => (
                          <option className="text-sm font-medium mb-2" key={investment} value={investment}>
                            {investment}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Country to relocate to (where you seek visa) </h3>
                      <select name="" id="" className="w-full border p-2">
                        {COUNTRIES.map((country) => (
                          <option className="text-sm font-medium mb-2" key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2"> Timetable to relocate</h3>
                      <select name="" id="" className="w-full border p-2">
                        {RELOCATION_TIMEFRAMES.map((timeframe) => (
                          <option className="text-sm font-medium mb-2" key={timeframe} value={timeframe}>
                            {timeframe}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">  Can you provide evidence of your liquid assets?</h3>
                      <select name="" id="" className="w-full border p-2">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium mb-2">Sort by</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox id="entry" />
                      <label htmlFor="entry" className="ml-2 text-sm">high net worth to lowest net worth</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="mid" />
                      <label htmlFor="mid" className="ml-2 text-sm"> highest lowest amount to invest</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="senior" />
                      <label htmlFor="senior" className="ml-2 text-sm">Country of nationality</label>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Job Listings */}
          <div className="col-span-9">
            <div className="space-y-4">
              {Listings.map((Listing) => (
                <Card key={Listing.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-blue-600 hover:underline cursor-pointer">
                        {Listing.FirstName} {Listing.lastName}
                      </h2>


                     <div className="flex gap-4
                     ">
                      
                     <div className="flex items-center gap-2 text-black mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{Listing.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-black mt-1">
                        <Building className="w-4 h-4 text-black" />
                        <span>{Listing.IndustryToInvest}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-black mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{Listing.countryOfBirth}</span>
                      </div>
                      
                     </div>
                     

                      <p className="text-gray-600 mt-3">{Listing.Comment}</p>
                      <div className="flex items-center gap-4 mt-4">
                        <span className="text-gray-500 text-sm">{Listing.postedDate}</span>
                        {Listing.isNew && (
                          <Badge className="bg-green-500">New</Badge>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" className="whitespace-nowrap">
                      <Flag className="w-4 h-4 mr-2" />
                      View Full Listing
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}