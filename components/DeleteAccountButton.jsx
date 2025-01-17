import React from "react";
import { deleteUser } from "firebase/auth";
import { auth } from "@/app/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import toast from "react-hot-toast";


const DeleteAccountButton = () => {
  const { logout } = useContext(AuthContext)
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

      toast.success("Your account and data have been successfully deleted.");
      router.push("/"); // Redirect to the home page or a confirmation page
    } catch (error) {
      console.error("Error during account deletion:", error);

      if (error.code === "auth/requires-recent-login") {
        alert("");
        // Optionally, handle re-authentication here
      } else {
        alert("An error occurred while deleting your account. Please try again.");
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-red-500 w-fit px-6 py-2 text-white font-bold rounded-lg hover:bg-red-400">Delete my Profile</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500 text-2xl font-bold">Warning:</AlertDialogTitle>
          <AlertDialogDescription>
            By clicking continue your profile and credentials will be deleted from our platform.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-500 text-white">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAccountButton;
