"use client";

import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import profile from "@/assets/profile.png";
import InputField from "./input-field";
import {
  COUNTRIES,
  INDUSTRIES,
  INVESTMENT_RANGES,
  RELOCATION_TIMEFRAMES,
} from "@/lib/constants";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { AuthContext } from "./AuthProvider";
import { Loader2, Mail } from "lucide-react";
import DeleteAccountButton from "./DeleteAccountButton";
import { Switch } from "@/components/ui/switch"

const VisaSeekerProfileForm = ({ }) => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/");
    }
    setToken(storedToken);
  }, []);

  const getEmailFromToken = () => {
    if (token) {
      return jwtDecode(token).email;
    }
  };
  const email = getEmailFromToken();

  const getFirebaseUidFromToken = () => {
    if (token) {
      return jwtDecode(token).firebaseUid;
    }
  };
  const firebaseUid = getFirebaseUidFromToken();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    avatarURL: "",
    firstName: "",
    lastName: "",
    companyName: "",
    websiteURL: "",
    countryOfBirth: "",
    nationality: "",
    dualCitizenship: false,
    netWorth: "",
    liquidAssets: "",
    telegram: "",
    whatsapp: "",
    contactEmail: "",
    phone: "",
    industryToInvest: "",
    investmentAmount: "",
    countriesForVisa: [],
    relocationTimeframe: "",
    relocationCountry: "",
    canProvideLiquidityEvidence: false,
    instagram: "",
    linkedin: "",
    comments: "",
    isPublic: false,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/users?email=${email}`, {
          method: "GET",
        });
        if (!response.ok) throw new Error("Failed to fetch profile data");

        const user = await response.json();

        setFormData({
          email: user.email ? user.email : "",
          avatarURL: user.avatarURL ? user.avatarURL : "",
          firstName: user.firstName ? user.firstName : "",
          lastName: user.lastName ? user.lastName : "",
          companyName: user.companyName ? user.companyName : "",
          websiteURL: user.websiteURL ? user.websiteURL : "",
          countryOfBirth: user.countryOfBirth ? user.countryOfBirth : "",
          nationality: user.nationality ? user.nationality : "",
          dualCitizenship: user.dualCitizenship ? user.dualCitizenship : false,
          netWorth: user.netWorth ? user.netWorth : "",
          liquidAssets: user.liquidAssets ? user.liquidAssets : "",
          telegram: user.telegram ? user.telegram : "",
          whatsapp: user.whatsapp ? user.whatsapp : "",
          contactEmail: user.contactEmail ? user.contactEmail : "",
          phone: user.phone ? user.phone : "",
          industryToInvest: user.industryToInvest ? user.industryToInvest : "",
          investmentAmount: user.investmentAmount ? user.investmentAmount : "",
          countriesForVisa: user.countriesForVisa ? user.countriesForVisa : [],
          relocationTimeframe: user.relocationTimeframe
            ? user.relocationTimeframe
            : "",
          relocationCountry: user.relocationCountry
            ? user.relocationCountry
            : "",
          canProvideLiquidityEvidence: user.canProvideLiquidityEvidence
            ? user.canProvideLiquidityEvidence
            : false,
          instagram: user.instagram ? user.instagram : "",
          linkedin: user.linkedin ? user.linkedin : "",
          comments: user.comments ? user.comments : "",
          isPublic: user.isPublic ? user.isPublic : false,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (email) fetchProfile();
  }, [email]);

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
      setFormData((prev) => ({ ...prev, avatarURL: uploadedImageUrl }));
    } else {
      alert("Image upload failed. Please try again.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for required fields
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "Please enter your first name";
    if (!formData.lastName) newErrors.lastName = "Please enter your last name";
    if (!formData.nationality) newErrors.nationality = "Please select";
    if (!formData.countryOfBirth) newErrors.countryOfBirth = "Please select";
    if (!formData.relocationTimeframe) newErrors.relocationTimeframe = "Please select";
    if (!formData.liquidAssets) newErrors.liquidAssets = "This field must be filled";
    if (!formData.investmentAmount) newErrors.investmentAmount = "This field must be filled";
    if (!formData.relocationCountry) newErrors.relocationCountry = "This field must be filled";
    if (!formData.canProvideLiquidityEvidence) newErrors.canProvideLiquidityEvidence = "This field must be filled";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all the required fields");
      return; // Prevent further execution
    }

    try {
      const updateResponse = await fetch("/api/edit-profile", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await updateResponse.json();

      // Refresh the token with updated `profileCompleted` state
      const tokenResponse = await fetch("/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firebaseUid }), // Replace with actual firebase UID
      });

      if (!tokenResponse.ok) {
        throw new Error("Failed to refresh token");
      }

      const { token: newToken } = await tokenResponse.json();
      login(newToken); // Update the token in AuthContext

      toast.success("Your profile has been successfully updated.");
      router.push("/");
    } catch (error) {
      toast.error(error.message);
      throw new Error(error);
    }
  };


  if (isLoading) {
    return <div className="flex items-center justify-center  min-h-[100vh]"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <div className="container mx-auto min-h-[100vh] px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg  flex flex-col gap-6"
      >
        {/* Avatar Section */}
        <div className="flex items-center flex-col gap-4">
          <Image
            src={formData.avatarURL || profile} // Show uploaded avatar or default image
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
            label="* First Name"
            id="firstName"
            value={formData.firstName}
            errors={errors.firstName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, firstName: e.target.value }))
            }
          />
          <InputField
            label="* Last Name"
            id="lastName"
            value={formData.lastName}
            error={errors.lastName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, lastName: e.target.value }))
            }
          />
          <InputField
            label="Company Name"
            id="companyName"
            value={formData.companyName}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                companyName: e.target.value,
              }))
            }
          />
          <InputField
            label="Website URL"
            id="websiteURL"
            value={formData.websiteURL}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, websiteURL: e.target.value }))
            }
          />

          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium text-gray-700">
              * Country of Birth
            </label>

            <select
              value={formData.countryOfBirth}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  countryOfBirth: e.target.value,
                }))
              }
              className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
            >
              <option value="" disabled>
                Select
              </option>
              {COUNTRIES.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.countryOfBirth && <span style={{ color: 'red' }}>{errors.countryOfBirth}</span>}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium text-gray-700">
              * Nationality
            </label>

            <select
              value={formData.nationality}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  nationality: e.target.value,
                }))
              }
              className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
            >
              <option value="" disabled>
                Select Nationality
              </option>
              {COUNTRIES.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.nationality && <span style={{ color: 'red' }}>{errors.nationality}</span>}
          </div>
        </section>
        <div className="flex items-center justify-center w-full gap-4 ">
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              * Relocation Timespan
            </label>
            <select
              value={formData.relocationTimeframe}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  relocationTimeframe: e.target.value,
                }))
              }
              className="bg-gray-50 h-12 w-full p-2 rounded-md border border-gray-300"
            >
              <option value="" disabled>
                Select
              </option>
              {RELOCATION_TIMEFRAMES.map((timespan, index) => (
                <option key={index} value={timespan}>
                  {timespan}
                </option>
              ))}
            </select>
            {errors.relocationTimeframe && <span style={{ color: 'red' }}>{errors.relocationTimeframe}</span>}

          </div>
          {/* <div className="w-full">
          <label className="block text-sm font-medium mb-2 ">
          Country to relocate to with golden/investment visa
          </label>
          <ReactSelect
            isMulti
            options={countryOptions}
            value={countryOptions.filter((option) =>
              formData.countriesForVisa.includes(option.value)
            )}
            onChange={handleCountriesForVisaChange}
            className="react-select-container "
            classNamePrefix="react-select"
            placeholder="Select countries"
          />
        </div> */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              * Country to relocate to with golden/investment visa
            </label>
            <select
              value={formData.relocationCountry}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  relocationCountry: e.target.value,
                }))
              }
              className="bg-gray-50 h-12 w-full p-2 rounded-md border border-gray-300"
            >
              <option value="" disabled>
                Select
              </option>
              {COUNTRIES.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.relocationCountry && <span style={{ color: 'red' }}>{errors.relocationCountry}</span>}
          </div>


        </div>

        {/* Financial Details */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Net Worth (USD)
            </label>
            <select
              value={formData.netWorth}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, netWorth: e.target.value }))
              }
              className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
            >
              <option value="" disabled>
                Select
              </option>
              {INVESTMENT_RANGES.map((range, index) => (
                <option key={index} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              * Liquid Assets (USD)
            </label>
            <select
              value={formData.liquidAssets}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  liquidAssets: e.target.value,
                }))
              }
              className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
            >
              <option value="" disabled>
                Select
              </option>
              {INVESTMENT_RANGES.map((range, index) => (
                <option key={index} value={range}>
                  {range}
                </option>
              ))}
            </select>
            {errors.liquidAssets && <span style={{ color: 'red' }}>{errors.liquidAssets}</span>}
          </div>

          <div className="w-full flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Industry To Invest
            </label>
            <select
              value={formData.industryToInvest}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  industryToInvest: e.target.value,
                }))
              }
              className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
            >
              <option value="" disabled>
                Select
              </option>
              {INDUSTRIES.map((industry, index) => (
                <option key={index} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>


          <div className="w-full flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              * Amount willing to invest (USD) for a Visa
            </label>
            <select
              value={formData.investmentAmount}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  investmentAmount: e.target.value,
                }))
              }
              className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
            >
              <option value="" disabled>
                Select
              </option>
              {INVESTMENT_RANGES.map((range, index) => (
                <option key={index} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          {errors.investmentAmount && <span style={{ color: 'red' }}>{errors.investmentAmount}</span>}
        </section>

        {/* Social Profiles */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Instagram Profile"
            id="instagram"
            value={formData.instagram}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, instagram: e.target.value }))
            }
          />
          <InputField
            label="LinkedIn Profile"
            id="linkedin"
            value={formData.linkedin}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, linkedin: e.target.value }))
            }
          />
        </section>

        <div className="flex gap-10 items-center">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="canProvideLiquidityEvidence"
              checked={formData.canProvideLiquidityEvidence}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  canProvideLiquidityEvidence: e.target.checked,
                }))
              }
              className="h-5 w-5 cursor-pointer"
            />
            <label
              htmlFor="canProvideLiquidityEvidence"
              className="cursor-pointer"
            >
              * Can you provide evidence of
              liquidity?
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="dualCitizenship"
              checked={formData.dualCitizenship}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  dualCitizenship: e.target.checked,
                }))
              }
              className="h-5 w-5 cursor-pointer"
            />
            <label htmlFor="dualCitizenship" className="cursor-pointer">
              Do you have dual citizenship?
            </label>
            {errors.canProvideLiquidityEvidence && <span style={{ color: 'red' }}>{errors.canProvideLiquidityEvidence}</span>}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isPublic}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, isPublic: e.target.checked }))
              }
              className="h-5 w-5 cursor-pointer"
            />
            <Switch 
            checked={formData.isPublic}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, isPublic: e.target.checked }))
              }/>
            <label className="text-sm font-medium">* Make Profile Public for searching </label>
          </div>
        </div>
        {/* Additional Comments */}
        <textarea
          className="min-h-[200px] p-2 bg-gray-50 rounded-lg border border-gray-300"
          placeholder="Add comments or notes..."
          value={formData.comments}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, comments: e.target.value }))
          }
        ></textarea>
        {/* Contact Info */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-2 place-content-center">
          <div className="flex items-center gap-2">
            <label>Telegram</label>
            <PhoneInput
              defaultCountry="ua"
              value={formData.telegram}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  telegram: value, // Use the value directly
                }))
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <label>* WhatsApp</label>
            <PhoneInput
              defaultCountry="ua"
              value={formData.whatsapp}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  whatsapp: value, // Use the value directly
                }))
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <label>Phone</label>
            <PhoneInput
              defaultCountry="ua"
              value={formData.phone}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  phone: value, // Use the value directly
                }))
              }
            />
          </div>
          <div className="flex gap-2 items-center h-full">
            <Mail />
            <InputField
              label="* Contact Email"
              id="contactEmail"
              errors={errors.contactEmail}
              value={formData.contactEmail}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, contactEmail: e.target.value }))
              }
            />
          </div>
        </section>
        {/* Submit Button */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            Save Profile
          </button>
          <DeleteAccountButton />
        </div>
      </form>
    </div>
  );
};

export default VisaSeekerProfileForm;
