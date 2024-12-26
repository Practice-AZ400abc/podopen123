import Listing from "@/models/listing";
import { connectToDB } from "@/utils/database";

export const POST = async (req, { params }) => {
    const { id } = await params;
    await connectToDB();

    try {
        const today = new Date();
        const todayString = today.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"

        await Listing.findByIdAndUpdate(id, { $inc: { impressions: 1 } });

        const listing = await Listing.findById(id);
        const dailyImpressions = listing.dailyImpressions || [];

        const todayImpression = dailyImpressions.find(
            (entry) => entry.date === todayString
        );

        if (todayImpression) {
            await Listing.findByIdAndUpdate(
                id,
                {
                    $set: {
                        "dailyImpressions.$.impressions": todayImpression.impressions + 1,
                    },
                },
                { new: true }
            );
        } else {
            await Listing.findByIdAndUpdate(
                id,
                {
                    $push: {
                        dailyImpressions: {
                            date: todayString,
                            impressions: 1,
                        },
                    },
                },
                { new: true }
            );
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
