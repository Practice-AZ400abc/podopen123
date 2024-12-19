"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useContext, useState } from "react";
import "react-international-phone/style.css";
import { AuthContext } from "@/components/AuthProvider";
import useAuthStore from "@/stores/useAuthStore";
import ProfileForm from "@/components/profile-form";

const ProfilePage = () => {
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/");
    }
    setToken(storedToken);
  }, []);

  return (
    <div className="mx-auto container">
      <ProfileForm />
    </div>
  );
};

export default ProfilePage;
