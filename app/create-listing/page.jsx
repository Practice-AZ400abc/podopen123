"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import ListingImage from "@/app/ListingImage.png";
import Image from "next/image";
import ListingForm from "@/components/ListingForm";
import UploadMedia from "@/components/UploadMedia";
import PreviewListing from "@/components/PreviewListing";

const CreateListing = () => {
    const router = useRouter();
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            router.push("/login");
        }
        setToken(storedToken);
    }, []);

    const [activeStep, setActiveStep] = useState(1);

    // Form data state to store all the information
    const [formData, setFormData] = useState({
        sponsorShipDescription: "",
        projectDescription: "",
        investmentTimeTable: "",
        countryForInvestment: "",
        investmentIndustry: "",
        countriesForInvestors: [],
        minimumInvestment: "",
        whatsapp: "",
        telegram: "",
        phone: "",
        contactEmail: "",
        images: [],
    });

    const handleNext = () => {
        setActiveStep((prev) => Math.min(prev + 1, 4)); // Max 4 steps
    };

    const handleBack = () => {
        setActiveStep((prev) => Math.max(prev - 1, 1)); // Min 1 step
    };

    const handleSubmit = async () => {
        console.log(formData);
        
        try {
            const res = await fetch("/api/listing", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error("Failed to create listing");
            }

            alert("Listing published successfully!");
        } catch (error) {
            console.error(error);
            alert("Error publishing the listing");
        }
    };

    const progressWidth = `${((activeStep - 1) / 3) * 100}%`;

    return (
        <div className="mx-auto container flex flex-col items-center justify-center">
            {/* Main Content */}
            <div className="w-full flex h-screen overflow-hidden relative transition-all duration-500">
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
                            <ListingForm formData={formData} setFormData={setFormData} />
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex-none w-full h-[70vh] flex items-center justify-between">
                        <div className="w-full">
                            <UploadMedia formData={formData} setFormData={setFormData} />
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="flex-none w-full h-[70vh] flex items-center justify-between">
                        <div className="w-full">
                            <PreviewListing formData={formData} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="container m-auto sticky flex flex-col bottom-0 bg-white">
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
                        <Button onClick={handleSubmit}>Publish Listing</Button>
                    ) : (
                        <Button onClick={handleNext}>Next</Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateListing;
