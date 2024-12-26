"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";

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
            <h1 className="text-2xl font-bold underline text-blue-400">
                {listing.projectDescription}
            </h1>
            <div className="flex gap-1 items-center">
                <h1 className="font-bold">Country where investment:</h1>
                <p className="text-gray-800 w-fit p-2 rounded-md bg-blue-100">
                    {listing.countryForInvestment}
                </p>
            </div>
            <div className="flex gap-1 items-center">
                <h1 className="font-bold">Minimum investment:</h1>
                <p className="text-gray-800 w-fit p-2 rounded-md bg-blue-100">
                    {listing.minimumInvestment}
                </p>
            </div>
        </div>
    );
};

export default ProjectCard;
