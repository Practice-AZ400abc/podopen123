"use client";

import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import profile from "@/assets/profile.png";
import InputField from "./input-field";
import {
  COUNTRIES,
  INDUSTRY_ROLES
} from "@/lib/constants";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { AuthContext } from "./AuthProvider";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


// Define options for the countries dropdown
const countryOptions = COUNTRIES.map((country) => ({
  value: country,
  label: country,
}));

const VisaSponsorProfileForm = ({ }) => {
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
    telegram: "",
    whatsapp: "",
    contactEmail: "",
    phone: "",
    investmentRole: "",
    countryLocation: "",
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
          telegram: user.telegram ? user.telegram : "",
          whatsapp: user.whatsapp ? user.whatsapp : "",
          contactEmail: user.contactEmail ? user.contactEmail : "",
          phone: user.phone ? user.phone : "",
          investmentRole: user.investmentRole ? user.investmentRole : "",
          countryLocation: user.countryLocation ? user.countryLocation : "",
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
    if (!formData.firstName)
      newErrors.firstName = "Please enter your first name";
    if (!formData.lastName) newErrors.lastName = "Please enter your last name";
    if (!formData.investmentRole)
      newErrors.investmentRole = "This field must be filled";
    if (!formData.countryLocation)
      newErrors.countryLocation = "This field must be filled";
    if (!formData.contactEmail)
      newErrors.contactEmail = "Contact email is required!"
    if (!formData.phone)
      newErrors.phone = "Contact Number is required!"

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
    return <div className="flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg flex flex-col gap-6"
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

        <div className="flex items-start justify-center gap-10">
          {/* Personal Information */}
          <section className="grid grid-cols-1 md:grid-cols-1 gap-4">
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

            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-medium text-gray-700">
                * Country Location
              </label>

              <select
                value={formData.countryLocation}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    countryLocation: e.target.value,
                  }))
                }
                className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
              >
                {COUNTRIES.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.countryLocation && (
                <span style={{ color: "red" }}>{errors.countryLocation}</span>
              )}
            </div>

            <div className="w-full flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Role seeking investment
              </label>
              <select
                value={formData.investmentRole}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    investmentRole: e.target.value,
                  }))
                }
                className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
              >
                <option value="" disabled>
                  Select
                </option>
                {INDUSTRY_ROLES.map((industry, index) => (
                  <option key={index} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>
          </section>

          {/* Contact Info */}
          <section className="grid grid-cols-1 md:grid-cols-1 gap-4  ">
            <div className="flex flex-col items-start gap-2 w-full">
              <label className="text-sm font-medium text-gray-700">Telegram</label>
              <PhoneInput
                style={{ width: "100%" }}
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
            <div className="flex flex-col items-start gap-2 w-full">
              <label className="text-sm font-medium text-gray-700">* WhatsApp</label>
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
            <div className="flex flex-col items-start gap-2 w-full">
              <label className="text-sm font-medium text-gray-700">Phone</label>
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
              {errors.phone && (
                <span style={{ color: "red" }}>{errors.phone}</span>
              )}

            </div>
            <div className="flex   gap-2 items-center h-full w-full">
              <Mail />
              <InputField
                label="* Contact Email"
                id="contactEmail"
                errors={errors.contactEmail}
                value={formData.contactEmail}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    contactEmail: e.target.value,
                  }))
                }
              />
            </div>
          </section>
        </div>
        {/* Submit Button */}
        <div className="w-full flex gap-4 items-center justify-end">
          <div className="flex items-center justify-center gap-4">
            <AlertDialog>
              <AlertDialogTrigger 
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
              
              >Delete</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>! Warning</AlertDialogTitle>
                  <AlertDialogDescription>
                    By click continue your profile will be deleted
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-600">Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            >
              Save Profile
            </button>
            <Link className="flex items-center gap-2 underline " href={"/manage-listing"}>Manage Your Listings
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VisaSponsorProfileForm;
