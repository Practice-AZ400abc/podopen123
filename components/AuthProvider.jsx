"use client";

import React, { createContext, useState, useEffect } from "react";
import { auth } from "@/app/firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { jwtDecode } from "jwt-decode";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // User object for authenticated user
  const [token, setToken] = useState(null);

  // Check authentication state on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
      setUser(jwtDecode(storedToken));
      localStorage.setItem("user", user);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && storedToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setToken(null);
        setUser(null);
      }
    });

    return unsubscribe; // Clean up Firebase listener
  }, []);

  // Login function
  const login = (jwt) => {
    setToken(jwt);
    setUser(jwtDecode(jwt));
    localStorage.setItem("token", jwt);
    localStorage.setItem("user", jwtDecode(jwt));
    setIsLoggedIn(true);
  };

  // Logout function
  const logout = async () => {
    try {
      setToken(null);
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
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
      value={{ isLoggedIn, token, user, login, logout, refreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
