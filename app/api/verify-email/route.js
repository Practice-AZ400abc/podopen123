import jwt from 'jsonwebtoken';
import User from "@/models/user";

export const POST = async (req) => {
  const { token } = await req.json();

  if (!token) {
    return new Response(
      JSON.stringify({ error: "No token provided" }),
      { status: 400 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: decoded.email });

    if (!user || user.authToken !== token || user.authTokenExpiry < Date.now()) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired token" }),
        { status: 400 }
      );
    }

    user.emailVerified = true;
    user.authToken = null;
    user.authTokenExpiry = null;

    await user.save();

    return new Response(
      JSON.stringify({ message: "Email verified successfully." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during token verification:", error);
    return new Response(
      JSON.stringify({ error: "Invalid or expired token" }),
      { status: 400 }
    );
  }
};
