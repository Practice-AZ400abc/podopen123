"use client";

import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthContext } from "@/components/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import AvatarUpload from "@/components/uploadAvater";
import ProfileForm from "@/components/profile-form";

const SeekerProfile = () => {
  const { isLoggedIn, email } = useContext(AuthContext);
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: "",
    website: "",
    avatarUrl: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle avatar image selection
  const handleImageChange = (file) => {
    const imageUrl = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, avatarUrl: imageUrl }));
    setAvatarFile(file); // Save the file for upload
  };

  // Save profile to Cloudinary and update MongoDB
  const handleSave = async () => {
    setIsLoading(true);

    try {
      let avatarURL = profile.avatarUrl;

      // Upload avatar to Cloudinary if a new file is selected
      if (avatarFile) {
        const formData = new FormData();
        formData.append("file", avatarFile);
        formData.append("upload_preset", "lookvisa"); // Cloudinary upload preset
        formData.append("cloud_name", "dqayy79ql"); // Cloudinary cloud name

        const response = await fetch("https://api.cloudinary.com/v1_1/dqayy79ql/image/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image to Cloudinary");
        }

        const data = await response.json();
        avatarURL = data.secure_url; // Get the uploaded image URL
      }

      // API call to update the profile in MongoDB
      const response = await fetch("/api/edit-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email, // Replace with actual user's email
          avatarURL,
          companyName: profile.name,
          websiteURL: profile.website,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      setProfile((prev) => ({
        ...prev,
        avatarUrl: data.avatarURL,
      }));

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <AvatarUpload
                imageUrl={profile.avatarUrl}
                name={profile.name || "Avatar"}
                onImageChange={handleImageChange}
              />
            </div>

            <ProfileForm
              name={profile.name}
              website={profile.website}
              onNameChange={(name) => setProfile((prev) => ({ ...prev, name }))}
              onWebsiteChange={(website) =>
                setProfile((prev) => ({ ...prev, website }))
              }
            />

            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-sm text-muted-foreground text-center">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default SeekerProfile;
