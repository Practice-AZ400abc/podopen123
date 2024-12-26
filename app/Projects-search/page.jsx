"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { COUNTRIES, INDUSTRIES } from "@/lib/constants";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import ProjectCard from "@/components/ProjectCard"; // Import the ProjectCard component
import Spinner from "@/components/Spinner";

const ProjectsSearch = () => {
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [selectedIndustry, setSelectedIndustry] = useState("");
    const searchParams = useSearchParams();
    const country = searchParams.get("country");
    const router = useRouter();
    const seenImpressions = useRef(new Set()); // Track listings with updated impressions

    const fetchListings = async (country) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/search/listing?country=${country}`);
            if (!response.ok) throw new Error();
            const data = await response.json();
            setListings(data);
            setFiltered(data);
        } catch (error) {
            console.error("Error fetching listings:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateImpressions = async (listingId) => {
        try {
            await fetch(`/api/listing/${listingId}/impression`, { method: "POST" });
        } catch (error) {
            console.error("Error updating impressions:", error);
        }
    };

    const updateClicks = async (listingId) => {
        try {
            await fetch(`/api/listing/${listingId}/click`, { method: "POST" });
        } catch (error) {
            console.error("Error updating clicks:", error);
        }
    };

    useEffect(() => {
        if (country) fetchListings(country);
    }, [country]);

    useEffect(() => {
        const filteredListings = selectedIndustry
            ? listings.filter(
                (listing) => listing.investmentIndustry === selectedIndustry
            )
            : listings;

        setFiltered(filteredListings);
    }, [listings, selectedIndustry]);

    const handleIndustryChange = (value) => {
        setSelectedIndustry(value);
    };

    const handleCountryChange = (country) => {
        router.push(`/Projects-search?country=${country}`);
    };

    return (
        <div className="flex justify-center flex-col items-center gap-2 w-full">
            <div className="mx-auto rounded-lg w-[90%] bg-gray-50 mt-10 h-screen p-2 gap-4 flex items-start">
                <div className="w-full mt-4 flex justify-between gap-4 flex-wrap">
                    {/* Filters */}
                    <div className="bg-white p-4 rounded-lg w-[20%]">
                        <div className="w-full flex justify-between">
                            <h1 className="font-bold text-blue-400">Apply Filters</h1>
                            <Filter />
                        </div>
                        <div className="mt-4">
                            <Select value={country} onValueChange={handleCountryChange}>
                                <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Select country where you need investment" />
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
                        <div className="mt-4">
                            <Select
                                value={selectedIndustry}
                                onValueChange={handleIndustryChange}
                            >
                                <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Select Industry" />
                                </SelectTrigger>
                                <SelectContent>
                                    {INDUSTRIES.map((industry) => (
                                        <SelectItem key={industry} value={industry}>
                                            {industry}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Projects Listings */}
                    <div className="bg-white p-4 rounded-lg w-[70%] mx-auto">
                        <div>
                            <h1 className="text-2xl font-bold text-blue-400">
                                Projects Listings
                            </h1>
                        </div>
                        <div className="mt-4 bg-gray-50 w-full p-4 rounded-lg">
                            {loading ? (
                                <Spinner />
                            ) : (
                                filtered.map((listing) => (
                                    <ProjectCard
                                        key={listing._id}
                                        listing={listing}
                                        updateImpressions={updateImpressions}
                                        updateClicks={updateClicks}
                                        seenImpressions={seenImpressions}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsSearch;
