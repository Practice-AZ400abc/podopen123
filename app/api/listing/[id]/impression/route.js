import Listing from "@/models/listing";
import { connectToDB } from "@/utils/database";

export const POST = async (req, { params }) => {
    const { id } = await params;
    await connectToDB();

    try {
        const todayUTC = new Date();
        todayUTC.setUTCHours(0, 0, 0, 0);
        const startOfDayUTC = new Date(todayUTC);
        todayUTC.setUTCHours(23, 59, 59, 999);
        const endOfDayUTC = new Date(todayUTC);

        const listing = await Listing.findById(id);
        if (!listing) {
            return new Response(JSON.stringify({ error: "Listing not found" }), { status: 404 });
        }

        const publishedDate = new Date(listing.publishedAt);
        publishedDate.setUTCHours(0, 0, 0, 0);

        if (publishedDate > startOfDayUTC) {
            return new Response(JSON.stringify({ error: "Impressions before publish date" }), {
                status: 400,
            });
        }

        const result = await Listing.updateOne(
            {
                _id: id,
                "dailyImpressions.date": { $gte: startOfDayUTC, $lte: endOfDayUTC },
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
                        dailyImpressions: { date: startOfDayUTC, impressions: 1 },
                    },
                }
            );
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
