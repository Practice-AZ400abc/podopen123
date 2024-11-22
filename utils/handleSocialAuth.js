import { signInWithPopup, fetchSignInMethodsForEmail, linkWithCredential, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { auth } from "@/app/firebase/firebaseConfig";

// Utility function to handle social login
const handleSocialAuth = async (provider, login) => {
  try {
    // Perform social sign-in with Firebase
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if user exists in MongoDB
    const checkUserResponse = await fetch(`/api/users?email=${user.email}`, {
      method: "GET",
    });

    if (checkUserResponse.ok) {
      const existingUser = await checkUserResponse.json();

      const existingSignInMethods = await fetchSignInMethodsForEmail(
        auth,
        user.email
      );

      // Link social account to existing user with a password
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
      // Create a new user in MongoDB
      const newUserResponse = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firebaseUid: user.uid,
          email: user.email,
          role: "Seeker",
          completedProfile: false,
        }),
      });

      if (!newUserResponse.ok) {
        throw new Error("Failed to save new user to MongoDB.");
      }

      console.log("New user created in MongoDB:", await newUserResponse.json());
    } else {
      throw new Error("Failed to check user existence.");
    }

    // Generate a token and log the user in
    const tokenResponse = await fetch("/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firebaseUid: user.uid,
        email: user.email,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error("Failed to generate token.");
    }

    const { token } = await tokenResponse.json();
    localStorage.setItem("token", token);
    login(); // Update login state using the context

    return { token };
  } catch (error) {
    console.error("Error in handleSocialAuth:", error);
    return {
      error: error.message || "Social authentication failed.",
    };
  }
};

export default handleSocialAuth;
