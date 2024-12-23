"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import ListingImage from "@/app/ListingImage.png";
import Image from "next/image";
import ListingForm from "@/components/ListingForm";
import UploadMedia from "@/components/UploadMedia";
import PreviewListing from "@/components/PreviewListing";

const CreateListing = () => {
    const [activeStep, setActiveStep] = useState(1);

    const handleNext = () => {
        setActiveStep((prev) => Math.min(prev + 1, 4)); // Max 4 steps
    };

    const handleBack = () => {
        setActiveStep((prev) => Math.max(prev - 1, 1)); // Min 1 step
    };

    const progressWidth = `${((activeStep - 1) / 3) * 100}%`; // Ensure 100% on step 4

    return (
        <div className="mx-auto container flex flex-col items-center justify-center">
            {/* Main Content */}
            <div
                className="w-full flex h-screen overflow-hidden relative transition-all duration-500"
            >
                {/* Sliding Container */}
                <div
                    className="flex w-full"
                    style={{
                        transform: `translateX(-${(activeStep - 1) * 100}%)`,
                        transition: "transform 0.5s ease-in-out",
                    }}
                >
                    {/* Step 1 */}
                    <div className="flex-none w-full h-[70vh] flex items-center justify-between">
                        <div className="flex gap-2 flex-col">
                            <span className="p-2 border rounded-full w-fit">Step 1</span>
                            <h1 className="text-4xl text-black max-w-[500px]">
                                Tell us about your project that needs funding from visa investor
                            </h1>
                        </div>
                        <div className="w-[50%]">
                            <Image
                                src={ListingImage}
                                className="object-cover w-full"
                                width={200}
                                height={200}
                                alt="Listing Image"
                            />
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex-none w-full h-[70vh] flex items-center justify-between">
                        <div className="w-full">
                            <div className="flex flex-col gap-2 w-full">
                                <span className="p-2 border rounded-full w-fit">Step 2</span>
                                <h1 className="text-2xl">
                                    Please Fill out these fields to{" "}
                                    <span className="text-blue-400 font-bold">Create Listing</span>
                                </h1>
                                <ListingForm />
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex-none w-full h-[70vh] flex items-center justify-between">
                        <div className="w-full">
                            <div className="flex flex-col gap-2 w-full">
                                <span className="p-2 border rounded-full w-fit">Step 3</span>
                                <h1 className="text-2xl">Upload Media</h1>
                                <UploadMedia />
                                <div className="flex mt-10">
                                    {/* Display images here after uploading */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="flex-none w-full h-[70vh] flex items-center justify-between">
                        <div className="w-full flex items-center justify-between">
                            <div className="flex flex-col gap-2 w-full">
                                <span className="p-2 border rounded-full w-fit">Step 4</span>
                                <h1 className="text-2xl">Review and Publish Your Listing</h1>
                                <p>Ensure everything is correct before publishing your listing.</p>
                            </div>
                            <PreviewListing />
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="container m-auto sticky flex flex-col absolute bottom-0 bg-white">
                <div className="w-full h-3 rounded-full bg-gray-200">
                    <div
                        className="h-3 rounded-full bg-gray-900 transition-all duration-500 ease-in-out"
                        style={{ width: progressWidth }}
                    ></div>
                </div>

                {/* Navigation Buttons */}
                <div className="w-full flex items-center justify-between mt-6">
                    <button
                        onClick={handleBack}
                        className={`underline ${activeStep === 1 ? "invisible" : ""}`}
                    >
                        Back
                    </button>
                    {activeStep === 4 ? (
                        <Button onClick={() => alert("Listing Published!")}>
                            Publish Listing
                        </Button>
                    ) : (
                        <Button onClick={handleNext}>Next</Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateListing;
