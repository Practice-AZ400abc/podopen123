"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "react-international-phone/style.css";
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
  }, [router]);

  return (
    <div className="mx-auto container">
      <ProfileForm />
    </div>
  );
};

export default ProfilePage;
