"use client";

import React, { createContext, useState, useEffect } from "react";
import { auth } from "@/app/firebase/firebaseConfig"; // Import Firebase config
import { onAuthStateChanged, signOut } from "firebase/auth";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check auth state on initial load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // If user exists, set logged in to true
    });
    return unsubscribe; // Clean up the listener when the component unmounts
  }, []);

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false); // Update state when logged out
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
