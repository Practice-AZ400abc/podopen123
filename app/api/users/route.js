import { connectToDB } from "@/utils/database";
import User from "@/models/user";

// POST method
export async function POST(req) {
  const { firebaseUid, email, role, completedProfile } = await req.json();

  if (!firebaseUid || !email || !role) {
    return new Response(
      JSON.stringify({ error: "Missing required fields." }),
      { status: 400 }
    );
  }

  try {
    await connectToDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "User already exists." }),
        { status: 409 }
      );
    }

    const newUser = new User({
      firebaseUid,
      email,
      role,
      completedProfile: completedProfile || false,
    });

    await newUser.save();

    return new Response(
      JSON.stringify({ message: "User created successfully.", user: newUser }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      { status: 500 }
    );
  }
}
