"use client";

import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthContext } from "@/components/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import AvatarUpload from "@/components/uploadAvater";
import ProfileForm from "@/components/profile-form";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode to extract data from the token

const SeekerProfile = () => {
  const { token, login, isLoggedIn } = useContext(AuthContext); // `login` to update the token
  const [user, setUser] = useState(null);
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: "",
    website: "",
    avatarUrl: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Decode token to get the user's email
  const getEmailFromToken = () => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token); // Decode the token
      return decoded.user.email; // Extract email from the payload
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const getRoleFromToken = () => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token); // Decode the token
      return decoded.user.role; // Extract role from the payload
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const role = getRoleFromToken();

  const email = getEmailFromToken();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (role === "Visa Seeker") {
      router.push("/seeker-profile");
    }
  }, [role]);

  // Fetch user's existing profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/users?email=${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch profile data");

        const data = await response.json();
        setProfile({
          name: data.companyName || "",
          website: data.websiteURL || "",
          avatarUrl: data.avatarURL || "",
        });
        setUser(data);
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
  }, [email, token, toast]);

  // Handle avatar image selection
  const handleImageChange = (file) => {
    const imageUrl = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, avatarUrl: imageUrl }));
    setAvatarFile(file); // Save the file for upload
  };

  // Save profile and refresh token
  const handleSave = async () => {
    setIsLoading(true);

    try {
      let avatarURL = profile.avatarUrl;

      // Upload avatar to Cloudinary if a new file is selected
      if (avatarFile) {
        const formData = new FormData();
        formData.append("file", avatarFile);
        formData.append("upload_preset", "lookvisa");
        formData.append("cloud_name", "dqayy79ql");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dqayy79ql/image/upload",
          { method: "POST", body: formData }
        );

        if (!response.ok) {
          throw new Error("Failed to upload image to Cloudinary");
        }

        const data = await response.json();
        avatarURL = data.secure_url; // Get the uploaded image URL
      }

      // Update profile in the database
      const response = await fetch("/api/edit-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email, // User's email
          avatarURL,
          companyName: profile.name,
          websiteURL: profile.website,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      // Refresh the token with updated `profileCompleted` state
      const tokenResponse = await fetch("/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firebaseUid: user.firebaseUid }), // Replace with actual firebase UID
      });

      if (!tokenResponse.ok) {
        throw new Error("Failed to refresh token");
      }

      const { token: newToken } = await tokenResponse.json();
      login(newToken); // Update the token in AuthContext

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
