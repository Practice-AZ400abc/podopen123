import jwt from "jsonwebtoken";
import { auth } from "@/app/firebase/firebaseAdminConfig";
import verifyToken from "@/utils/verifyToken";
import User from "@/models/user";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const user = verifyToken(req);
    const { token, password } = body;
    console.log(req.body);
    console.log(token);

    if (!password) {
      return new Response(JSON.stringify({ message: "Password not found" }), {
        status: 404,
      });
    }

    if (!token && !user) {
      return new Response(JSON.stringify({ message: "Token not found" }), {
        status: 404,
      });
    }

    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      if (decodedToken.action !== "reset") {
        return new Response(JSON.stringify({ message: "Invlaid token" }), {
          status: 404,
        });
      }

      const userRecord = await auth.getUserByEmail(decodedToken.email);

      await auth.updateUser(userRecord.uid, { password });

      const dbUser = await User.findOne({ email: decodedToken.email });

      dbUser.authToken = null;
      dbUser.authTokenExpiry = null;

      await dbUser.save();
    }

    return new Response(
      JSON.stringify({ message: "Password reset successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    return new Response(JSON.stringify({ message: "An error occured" }), {
      status: 500,
    });
  }
};
