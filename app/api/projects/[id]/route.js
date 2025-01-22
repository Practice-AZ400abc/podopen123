import Listing from "@/models/listing";
import { connectToDB } from "@/utils/database";

export const GET = async (req, { params }) => {
    const { id } = await params;
    await connectToDB();

    const today = new Date();

    await Listing.updateMany(
        {
            expiresAt: { $lte: today },
            status: { $ne: "Expired" }
        },
        { $set: { status: "Expired" } }
    );

    try {
        const project = await Listing.findById(id).populate('author'); // Populate the author field
        if (!project) {
            return new Response(JSON.stringify({ error: "Project not found" }), { status: 404 });
        }
        return new Response(JSON.stringify(project), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch project" }), { status: 500 });
    }
};