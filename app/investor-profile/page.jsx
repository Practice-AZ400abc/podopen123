"use client";

import ProfileForm from "@/components/profile/profile-form";
import { jwtDecode } from "jwt-decode";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";

const InvestorProfile = () => {
  const { token, isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  // Decode token to extract email and role
  const getDecodedToken = () => {
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const decodedToken = getDecodedToken();
  const email = decodedToken?.email || null;
  const role = decodedToken?.role || null;

  // Redirect if not logged in or wrong role
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (role === "Seeker") {
      router.push("/profile");
    }
  }, [role, router]);

  return (
    <div className="mx-auto container">
      <ProfileForm email={email} />
    </div>
  );
};

export default InvestorProfile;
