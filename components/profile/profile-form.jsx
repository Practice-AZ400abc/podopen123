"use client";
import React, { useState } from "react";
import Image from "next/image";
import profile from "@/assets/profile.png";
import InputField from "../input-field";
import { COUNTRIES, INDUSTRIES, INVESTMENT_RANGES, RELOCATION_TIMEFRAMES } from "@/lib/constants";

import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const Profile = () => {
  const [avatar, setAvatar] = useState(""); // Stores the uploaded avatar URL
  const [uploading, setUploading] = useState(false); // Tracks upload state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryOfBirth, setCountryOfBirth] = useState("");
  const [nationality, setNationality] = useState("");
  const [dualCitizenship, setDualCitizenship] = useState("");
  const [netWorth, setNetWorth] = useState("");
  const [liquidAssets, setLiquidAssets] = useState("");
  const [telegram, setTelegram] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [phone, setPhone] = useState("");
  const [industryToInvest, setIndustryToInvest] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [countriesForVisa, setCountriesForVisa] = useState([]);
  const [relocationTimeframe, setRelocationTimeframe] = useState("");
  const [canProvideLiquidityEvidence, setCanProvideLiquidityEvidence] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [comments, setComments] = useState("");

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
      setAvatar(uploadedImageUrl);
    } else {
      alert("Image upload failed. Please try again.");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Collect all form data
    const formData = {
      avatar,
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

    // For now, log the data. Replace this with an API call or other logic as needed.
    console.log("Form Data Submitted:", formData);

    // Example: Submit data to an API endpoint
    /*
    fetch("/api/profile", {
      method: "POST",
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
    */
  };

  return (
    <div className="container mx-auto p-2 flex items-center justify-center ">
      <form className="mt-10 w-full flex justify-evenly flex-col md:flex-row" onSubmit={handleSubmit}>


        <div className="flex flex-col items-center">
          {/* Avatar Section */}
          <div className="relative">
            <Image
              src={avatar || profile} // Show uploaded avatar or default image
              alt="Profile Avatar"
              width={80}
              height={80}
              className="h-40 w-40 rounded-full object-cover"
            />
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 rounded-full">
                <span className="text-white text-sm">Uploading...</span>
              </div>
            )}
          </div>

          {/* File Input for Image Upload */}
          <label
            htmlFor="avatarUpload"
            className="mt-4 cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
        {/* Dynamic Input Fields */}
        <div>
        <div className="grid grid-col1-1 gap-4 md:grid-cols-2 mt-10">
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
        </div>
        <div className="grid grid-col1-1 gap-4 md:grid-cols-2 mt-4">
          <select
            name=""
            id=""
            className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
            onChange={(e) => setCountryOfBirth(e.target.value)}
            defaultValue="" // Sets the default selected value to the placeholder
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
            name=""
            id=""
            className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
            onChange={(e) => setNationality(e.target.value)}
            defaultValue="" // Sets the default selected value to the placeholder
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
        </div>
        {/* citizen and  */}
        <div className="grid grid-col1-1 gap-4 md:grid-cols-2 mt-4">
          <select
            name=""
            id=""
            className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
            onChange={(e) => setCountryOfBirth(e.target.value)}
            defaultValue="" // Sets the default selected value to the placeholder
          >
            <option value="" disabled>
              Dual Citizenship
            </option>
            <option>Yes</option>
            <option>No</option>

          </select>
          <select
            name=""
            id=""
            className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
            onChange={(e) => setNetWorth(e.target.value)}
            defaultValue="" // Sets the default selected value to the placeholder
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
        </div>
        {/*  */}
        <div className="grid grid-col1-1 gap-4 md:grid-cols-2 mt-4">
          <select
            name=""
            id=""
            className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
            onChange={(e) => setLiquidAssets(e.target.value)}
            defaultValue="" // Sets the default selected value to the placeholder
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
            name=""
            id=""
            className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
            onChange={(e) => setIndustryToInvest(e.target.value)}
            defaultValue="" // Sets the default selected value to the placeholder
          >
            <option value="" disabled>
              Industry To Invest
            </option>
            {INDUSTRIES.map((range, index) => (
              <option key={index} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        {/*  */}
        <div className="grid grid-col1-1 gap-4 md:grid-cols-2 mt-4">
          <select
            name=""
            id=""
            className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
            onChange={(e) => setInvestmentAmount(e.target.value)}
            defaultValue="" // Sets the default selected value to the placeholder
          >
            <option value="" disabled>
              Amount willing to invest (in USD dollars)
            </option>
            {INVESTMENT_RANGES.map((range, index) => (
              <option key={index} value={range}>
                {range}
              </option>
            ))}
          </select>
          <select
            name=""
            id=""
            className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
            onChange={(e) => setCountriesForVisa(e.target.value)}
            defaultValue="" // Sets the default selected value to the placeholder
          >
            <option value="" disabled>
              Country to relocate to (where you seek visa)
            </option>
            {COUNTRIES.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/*  */}
        <div className="grid grid-col1-1 gap-4 md:grid-cols-2 mt-4">
          <select
            name=""
            id=""
            className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
            onChange={(e) => setRelocationTimeframe(e.target.value)}
            defaultValue="" // Sets the default selected value to the placeholder
          >
            <option value="" disabled>
              Timetable to Relocate
            </option>
            {RELOCATION_TIMEFRAMES.map((range, index) => (
              <option key={index} value={range}>
                {range}
              </option>
            ))}
          </select>
          <select
            name=""
            id=""
            className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
            onChange={(e) => setCanProvideLiquidityEvidence(e.target.value)}
            defaultValue="" // Sets the default selected value to the placeholder
          >
            <option value="" disabled>
              Can you provide evidence of your liquid assets?
            </option>
            <option>Yes</option>
            <option>No</option>

          </select>

        </div>

        <div className="grid grid-col1-1 gap-4 md:grid-cols-2 mt-4">
          <InputField
            label="Add Instagram Profile Link"
            id="Instagram"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
          <InputField
            label="Add Linkedin Profile Link"
            id="Linkedin"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
        </div>



       
        <div className="flex flex-col gap-2 mt-4">

          <textarea className="min-h-[200px] p-2 bg-gray-50 rounded-lg border border-gray-300" name="" id="" value={" Comment"} onChange={(e) => setComments(e.target.value)}></textarea>
        </div>
        {/* Add other input fields similarly */}


        <div className="flex gap-4 mt-4 justify-evenly">
          <div className="flex items-center gap-2">
            <label htmlFor="">Telegram</label>
            <PhoneInput
              defaultCountry="ua"
              value={telegram}
              onChange={(phone) => setTelegram(phone)}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="">Whatsapp</label>
            <PhoneInput
              defaultCountry="ua"
              value={whatsapp}
              onChange={(phone) => setWhatsapp(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="">Phone</label>
            <PhoneInput
              defaultCountry="ua"
              value={whatsapp}
              onChange={(phone) => setWhatsapp(e.target.value)}
            />
          </div>
        </div> 
         
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-700"
        >
          Save
        </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
