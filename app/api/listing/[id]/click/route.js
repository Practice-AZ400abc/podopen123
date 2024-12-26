import Listing from "@/models/listing";
import { connectToDB } from "@/utils/database";

export const POST = async (req, { params }) => {
    const { id } = await params;
    await connectToDB();

    try {
        await Listing.findByIdAndUpdate(id, { $inc: { clicks: 1 } });
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};