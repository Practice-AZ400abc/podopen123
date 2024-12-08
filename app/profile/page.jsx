"use client";

import React, { useContext, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthContext } from "@/components/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import AvatarUpload from "@/components/uploadAvater";
import ProfileForm from "@/components/profile-form";

const SeekerProfile = () => {
  const { email } = useContext(AuthContext); // Assuming the email is available in AuthContext
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: "",
    website: "",
    avatarUrl: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user's existing data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/users?email=${email}`);
        if (!response.ok) throw new Error("Failed to fetch profile data");

        const data = await response.json();
        setProfile({
          name: data.companyName || "",
          website: data.websiteURL || "",
          avatarUrl: data.avatarURL || "",
        });
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
  }, [email, toast]);

  // Handle avatar image selection
  const handleImageChange = (file) => {
    const imageUrl = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, avatarUrl: imageUrl }));
    setAvatarFile(file); // Save the file for upload
  };

  // Save profile logic (as already implemented)
  const handleSave = async () => {
    setIsLoading(true);
    // The existing profile update logic goes here...
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
      </div>
    </div>
  );
};

export default SeekerProfile;
