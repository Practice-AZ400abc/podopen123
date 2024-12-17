import {
  signInWithPopup,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "@/app/firebase/firebaseConfig";

const handleSocialAuth = async (provider) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const checkUserResponse = await fetch(`/api/users?email=${user.email}`, {
      method: "GET",
    });

    if (checkUserResponse.ok) {
      const existingUser = await checkUserResponse.json();

      const existingSignInMethods = await fetchSignInMethodsForEmail(
        auth,
        user.email
      );

      if (existingSignInMethods.includes("password")) {
        const credential =
          provider instanceof GoogleAuthProvider
            ? GoogleAuthProvider.credentialFromResult(result)
            : FacebookAuthProvider.credentialFromResult(result);

        await linkWithCredential(auth.currentUser, credential);

        console.log("Social account linked with existing user:", existingUser);
      } else {
        console.log("User already exists, no linking required.");
      }
    } else if (checkUserResponse.status === 404) {
      const newUserResponse = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firebaseUid: user.uid,
          email: user.email,
          role: "Visa Seeker",
          emailVerified: true,
          completedProfile: false,
          authMethod:
            provider instanceof GoogleAuthProvider ? "google" : "facebook",
        }),
      });

      if (!newUserResponse.ok) {
        throw new Error("Failed to save new user to MongoDB.");
      }

      console.log("New user created in MongoDB:", await newUserResponse.json());
    } else {
      throw new Error("Failed to check user existence.");
    }

    const tokenResponse = await fetch("/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firebaseUid: user.uid,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error("Failed to generate token.");
    }

    const { token } = await tokenResponse.json();

    const userProfileResponse = await fetch(`/api/users?email=${user.email}`, {
      method: "GET",
    });

    if (!userProfileResponse.ok) {
      throw new Error("Failed to fetch user profile.");
    }

    const userProfile = await userProfileResponse.json();

    localStorage.setItem("token", token);

    return { token, completedProfile: userProfile.completedProfile };
  } catch (error) {
    console.error("Error in handleSocialAuth:", error);
    return {
      error: error.message || "Social authentication failed.",
    };
  }
};


export default handleSocialAuth;
