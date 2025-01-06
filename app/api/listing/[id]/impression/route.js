import Listing from "@/models/listing";
import { connectToDB } from "@/utils/database";

export const POST = async (req, { params }) => {
    const { id } = await params;
    await connectToDB();

    try {
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        const result = await Listing.updateOne(
            {
                _id: id,
                "dailyImpressions.date": { $gte: startOfDay, $lte: endOfDay },
            },
            {
                $inc: { impressions: 1, "dailyImpressions.$.impressions": 1 },
            }
        );

        if (result.matchedCount === 0) {
            await Listing.updateOne(
                { _id: id },
                {
                    $inc: { impressions: 1 },
                    $push: {
                        dailyImpressions: { date: startOfDay, impressions: 1 },
                    },
                }
            );
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
