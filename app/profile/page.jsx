"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useContext } from "react";
import "react-international-phone/style.css";
import { AuthContext } from "@/components/AuthProvider";
import ProfileForm from "@/components/profile-form";

const ProfilePage = () => {
  const { token, isLoggedIn, login } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="mx-auto container">
      <ProfileForm token={token} login={login} />
    </div>
  );
};

export default ProfilePage;
