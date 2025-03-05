"use client"; // Ensure this runs only on the client side

import Image from "next/image";
import React, { useState } from "react";
import Contactform from './contactform';
import { Button } from "./ui/button";

const InvestorProfile = ({ investor, user }) => {
    const [showContactForm, setShowContactForm] = useState(false);

    if (!investor) return null;

    
    const handleContactClick = () => {
        setShowContactForm(true);
    };


    return (
        <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-4">
                {investor.avatarURL && (
                    <Image
                        src={investor.avatarURL}
                        alt="Investor"
                        width={200}
                        height={200}
                        className="rounded-full"
                    />
                )}
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">{investor.firstName}</h1>
                    <p className="text-lg text-gray-500">{investor.contactEmail}</p>
                </div>
            </div>
            <div className=" mt-10  flex gap-2 flex-wrap">
                <Button className="bg-green-400 text-black hover:text-white hover:bg-green-300" onClick={handleContactClick}>Contact Investor</Button>
                {showContactForm && <Contactform investor={investor} setShowContactForm={setShowContactForm} user={user} />}
            </div>
            </div>
            <div className="flex flex-col p-2 max-w-[800px] mt-4 mx-auto">
                <h1 className="text-2xl font-bold">Details</h1>
                <div className="flex flex-wrap justify-between items-start mt-4 w-full">
                    <div className="grid grid-cols-2 items-center gap-5">
                        <DetailRow label="Firstname" value={investor.firstName} />
                        <DetailRow label="Lastname" value={investor.lastName} />

                        <DetailRow label="Company Name" value={investor.companyName} />
                        <DetailRow label="Country of Nationality" value={investor.nationality} />
                        <DetailRow label="Liquid Assets" value={investor.liquidAssets} />

                        <DetailRow label="Dual Citizenship" value={investor.dualCitizenship ? "Yes" : "No"} />
                        <DetailRow label="Networth" value={investor.netWorth} />
                        <DetailRow label="Liquid Assets" value={investor.liquidAssets} />
                        <DetailRow label="Industry to invest" value={investor.industryToInvest} />
                        <DetailRow label="Amount willing to invest" value={investor.investmentAmount} />
                        <DetailRow label="Country to Relocate" value={investor.relocationCountry} />
                        <DetailRow label="Time to Relocate" value={investor.relocationTimeframe} />
                        <DetailRow
                            label="Can you provide evidence of liquid assets"
                            value={investor.canProvideLiquidityEvidence ? "Yes" : "No"}
                        />
                    </div>


                </div>

            </div>
            <div className="flex flex-col p-2 max-w-[800px] mt-4 mx-auto">
                <h1 className="text-lg   w-fit  rounded-md font-bold">Contact Details</h1>
                <div className="flex flex-wrap justify-between items-start mt-4 w-full">
                    <div className="grid grid-cols-2 items-center gap-5">
                        <DetailRow label="Contact Email" value={investor.contactEmail} />
                        <DetailRow label="Contact Phone" value={investor.phone} />
                        <DetailRow label="Telegram" value={investor.telegram} />
                        <DetailRow label="Whatsapp" value={investor.whatsapp} />
                    </div>


                </div>

            </div>
            <div className="flex flex-col p-2 max-w-[800px] mt-4 mx-auto">
                <h1 className="text-lg   w-fit  rounded-md font-bold">Social Details</h1>
                <div className="flex flex-wrap justify-between items-start mt-4 w-full">
                    <div className="grid grid-cols-2 items-center gap-5">
                        <DetailRow label="Website URL" value={investor.websiteURL} />
                        <DetailRow label="Linkedin" value={investor.linkedin} />
                        <DetailRow label="Instagram" value={investor.instagram} />
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
