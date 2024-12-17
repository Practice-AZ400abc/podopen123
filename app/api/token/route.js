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

    const token = sign(
      {
        user,
      },
      secret,
      { expiresIn: "7d" }
    );

    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    console.error("Error generating token:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
};
