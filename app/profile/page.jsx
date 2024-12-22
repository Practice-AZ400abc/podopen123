"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "react-international-phone/style.css";
import VisaSeekerProfileForm from "@/components/VisaSeekerProfileForm";
import VisaSponsorProfileForm from "@/components/VisaSponsorProfileForm";

const ProfilePage = () => {
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/");
    }
    setToken(storedToken);
  }, [router]);

  const getRoleFromToken = () => {
    if (token) {
      return jwtDecode(token).role;
    }
  }

  const role = getRoleFromToken();

  return (
    <div className="mx-auto container">
      {role === "Visa Seeker" ? (
        <VisaSeekerProfileForm />
      ) : (
        <VisaSponsorProfileForm />
      )}
    </div>
  );
};

export default ProfilePage;
