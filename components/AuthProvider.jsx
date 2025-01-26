"use client";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  const router = useRouter()
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
      router.push("/")
      toast.success("You have successfully logged out")
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const checkUserExists = async () => {
      try {
        const response = await fetch("/api/users", {
          body: JSON.stringify({
            email: jwtDecode(token).email,
          })
        });
        if (!response.ok) {
          throw new Error("User not found");
        }
      } catch (error) {
        console.error("Error checking user:", error);
        logout();
      }
    }

    const getUser = async () => {
      try {
        const response = await fetch(`/api/users/${jwtDecode(token)._id}`, {
          method: "GET",
        })

        if (!response) {
          throw new Error;
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (token) {
      checkUserExists();
      getUser();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
