"use client";

import React, { Suspense } from "react";
import ResetPassword from "./page";

const ResetPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
};

export default ResetPage;
