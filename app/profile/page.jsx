"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import AvatarUpload from "@/components/uploadAvater";  // Ensure correct import
import ProfileForm from "@/components/profile-form";  // Ensure correct import

const SeekerProfile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: "Acme Corporation",
    website: "https://acme.com",
    avatarUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&auto=format&fit=crop",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (file) => {
    const imageUrl = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, avatarUrl: imageUrl }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
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
                name={profile.name}
                onImageChange={handleImageChange}
              />
            </div>

            <ProfileForm
              name={profile.name}
              website={profile.website}
              onNameChange={(name) => setProfile((prev) => ({ ...prev, name }))}
              onWebsiteChange={(website) => setProfile((prev) => ({ ...prev, website }))}
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
