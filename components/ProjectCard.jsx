"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
        router.push(`/projects/${listing._id}`); // Navigate to dynamic page
    };

    const handleDownload = (e, fileUrl, index) => {
        e.stopPropagation(); // Prevent parent click event
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = `Listing-${listing._id}-Attachment-${index + 1}`;
        link.click();
    };

    const listingNumber = listing._id;

    return (
        <div
            ref={ref}
            className="bg-white p-4 rounded-lg border mt-4 flex flex-col gap-2 cursor-pointer"
            onClick={handleClick}
        >
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-600">
                    {listing.sponsorShipDescription}
                </h1>
                <div className="flex items-center gap-2">
                    <Link href={`/projects/${listing._id}`} className="underline">
                        View Full Listing
                    </Link>
                    <ArrowRightIcon className="w-4 h-4 text-blue-400" />
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <div className="flex gap-1 items-center">
                    <h1 className="font-bold">Country where investment is needed:</h1>
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
            <div className="flex gap-2 w-full items-center justify-between">
                <div className="flex gap-1 items-center">
                    <p>Published at:</p>
                    <p className="text-gray-600 w-fit p-2 rounded-md text-sm">
                        {new Date(listing.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex gap-1 items-center">
                    <p>Listing Number:</p>
                    <p className="text-gray-600 w-fit p-2 rounded-md text-sm">
                        {listingNumber.substring(0, 8)}
                    </p>
                </div>
            </div>
            {listing.attachments?.length > 0 && (
                <div className="mt-4">
                    <h2 className="font-bold text-lg">Attachments:</h2>
                    <div className="flex flex-wrap gap-4 mt-2">
                        {listing.attachments.map((fileUrl, index) => (
                            <div key={index} className="relative w-[100px] h-[100px]">
                                {fileUrl.endsWith(".pdf") ? (
                                    <div
                                        onClick={(e) => handleDownload(e, fileUrl, index)}
                                        className="bg-gray-100 w-full h-full flex items-center justify-center text-center text-sm cursor-pointer border rounded-md"
                                    >
                                        <span>PDF {index + 1}</span>
                                    </div>
                                ) : (
                                    <Image
                                        src={fileUrl}
                                        alt={`Attachment ${index + 1}`}
                                        width={100}
                                        height={100}
                                        className="object-cover rounded-md cursor-pointer"
                                        onClick={(e) => handleDownload(e, fileUrl, index)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectCard;
