"use client";

import React, { createContext, useState, useEffect } from "react";
import { auth } from "@/app/firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  // Check authentication state on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && storedToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setToken(null);
      }
    });

    return unsubscribe; // Clean up Firebase listener
  }, []);

  // Login function
  const login = (jwt) => {
    setToken(jwt);
    localStorage.setItem("token", jwt);
    setIsLoggedIn(true);
  };

  // Logout function
  const logout = async () => {
    try {
      setToken(null);
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      await signOut(auth); // Optionally handle Firebase logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Refresh token function
  const refreshToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, login, logout, refreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
