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
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Chart } from "./Chart";
import Spinner from "@/components/Spinner";

const Wrapper = () => {
    const [token, setToken] = useState(null);
    const [listings, setListings] = useState([]);
    const [analytics, setAnalytics] = useState({
        totalListings: 0,
        totalImpressions: 0,
        activeListings: 0,
        expiredListings: 0,
        totalLast30DaysImpressions: 0, // We will use this value for the chart
    });
    const [loading, setLoading] = useState(false);
    const [activeSection, setActiveSection] = useState('listings');

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
    }, []);

    // Fetch user listings
    const fetchUserListings = async () => {
        try {
            setLoading(true);
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
            setListings(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch analytics data
    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/analytics", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch analytics");
            }

            const data = await response.json();
            setAnalytics(data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchUserListings();
            fetchAnalytics(); // Fetch analytics when the token is available
        }
    }, [token]);

    // Function to refetch listings when a deletion happens
    const refreshListings = () => {
        setListings([]);
        fetchUserListings();
    };

    return (
        <div className="w-full flex items-start justify-start gap-10">
            <div className="w-[10%] border rounded-md bg-white p-5">
                <ul className="w-full flex items-start justify-center flex-col gap-5">
                    <Link href="/profile" className="text-md underline">
                        Profile
                    </Link>
                    <button onClick={() => setActiveSection('analytics')} className="text-md underline">
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
                                                value={null}
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
                        {loading ? <Spinner /> : null}
                    </div>

                    <div className="w-[90%] flex flex-col items-start justify-start gap-5 rounded-md">
                        {listings.length === 0 && !loading ? (
                            <p>No listings found.</p>
                        ) : (
                            listings.map((listing) => (
                                <Listings
                                    key={listing._id}
                                    listing={listing}
                                    refreshListings={refreshListings}
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
                            <h1 className="text-center mb-4 font-bold text-blue-400 text-4xl">{analytics.totalListings}</h1>
                        </Card>
                        <Card className="">
                            <CardHeader>
                                <CardTitle>Total Impressions</CardTitle>
                            </CardHeader>
                            <h1 className="text-center mb-4 font-bold text-blue-400 text-4xl">{analytics.totalImpressions}</h1>
                        </Card>
                        <Card className="">
                            <CardHeader>
                                <CardTitle>Active Listings</CardTitle>
                            </CardHeader>
                            <h1 className="text-center mb-4 font-bold text-blue-400 text-4xl">{analytics.activeListings}</h1>
                        </Card>
                        <Card className="">
                            <CardHeader>
                                <CardTitle>Expired Listings</CardTitle>
                            </CardHeader>
                            <h1 className="text-center mb-4 font-bold text-blue-400 text-4xl">{analytics.expiredListings}</h1>
                        </Card>
                    </div>

                    {/* Loading Spinner for Analytics */}
                    {loading ? <Spinner /> : <Chart totalLast30DaysImpressions={analytics.totalLast30DaysImpressions} />}
                </div>
            )}
        </div>
    );
};

export default Wrapper;
