import { sendActionEmail } from "@/utils/email";
import jwt from "jsonwebtoken";
import User from "@/models/user";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

export const POST = async (req) => {
  try {
    const { email, action } = await req.json();

    if (!["verify", "reset", "listingCreated"].includes(action)) {
      return new Response(JSON.stringify({ message: "Invalid action type." }), {
        status: 400,
      });
    }

    if (action === "listingCreated") {
      await sendActionEmail(email, action);
      return new Response(
        JSON.stringify({ message: "Listing creation email sent successfully." }),
        { status: 200 }
      );
    }

    const randomString = crypto.randomBytes(16).toString("hex");

    const secretKey = process.env.JWT_SECRET;
    const expiresIn = action === "verify" ? "24h" : "48h";
    const token = jwt.sign({ randomString, email, action }, secretKey, { expiresIn });

    await sendActionEmail(email, action, token);

    if (action === "verify") {
      const user = await User.findOne({ email });
      if (!user) {
        return new Response(
          JSON.stringify({ message: "User not found." }),
          { status: 404 }
        );
      }
      user.authToken = token;
      user.authTokenExpiry = Date.now() + 3600 * 1000;
      await user.save();
    }

    if (action === "reset") {
        const user = await User.findOne({ email });
        if (!user) {
          return new Response(
            JSON.stringify({ message: "User not found." }),
            { status: 404 }
          );
        }
        user.authToken = token;
        user.authTokenExpiry = Date.now() + 900 * 1000;
        await user.save();
      }

    return new Response(
      JSON.stringify({ message: `Email sent successfully for ${action}.` }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to send email:", error);
    return new Response(JSON.stringify({ message: "Email sending failed." }), {
      status: 500,
    });
  }
};
