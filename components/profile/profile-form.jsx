"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import profile from "@/assets/profile.png";
import InputField from "../input-field";
import {
  COUNTRIES,
  INDUSTRIES,
  INVESTMENT_RANGES,
  RELOCATION_TIMEFRAMES,
} from "@/lib/constants";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import ReactSelect from "react-select";

// Define options for the countries dropdown
const countryOptions = COUNTRIES.map((country) => ({
  value: country,
  label: country,
}));

const Profile = ({ email }) => {
  const [avatarURL, setAvatarURL] = useState(""); // Stores the uploaded avatar URL
  const [uploading, setUploading] = useState(false); // Tracks upload state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryOfBirth, setCountryOfBirth] = useState("");
  const [nationality, setNationality] = useState("");
  const [dualCitizenship, setDualCitizenship] = useState(false);
  const [netWorth, setNetWorth] = useState("");
  const [liquidAssets, setLiquidAssets] = useState("");
  const [telegram, setTelegram] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [phone, setPhone] = useState("");
  const [industryToInvest, setIndustryToInvest] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [countriesForVisa, setCountriesForVisa] = useState([]);
  const [relocationTimeframe, setRelocationTimeframe] = useState("");
  const [canProvideLiquidityEvidence, setCanProvideLiquidityEvidence] =
    useState(false);
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [comments, setComments] = useState("");

  const handleCountriesForVisaChange = (selectedOptions) => {
    const selectedCountries = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setCountriesForVisa(selectedCountries);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/users?email=${email}`, {
          method: "GET",
        });
        if (!response.ok) throw new Error("Failed to fetch profile data");

        const data = await response.json();

        // Set form fields with default values from the fetched data
        setAvatarURL(data.avatarURL || "");
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setCountryOfBirth(data.countryOfBirth || "");
        setNationality(data.nationality || "");
        setDualCitizenship(data.dualCitizenship || false);
        setNetWorth(data.netWorth || "");
        setLiquidAssets(data.liquidAssets || "");
        setTelegram(data.telegram || "");
        setWhatsapp(data.whatsapp || "");
        setPhone(data.phone || "");
        setIndustryToInvest(data.industryToInvest || "");
        setInvestmentAmount(data.investmentAmount || "");
        setCountriesForVisa(data.countriesForVisa || []);
        setRelocationTimeframe(data.relocationTimeframe || "");
        setCanProvideLiquidityEvidence(
          data.canProvideLiquidityEvidence || false
        );
        setInstagram(data.instagram || "");
        setLinkedin(data.linkedin || "");
        setComments(data.comments || "");
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Error",
          description: "Failed to load profile data.",
          variant: "destructive",
        });
      }
    };

    if (email) fetchProfile();
  }, []);

  // Function to upload an image to Cloudinary
  const uploadToCloudinary = async (file) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "lookvisa");
      formData.append("cloud_name", "dqayy79ql");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dqayy79ql/image/upload",
        { method: "POST", body: formData }
      );

      const data = await response.json();
      return data.secure_url; // Cloudinary returns the secure URL of the uploaded image
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  // Handles file input change
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const uploadedImageUrl = await uploadToCloudinary(file);
    if (uploadedImageUrl) {
      setAvatarURL(uploadedImageUrl);
    } else {
      alert("Image upload failed. Please try again.");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Collect all form data
    const formData = {
      email: email || null,
      avatarURL,
      firstName,
      lastName,
      countryOfBirth,
      nationality,
      dualCitizenship,
      netWorth,
      liquidAssets,
      telegram,
      whatsapp,
      phone,
      industryToInvest,
      investmentAmount,
      countriesForVisa,
      relocationTimeframe,
      canProvideLiquidityEvidence,
      instagram,
      linkedin,
      comments,
    };

    fetch("/api/edit-profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Profile submitted successfully!");
        } else {
          alert("Error submitting profile. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error submitting profile:", error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-6"
      >
        {/* Avatar Section */}
        <div className="flex items-center flex-col gap-4">
          <Image
            src={avatarURL || profile} // Show uploaded avatar or default image
            alt="Profile Avatar"
            width={120}
            height={120}
            className="h-40 w-40 rounded-full object-cover"
          />
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 rounded-full">
              <span className="text-white text-sm">Uploading...</span>
            </div>
          )}
          <label
            htmlFor="avatarUpload"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Upload Avatar
          </label>
          <input
            type="file"
            id="avatarUpload"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Personal Information */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="First Name"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputField
            label="Last Name"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <select
            onChange={(e) => setCountryOfBirth(e.target.value)}
            defaultValue={countryOfBirth}
            className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
          >
            <option value="" disabled>
              Country of Birth
            </option>
            {COUNTRIES.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => setNationality(e.target.value)}
            defaultValue={nationality}
            className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
          >
            <option value="" disabled>
              Nationality
            </option>
            {COUNTRIES.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </section>
        <div className="flex items-center justify-center w-full gap-9 ">
          <div className="w-full">
            <label className="block text-sm font-medium mb-2 ">
              Countries for Visa
            </label>
            <ReactSelect
              isMulti
              options={countryOptions}
              value={countryOptions.filter((option) =>
                countriesForVisa.includes(option.value)
              )}
              onChange={handleCountriesForVisaChange}
              className="react-select-container "
              classNamePrefix="react-select"
              placeholder="Select countries"
            />
          </div>
          <select
            onChange={(e) => setRelocationTimeframe(e.target.value)}
            defaultValue={relocationTimeframe}
            className="bg-gray-50 h-12 w-full p-2 rounded-md border border-gray-300"
          >
            <option value="" disabled>
              Relocation Timespan
            </option>
            {RELOCATION_TIMEFRAMES.map((timespan, index) => (
              <option key={index} value={timespan}>
                {timespan}
              </option>
            ))}
          </select>
        </div>

        {/* Financial Details */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            onChange={(e) => setNetWorth(e.target.value)}
            defaultValue={netWorth}
            className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
          >
            <option value="" disabled>
              Net Worth (USD)
            </option>
            {INVESTMENT_RANGES.map((range, index) => (
              <option key={index} value={range}>
                {range}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => setLiquidAssets(e.target.value)}
            defaultValue={liquidAssets}
            className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
          >
            <option value="" disabled>
              Liquid Assets (USD)
            </option>
            {INVESTMENT_RANGES.map((range, index) => (
              <option key={index} value={range}>
                {range}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => setIndustryToInvest(e.target.value)}
            defaultValue={industryToInvest}
            className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
          >
            <option value="" disabled>
              Industry To Invest
            </option>
            {INDUSTRIES.map((industry, index) => (
              <option key={index} value={industry}>
                {industry}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setInvestmentAmount(e.target.value)}
            defaultValue={investmentAmount}
            className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
          >
            <option value="" disabled>
              Amount willing to invest (USD)
            </option>
            {INVESTMENT_RANGES.map((range, index) => (
              <option key={index} value={range}>
                {range}
              </option>
            ))}
          </select>
        </section>

        {/* Social Profiles */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Instagram Profile"
            id="instagram"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
          <InputField
            label="LinkedIn Profile"
            id="linkedin"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
        </section>

        <div className="flex gap-10 items-center">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="canProvideLiquidityEvidence"
              checked={canProvideLiquidityEvidence}
              onChange={(e) => setCanProvideLiquidityEvidence(e.target.checked)}
              className="h-5 w-5 cursor-pointer"
            />
            <label
              htmlFor="canProvideLiquidityEvidence"
              className="cursor-pointer"
            >
              Can provide liquidity evidence?
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="dualCitizenship"
              checked={dualCitizenship}
              onChange={(e) => setDualCitizenship(e.target.checked)}
              className="h-5 w-5 cursor-pointer"
            />
            <label htmlFor="dualCitizenship" className="cursor-pointer">
              Do you have dual citizenship?
            </label>
          </div>
        </div>
        {/* Additional Comments */}
        <textarea
          className="min-h-[200px] p-2 bg-gray-50 rounded-lg border border-gray-300"
          placeholder="Add comments or notes..."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        ></textarea>
        {/* Contact Info */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="flex items-center gap-2">
            <label>Telegram</label>
            <PhoneInput
              defaultCountry="ua"
              value={telegram}
              onChange={(phone) => setTelegram(phone)}
            />
          </div>
          <div className="flex items-center gap-2">
            <label>WhatsApp</label>
            <PhoneInput
              defaultCountry="ua"
              value={whatsapp}
              onChange={(phone) => setWhatsapp(phone)}
            />
          </div>
          <div className="flex items-center gap-2">
            <label>Phone</label>
            <PhoneInput
              defaultCountry="ua"
              value={phone}
              onChange={(phone) => setPhone(phone)}
            />
          </div>
        </section>
        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
