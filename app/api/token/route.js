import { sign } from "jsonwebtoken";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

const secret = process.env.JWT_SECRET;

export const POST = async (req) => {
  try {
    const { firebaseUid } = await req.json();

    await connectToDB();

    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    const { password, ...userWithoutPassword } = user.toObject();

    const token = sign(userWithoutPassword, secret, { expiresIn: "7d" });
    const role = user.role;
    const completedProfile = user.completedProfile;

    return new Response(JSON.stringify({ token, role, completedProfile }), { status: 200 });
  } catch (error) {
    console.error("Error generating token:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
};
