"use client";

import React, { Suspense } from "react";
import VerifyEmail from "./page";
 // Move your page logic here

const VerifyEmailPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmail />
    </Suspense>
  );
};

export default VerifyEmailPage;
