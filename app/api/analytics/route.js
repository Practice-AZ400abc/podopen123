import Listing from "@/models/listing";
import { connectToDB } from "@/utils/database";
import verifyToken from '@/utils/verifyToken';

export const GET = async (req) => {
    const user = verifyToken(req)

    if (!user) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    if (user.role !== "Visa Sponsor") {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    try {
        await connectToDB();

        const listings = await Listing.find({ author: user._id });

        const totalListings = listings.length;

        const totalImpressions = listings.reduce((acc, listing) => acc + listing.impressions, 0);

        const activeListings = listings.filter((listing) => listing.status === "Published").length;

        const expiredListings = listings.filter((listing) => listing.status === "Expired").length;

        const today = new Date();
        const past30DaysImpressions = listings.map((listing) => {
            const dailyImpressions = listing.dailyImpressions || [];

            const last30Days = dailyImpressions.filter((entry) => {
                const entryDate = new Date(entry.date);
                const diffTime = today - entryDate;
                const diffDays = diffTime / (1000 * 3600 * 24);
                return diffDays <= 30;
            });

            const impressionsInLast30Days = last30Days.reduce((acc, entry) => acc + entry.impressions, 0);
            return impressionsInLast30Days;
        });

        const totalLast30DaysImpressions = past30DaysImpressions.reduce((acc, impressions) => acc + impressions, 0);

        return new Response(
            JSON.stringify({
                success: true,
                data: {
                    totalListings,
                    totalImpressions,
                    activeListings,
                    expiredListings,
                    totalLast30DaysImpressions,
                },
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { status: 500 }
        );
    }
};
