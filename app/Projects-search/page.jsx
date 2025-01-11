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
import ProjectCard from "@/components/ProjectCard";
import Spinner from "@/components/Spinner";

const ProjectsSearch = () => {
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [selectedIndustry, setSelectedIndustry] = useState("");
    const [sortOption, setSortOption] = useState(""); // Sort option selected
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const searchParams = useSearchParams();
    const country = searchParams.get("country");
    const router = useRouter();
    const seenImpressions = useRef(new Set());

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

    // Apply filters and sorting
    useEffect(() => {
        let filteredListings = selectedIndustry
            ? listings.filter((listing) => listing.investmentIndustry === selectedIndustry)
            : listings;

        // Sorting logic
        if (sortOption === "investmentAmountAsc") {
            filteredListings = filteredListings.sort((a, b) => {
                const amountA = parseFloat(a.minimumInvestment.replace(/[^0-9.-]+/g, ""));
                const amountB = parseFloat(b.minimumInvestment.replace(/[^0-9.-]+/g, ""));
                return amountA - amountB;
            });
        } else if (sortOption === "investmentAmountDesc") {
            filteredListings = filteredListings.sort((a, b) => {
                const amountA = parseFloat(a.minimumInvestment.replace(/[^0-9.-]+/g, ""));
                const amountB = parseFloat(b.minimumInvestment.replace(/[^0-9.-]+/g, ""));
                return amountB - amountA;
            });
        } else if (sortOption === "datePostedAsc") {
            filteredListings = filteredListings.sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateA - dateB;
            });
        } else if (sortOption === "datePostedDesc") {
            filteredListings = filteredListings.sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateB - dateA;
            });
        }

        setFiltered(filteredListings);
        setCurrentPage(1);
    }, [listings, selectedIndustry, sortOption]);

    const handleIndustryChange = (value) => {
        setSelectedIndustry(value);
    };

    const handleSortChange = (value) => {
        setSortOption(value);
    };

    const handleCountryChange = (country) => {
        router.push(`/Projects-search?country=${country}`);
    };

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentListings = filtered.slice(startIndex, startIndex + itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
        <div className="flex justify-center flex-col items-center gap-2 w-full">
            <div className="mt-4 w-[80%] m-auto">
                <div className="border rounded-md p-4 border-blue-400">
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
            </div>
            <div className="mx-auto rounded-lg w-[80%] mt-4 h-screen p-2 gap-4 flex items-start">
                <div className="w-full flex justify-between gap-4 flex-wrap">
                    {/* Filters */}
                    <div className="bg-white p-4 rounded-lg w-[20%]">
                        <div className="w-full flex justify-between">
                            <h1 className="font-bold text-blue-400">Apply Filters</h1>
                            <Filter />
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
                        <div className="mt-4">
                            <Select value={sortOption} onValueChange={handleSortChange}>
                                <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Sort By" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="investmentAmountAsc">
                                        Investment Amount Ascending
                                    </SelectItem>
                                    <SelectItem value="investmentAmountDesc">
                                        Investment Amount Descending
                                    </SelectItem>
                                    <SelectItem value="datePostedAsc">
                                        Date Posted Ascending
                                    </SelectItem>
                                    <SelectItem value="datePostedDesc">
                                        Date Posted Descending
                                    </SelectItem>
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
                            <p>Results: {filtered.length}</p>
                        </div>
                        <div className="mt-4 w-full p-4 rounded-lg">
                            {loading ? (
                                <Spinner />
                            ) : currentListings.length === 0 && !loading ? (
                                <p className="text-center">
                                    Sorry no results for your query. Please revise your criteria.
                                </p>
                            ) : (
                                currentListings.map((listing) => (
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
                        {/* Pagination Controls */}
                        <div className="flex justify-between items-center mt-4">
                            <button
                                className="btn btn-secondary"
                                disabled={currentPage === 1}
                                onClick={handlePrevPage}
                            >
                                Previous
                            </button>
                            <p>
                                Page {currentPage} of {totalPages}
                            </p>
                            <button
                                className="btn btn-secondary"
                                disabled={currentPage === totalPages}
                                onClick={handleNextPage}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsSearch;
