"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import InvestorProfile from "@/components/InvestorProfile";

const Page = () => {
    const [investorData, setInvestorData] = useState(null);
    const { id } = useParams(); // Import from next/navigation

    useEffect(() => {
        if (!id) return;

        const fetchInvestorData = async () => {
            try {
                const response = await fetch(`/api/search/seeker/${id}`);
                if (!response.ok) throw new Error("Failed to fetch data");
                const data = await response.json();
                setInvestorData(data);
                console.log("Investor data:", data);
            } catch (error) {
                console.error("Error fetching investor data:", error);
            }
        };

        fetchInvestorData();
    }, [id]); // Dependency array should include id

    if (!investorData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen  p-4 mx-auto container">
            <InvestorProfile investorData={investorData} />
        </div>
    );
};

export default Page;
