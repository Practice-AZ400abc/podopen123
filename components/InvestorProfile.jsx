"use client"; // Ensure this runs only on the client side

import Image from "next/image";
import React from "react";
import ContactVisaSeekerButton from "./ContactVisaSeekerButton";

const InvestorProfile = ({ investorData }) => {
    if (!investorData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-4">
                {investorData.avatarURL && (
                    <Image
                        src={investorData.avatarURL}
                        alt="Investor"
                        width={200}
                        height={200}
                        className="rounded-full"
                    />
                )}
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">{investorData.firstName}</h1>
                    <p className="text-lg text-gray-500">{investorData.email}</p>
                </div>
            </div>

            <div className="flex flex-col p-2 max-w-[800px] mt-10 mx-auto">
                <h1 className="text-2xl font-bold">Details</h1>
                <div className="flex flex-wrap justify-between items-start mt-10 w-full">
                    <div className="grid grid-cols-2 items-center gap-5">
                        <DetailRow label="Country of Nationality" value={investorData.nationality} />
                        <DetailRow label="Dual Citizenship" value={investorData.dualCitizenship ? "Yes" : "No"} />
                        <DetailRow label="Networth" value={investorData.netWorth} />
                        <DetailRow label="Liquid Assets" value={investorData.liquidAssets} />
                        <DetailRow label="Industry to invest" value={investorData.industryToInvest} />
                        <DetailRow label="Amount willing to invest" value={investorData.investmentAmount} />
                        <DetailRow label="Country to Relocate" value={investorData.relocationCountry} />
                        <DetailRow label="Time to Relocate" value={investorData.relocationTimeframe} />
                        <DetailRow
                            label="Can you provide evidence of liquid assets"
                            value={investorData.canProvideLiquidityEvidence ? "Yes" : "No"}
                        />
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        <ContactVisaSeekerButton investor={investorData} user={null} />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Reusable component for details
const DetailRow = ({ label, value }) => (
    <div className="flex gap-2">
        <h1 className="text-sm text-blue-500">{label}</h1>
        <p>{value || "N/A"}</p>
    </div>
);

export default InvestorProfile;
