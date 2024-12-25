"use client"

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'; // To get query params
import { COUNTRIES, INDUSTRIES } from "@/lib/constants";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Filter } from 'lucide-react';

const ProjectsSearch = () => {
    const [listings, setListings] = useState([]); // Store fetched listings
    const [selectedIndustry, setSelectedIndustry] = useState(""); // Store selected industry filter
    const searchParams = useSearchParams(); // Get query params from the URL
    const country = searchParams.get("country"); // Extract 'country' parameter
    const router = useRouter(); // Router for navigating with query params

    const fetchListings = async (country) => {
        try {
            const response = await fetch(`/api/search/listing?country=${country}`);
            if (!response.ok) {
                throw new Error
            }
            const data = await response.json();
            setListings(data);
        } catch (error) {
            console.error("Error fetching listings:", error);
        }
    };

    useEffect(() => {
        if (country) fetchListings(country); // Fetch listings when the country changes
    }, [country]);

    useEffect(() => {
        const filteredListings = selectedIndustry
            ? listings.filter((listing) => listing.investmentIndustry === selectedIndustry)
            : listings;

        console.log("Filtered Listings:", filteredListings); // Log filtered listings to console
    }, [listings, selectedIndustry]);

    const handleIndustryChange = (value) => {
        setSelectedIndustry(value); // Update selected industry
    };

    const handleCountryChange = (country) => {
        // Update the URL with the selected country and refresh the page
        router.push(`/Projects-search?country=${country}`);
    };

    return (
        <div className='flex justify-center flex-col items-center gap-2 w-full'>
            <div className='mx-auto rounded-lg w-[90%] bg-gray-50 mt-10 h-screen p-2 gap-4 flex items-start'>
                <div className='w-full mt-4 flex justify-between gap-4 flex-wrap'>
                    {/* Filters */}
                    <div className='bg-white p-4 rounded-lg w-[20%]'>
                        <div className='w-full flex justify-between'>
                            <h1 className=' font-bold text-blue-400'>Apply Filters</h1>
                            <Filter />
                        </div>
                        {/* Dropdown for country filter */}
                        <div className='mt-4'>
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
                        {/* Dropdown for industry filter */}
                        <div className='mt-4'>
                            <Select value={selectedIndustry} onValueChange={handleIndustryChange}>
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
                    <div className='bg-white p-4 rounded-lg w-[70%] mx-auto'>
                        <div>
                            <h1 className='text-2xl font-bold text-blue-400'>Projects Listings</h1>
                        </div>
                        <div className='mt-4 bg-gray-50 w-full p-4 rounded-lg '>
                            {listings.map((listing) => (
                                <div key={listing.id} className='bg-white p-4 rounded-lg border mt-4 flex flex-col gap-2'>
                                    <h1 className='text-2xl font-bold underline text-blue-400'>{listing.projectDescription}</h1>
                                    <div className='flex gap-1 items-center'>
                                        <h1 className='font-bold'>Country where investment:</h1>
                                        <p className='text-gray-800  w-fit p-2 rounded-md bg-blue-100'>  {listing.countryForInvestment}</p>
                                    </div>
                                    <div className='flex gap-1 items-center'>
                                        <h1 className='font-bold'>Minimum investment:</h1>
                                        <p className='text-gray-800  w-fit p-2 rounded-md bg-blue-100'>  {listing.minimumInvestment}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsSearch;
