"use client";

import React, { createContext, useState, useEffect } from "react";
import { auth } from "@/app/firebase/firebaseConfig"; // Firebase configuration (if needed for login)
import { onAuthStateChanged, signOut } from "firebase/auth"; // Firebase auth methods

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null); // State to store JWT token
  const [email, setEmail] = useState(null); // State to store user's email

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
        setEmail(user.email); // Set the user's email when authenticated
      } else {
        setIsLoggedIn(false);
        setToken(null);
        setEmail(null); // Reset email when logged out
      }
    });

    return unsubscribe; // Clean up the listener when the component unmounts
  }, []);

  // Login function (use the JWT returned from your backend after login)
  const login = (jwt, userEmail) => {
    setToken(jwt); // Set JWT token after successful login
    setEmail(userEmail); // Set the email after login
    localStorage.setItem("token", jwt); // Store token in localStorage
    setIsLoggedIn(true);
  };

  // Logout function (remove JWT from state and storage)
  const logout = async () => {
    try {
      // Clear JWT from state and localStorage
      setToken(null);
      setIsLoggedIn(false);
      setEmail(null); // Clear email on logout
      localStorage.removeItem("token");

      // Optionally, log out from Firebase, depending on how your app handles that
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const refreshToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken); // Update localStorage
  };
  

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, email, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};
