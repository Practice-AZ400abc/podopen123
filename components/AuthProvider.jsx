"use client";

import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        setIsLoggedIn(true);
      }
    }
  }, []);

  const login = (jwt) => {
    setToken(jwt);
    localStorage.setItem("token", jwt);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      setToken(null);
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      window.location.reload(false);
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
