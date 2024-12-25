"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import Listings from "./Listings";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectItem,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Chart } from "./Chart";


const Wrapper = () => {
    const [token, setToken] = useState(null);
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state for fetch operations
    const [activeSection, setActiveSection] = useState('listings');
    const impressions = 44;
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
    }, []);

    const fetchUserListings = async () => {
        try {
            setLoading(true); // Set loading to true when fetching
            const response = await fetch("/api/listing", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch user listings");
            }

            const data = await response.json();
            console.log(data);
            setListings(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Set loading to false after fetch is done
        }
    };

    useEffect(() => {
        if (token) {
            fetchUserListings();
        }
    }, [token]);

    // Function to refetch listings when a deletion happens
    const refreshListings = () => {
        setListings([]); // Optionally clear current listings while fetching new ones
        fetchUserListings(); // Call the fetch function again
    };

    return (
        <div className="w-full flex items-start justify-start gap-10">
            <div className="w-[10%] border rounded-md bg-white p-5">
                <ul className="w-full flex items-start justify-center flex-col gap-5">
                    <Link href="/profile" className="text-md underline">
                        Profile
                    </Link>
                    <button onClick={() => setActiveSection('analytics')} className="text-md underline" >
                        Analytics
                    </button>
                    <button onClick={() => setActiveSection('listings')} className="text-md underline">
                        Your Listings
                    </button>
                </ul>
            </div>


            {/* Listings Wrapper */}
            {activeSection === 'listings' && (
                <div className="w-[90%] flex flex-col items-start justify-start gap-5">
                    <div className="w-[90%] border rounded-md bg-white p-5">
                        <div className="flex items-start justify-between">
                            <h1 className="text-4xl font-bold">Your Listings</h1>
                            <div className="w-[200px]">
                                <Select>
                                    <SelectTrigger className="h-12">
                                        <div className="flex items-center gap-2">
                                            <Filter />
                                            <SelectValue
                                                className="text-lg font-bold"
                                                value={null} // Ensure no value is selected initially
                                                placeholder="Status"
                                            />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="sold_expired">Sold / Expired</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Loading State */}
                        {loading && <p>Loading your listings...</p>}
                    </div>

                    <div className="w-[90%] flex flex-col items-start justify-start gap-5 rounded-md">
                        {/* Render Listings */}
                        {listings.length === 0 && !loading ? (
                            <p>No listings found.</p>
                        ) : (
                            listings.map((listing) => (
                                <Listings
                                    key={listing._id}
                                    listing={listing}
                                    refreshListings={refreshListings} // Pass the refresh function
                                />
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* Analytics Wrapper */}
            {activeSection === 'analytics' && (
                <div className="w-[90%] border rounded-md bg-white p-5">
                    <h1 className="text-4xl font-bold">Analytics</h1>
                    <div className="flex items-center justify-start gap-5 mt-10 ">
                        <Card className="w-[200px]">
                            <CardHeader>
                                <CardTitle>Total Listings</CardTitle>
                            </CardHeader>
                            <h1 className="text-center mb-4 font-bold text-blue-400 text-4xl">{listings.length}</h1>
                        </Card>
                        <Card className="">
                            <CardHeader>
                                <CardTitle>Total Impressions</CardTitle>
                            </CardHeader>
                            <h1 className="text-center mb-4 font-bold text-blue-400 text-4xl">{impressions}</h1>
                        </Card>
                        <Card className="">
                            <CardHeader>
                                <CardTitle>Active Listings</CardTitle>
                            </CardHeader>
                            <h1 className="text-center mb-4 font-bold text-blue-400 text-4xl">{2}</h1>
                        </Card>
                        <Card className="">
                            <CardHeader>
                                <CardTitle>Expired Listings</CardTitle>
                            </CardHeader>
                            <h1 className="text-center mb-4 font-bold text-blue-400 text-4xl">{3}</h1>
                        </Card>

                    </div>

                    <Chart />

                </div>
            )}
        </div>
    );
};

export default Wrapper;
