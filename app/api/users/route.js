import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import Listing from "@/models/listing";
import verifyToken from "@/utils/verifyToken";
import extractPublicIdFromUrl from "@/utils/extractPublicIdFromUrl";
import deleteFromCloudinary from "@/utils/deleteFromCloudinary";

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
    const user = verifyToken(req);

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

export const DELETE = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const user = verifyToken(req);

    if (!user) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    if (!email) {
      return new Response(
        JSON.stringify({ message: "Missing email parameter" }),
        { status: 400 }
      );
    }

    await connectToDB();

    const userRecord = await User.findOneAndDelete({ email: email });

    if (userRecord && userRecord.avatar) {
      await deleteFromCloudinary(extractPublicIdFromUrl(userRecord.avatar));
    }

    const listings = await Listing.find({ author: user._id });

    for (const listing of listings) {
      if (listing.attachments && listing.attachments.length > 0) {
        for (const attachment of listing.attachments) {
          await deleteFromCloudinary(extractPublicIdFromUrl(attachment));
        }
      }
    }

    await Listing.deleteMany({ author: user._id });

    return new Response(JSON.stringify({ message: "User deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};
