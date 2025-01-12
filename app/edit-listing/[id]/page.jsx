"use client";
import React, { useState, useEffect } from "react";
import {
    COUNTRIES,
    INDUSTRIES,
    INVESTMENT_RANGES,
} from "@/lib/constants";
import ReactSelect from "react-select";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import MediaUpload from "@/components/UploadMedia";

const countryOptions = COUNTRIES.map((country) => ({
    value: country,
    label: country,
}));

const EditListingForm = ({ initialFormData = {} }) => {
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
        ...initialFormData,
    });

    useEffect(() => {
        setFormData(initialFormData);
    }, [initialFormData]);

    const handleFormInput = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleCountryChange = (selectedOptions) => {
        setFormData((prev) => ({
            ...prev,
            countriesForInvestors: selectedOptions
                ? selectedOptions.map((option) => option.value)
                : [],
        }));
    };

    return (
        <div className="flex flex-col gap-4">
            <form className="w-full flex flex-col md:flex-row  h-[60vh] items-center justify-evenly gap-4 mt-10">
                <div className="flex flex-col gap-2 w-[30%]">
                    <label className="text-sm font-medium text-gray-700">
                        Short description title of your sponsorship *
                    </label>
                    <input
                        maxLength={30}
                        value={formData.sponsorShipDescription || ""}
                        onChange={(e) =>
                            handleFormInput("sponsorShipDescription", e.target.value)
                        }
                        type="text"
                        placeholder="Title of Listing"
                        className="p-2 bg-gray-50 rounded-md w-full border"
                    />
                    <textarea
                        placeholder="Investment project Description"
                        value={formData.projectDescription || ""}
                        onChange={(e) =>
                            handleFormInput("projectDescription", e.target.value)
                        }
                        maxLength={400}
                        className="h-[150px] bg-gray-50 p-2 rounded-md border"
                    ></textarea>

                    <label className="text-sm font-medium text-gray-700">
                        Timetable to get visa investor investment
                    </label>
                    <input
                        type="date"
                        value={formData.investmentTimeTable || ""}
                        onChange={(e) =>
                            handleFormInput("investmentTimeTable", e.target.value)
                        }
                        className="p-2 bg-gray-50 border rounded-md w-full"
                        min={new Date().toISOString().split("T")[0]}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                        Country where you need investment to sponsor visa *
                    </label>
                    <select
                        value={formData.countryForInvestment || ""}
                        onChange={(e) =>
                            handleFormInput("countryForInvestment", e.target.value)
                        }
                        className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
                    >f
                        <option value="">Select a country</option>
                        {COUNTRIES.map((country, index) => (
                            <option key={index} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>

                    <label className="text-sm font-medium text-gray-700">
                        Seeking investors in these industries*
                    </label>
                    <select
                        value={formData.investmentIndustry || ""}
                        onChange={(e) =>
                            handleFormInput("investmentIndustry", e.target.value)
                        }
                        className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
                    >
                        <option value="">Select an industry</option>
                        {INDUSTRIES.map((industry, index) => (
                            <option key={index} value={industry}>
                                {industry}
                            </option>
                        ))}
                    </select>

                    <label className="block text-sm font-medium mb-2">
                        Seeking investors from these countries
                    </label>
                    <ReactSelect
                        isMulti
                        options={countryOptions}
                        value={formData.countriesForInvestors?.map((country) => ({
                            value: country,
                            label: country,
                        })) || []}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        placeholder="Select countries"
                        onChange={handleCountryChange}
                    />

                    <label className="text-sm font-medium text-gray-700">
                        Minimum Investment needed (in USD dollars)*
                    </label>
                    <select
                        value={formData.minimumInvestment || ""}
                        onChange={(e) =>
                            handleFormInput("minimumInvestment", e.target.value)
                        }
                        className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
                    >
                        <option value="">Select investment range</option>
                        {INVESTMENT_RANGES.map((investment, index) => (
                            <option key={index} value={investment}>
                                {investment}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">WhatsApp</label>
                    <PhoneInput
                        value={formData.whatsapp || ""}
                        onChange={(phone) =>
                            handleFormInput("whatsapp", phone)
                        }
                        defaultCountry="ua"
                        placeholder="Enter phone number"
                    />

                    <label className="text-sm font-medium text-gray-700">Telegram</label>
                    <PhoneInput
                        value={formData.telegram || ""}
                        onChange={(phone) =>
                            handleFormInput("telegram", phone)
                        }
                        defaultCountry="ua"
                        placeholder="Enter phone number"
                    />

                    <label className="text-sm font-medium text-gray-700">
                        Contact phone number *
                    </label>
                    <PhoneInput
                        value={formData.phone || ""}
                        onChange={(phone) =>
                            handleFormInput("phone", phone)
                        }
                        defaultCountry="ua"
                        placeholder="Enter phone number"
                    />

                    <label className="text-sm font-medium text-gray-700">
                        Contact email *
                    </label>
                    <input
                        value={formData.contactEmail || ""}
                        onChange={(e) => handleFormInput("contactEmail", e.target.value)}
                        type="email"
                        placeholder="Enter email"
                        className="p-2 bg-gray-50 rounded-md w-full border"
                    />
                </div>
            </form>
            <div>
                <MediaUpload
                    value={formData.attachments} // Combine images and PDFs into a single array for rendering
                    onChange={(url) => {
                        setFormData({
                            ...formData,
                            attachments: [...formData.attachments, url],
                        });
                    }}
                    onRemove={(url) => {
                        setFormData({
                            ...formData,
                            attachments: formData.attachments.filter(
                                (attachment) => attachment !== url
                            ),
                        });
                    }}
                />
            </div>
        </div>
    );
};

export default EditListingForm;