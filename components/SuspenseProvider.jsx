"use client";

import { Suspense } from "react";

const SuspenseProvider = ({ children }) => {
  return <Suspense>{children}</Suspense>;
};

export default SuspenseProvider;
