"use client";

import ProfileForm from "@/components/profile-form";
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

  // Redirect if not logged in or wrong role
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="mx-auto container">
      <ProfileForm token={token} />
    </div>
  );
};

export default InvestorProfile;
