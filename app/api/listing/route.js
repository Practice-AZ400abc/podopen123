import Listing from "@/models/listing";
import { connectToDB } from "@/utils/database";
import verifyToken from "@/utils/verifyToken";

export const POST = async (req) => {
    try {
        const body = await req.json();
        const user = verifyToken(req);

        if (!user) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
        }
        if (user.role !== "Visa Sponsor") {
            return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
        }

        await connectToDB();

        const listing = await Listing.create({
            ...body,
            author: user._id,
        })

        return new Response(JSON.stringify(listing), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}