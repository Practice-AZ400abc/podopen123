"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import InvestorProfile from "@/components/InvestorProfile";
import { jwtDecode } from "jwt-decode";

const Page = () => {
    const router = useRouter();
    const [investorData, setInvestorData] = useState(null);
    const { id } = useParams(); // Import from next/navigation

    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.back();
        }

        const user = jwtDecode(token);
        setUser(user);

        sessionStorage.removeItem("seekerId");
    }, [])

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
            <InvestorProfile investor={investorData} user={user} />
        </div>
    );
};

export default Page;
