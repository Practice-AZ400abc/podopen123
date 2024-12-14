"use client";

import { useToast } from "@/hooks/use-toast";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "@/components/profile/profile-form";
import { jwtDecode } from "jwt-decode";

export default function ProfilePage() {
  const { token, isLoggedIn } = useContext(AuthContext); // Use AuthContext for auth state
  const [user, setUser] = useState(null); // Store user data
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Decode token to extract email and role
  const decodedToken = token ? jwtDecode(token) : null;
  const email = decodedToken?.email || null;
  const role = decodedToken?.role || null;

  // Redirect if not logged in or incorrect role
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/"); // Redirect to home if not logged in
    } else if (role === "Seeker") {
      router.push("/profile");
    }
  }, [isLoggedIn]);

  // Fetch user's profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!email) return;

      try {
        const response = await fetch(`/api/users?email=${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        setUser(data); // Store fetched data
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Error",
          description: "Failed to load profile data.",
          variant: "destructive",
        });
      }
    };

    fetchProfile();
  }, [email, token, toast]);

  // Update profile data
  const updateProfile = async (formData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/edit-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile data");
      }

      const updatedData = await response.json();
      setUser(updatedData); // Update user state with updated data

      toast({
        title: "Success",
        description: "Profile updated successfully.",
        variant: "success",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Show loading state while fetching user data
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Manage Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm
            onSubmit={updateProfile} // Pass update function
            isSubmitting={isSubmitting} // Disable submit button when submitting
            defaultValues={user} // Pass fetched user data as default values
          />
        </CardContent>
      </Card>
    </div>
  );
}
