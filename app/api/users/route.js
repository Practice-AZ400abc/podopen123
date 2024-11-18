import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const firebaseUid = searchParams.get("firebaseUid");
    const email = searchParams.get("email");

    if (!firebaseUid && !email) {
      return new Response(
        JSON.stringify({ message: "Missing firebaseUid or email parameter" }),
        { status: 400 }
      );
    }

    await connectToDB();

    let user;
    if (firebaseUid) {
      user = await User.findOne({ firebaseUid });
    } else if (email) {
      user = await User.findOne({ email });
    }

    if (user) {
      return new Response(JSON.stringify(user), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
  } catch (error) {
    console.error("Error checking user existence:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};

export const POST = async (req) => {
  try {
    const body = await req.json();

    if (!body.firebaseUid || !body.email || !body.role) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    await connectToDB();

    const existingUser = await User.findOne({ firebaseUid: body.firebaseUid });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 409,
      });
    }

    const newUser = await User.create(body);

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};
