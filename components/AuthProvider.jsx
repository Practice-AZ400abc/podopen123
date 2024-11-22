"use client"

import React, { createContext, useState, useEffect } from "react";
import { auth } from "@/app/firebase/firebaseConfig"; // Import Firebase config (if needed for login)
import { onAuthStateChanged, signOut } from "firebase/auth"; // You might still use Firebase for auth, but JWTs for token management

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null); // State to store JWT token

  // Check auth state on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken); // Retrieve JWT from localStorage if available
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && storedToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setToken(null);
      }
    });

    return unsubscribe; // Clean up the listener when the component unmounts
  }, []);

  // Login function (use the JWT returned from your backend after login)
  const login = (jwt) => {
    setToken(jwt); // Set JWT token after successful login
    localStorage.setItem("token", jwt); // Store token in localStorage
    setIsLoggedIn(true);
  };

  // Logout function (remove JWT from state and storage)
  const logout = async () => {
    try {
      // Clear JWT from state and localStorage
      setToken(null);
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      
      // Optionally, you could also log out from Firebase, depending on how your app handles that
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
