"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { Arrow } from "@radix-ui/react-select";
import { ArrowRightIcon } from "lucide-react";

const ProjectCard = ({ listing, updateImpressions, updateClicks, seenImpressions }) => {
    const { ref, inView } = useInView({ threshold: 0.5 }); // Trigger when 50% visible
    const router = useRouter();

    useEffect(() => {
        if (inView && !seenImpressions.current.has(listing._id)) {
            updateImpressions(listing._id);
            seenImpressions.current.add(listing._id); // Mark impression as tracked
        }
    }, [inView, listing._id, updateImpressions]);

    const handleClick = () => {
        updateClicks(listing._id); // Track click
        router.push(`/Projects/${listing._id}`); // Navigate to dynamic page
    };

    return (
        <div
            ref={ref}
            className="bg-white p-4 rounded-lg border mt-4 flex flex-col gap-2 cursor-pointer"
            onClick={handleClick}
        >
            <p className='text-gray-500 font-thin'>id: {listing._id}</p>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-blue-400">
                    {listing.projectDescription}
                </h1>
                <div className="flex items-center gap-2">
                    <Link href="/Projects/${listing._id}" className="underline">View Full Listing</Link>
                    <ArrowRightIcon className="w-4 h-4 text-blue-400" />
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <div className="flex gap-1 items-center">
                    <h1 className="font-bold">Country where investment:</h1>
                    <p className="text-gray-800 w-fit p-2 rounded-md ">
                        {listing.countryForInvestment}
                    </p>
                </div>
                <div className="flex gap-1 items-center">
                    <h1 className="font-bold">Minimum investment:</h1>
                    <p className="text-gray-800 w-fit p-2 rounded-md ">
                        {listing.minimumInvestment}
                    </p>
                </div>
            </div>
            <div className="flex gap-1 items-center">
                <p>Pulished at:</p>
                <p className="text-gray-600 w-fit p-2 rounded-md text-sm">
                    {new Date(listing.createdAt).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};

export default ProjectCard;
