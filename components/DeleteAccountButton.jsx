import React from "react";
import { deleteUser } from "firebase/auth";
import {auth} from "@/app/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import {useContext} from "react";
import { AuthContext } from "./AuthProvider";

const DeleteAccountButton = () => {
  const {logout} = useContext(AuthContext)
  const router = useRouter();

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("No user is currently signed in.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("JWT not found. Please log in again.");
      }

      const email = user.email;

      if (!email) {
        throw new Error("User email is not available.");
      }

      const response = await fetch(`/api/users?email=${encodeURIComponent(email)}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete user data: ${response.statusText}`);
      }

      // Delete the Firebase user
      await deleteUser(user);
      logout();

      alert("Your account and data have been successfully deleted.");
      router.push("/"); // Redirect to the home page or a confirmation page
    } catch (error) {
      console.error("Error during account deletion:", error);

      if (error.code === "auth/requires-recent-login") {
        alert("You need to re-authenticate before deleting your account.");
        // Optionally, handle re-authentication here
      } else {
        alert("An error occurred while deleting your account. Please try again.");
      }
    }
  };

  return (
    <button
      onClick={handleDeleteAccount}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Delete My Account
    </button>
  );
};

export default DeleteAccountButton;
