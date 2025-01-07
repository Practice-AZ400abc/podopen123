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

        const dailyImpressionsLast30Days = Array.from({ length: 30 }, (_, index) => {
            const date = new Date(today);
            date.setDate(today.getDate() - index);
            const dateString = date.toISOString().split("T")[0];
            return {
                date: dateString,
                impressions: 0,
            };
        });

        listings.forEach((listing) => {
            const dailyImpressions = listing.dailyImpressions || [];
            dailyImpressions.forEach((entry) => {
                const entryDate = new Date(entry.date).toISOString().split("T")[0];
                const index = dailyImpressionsLast30Days.findIndex((day) => day.date === entryDate);
                if (index !== -1) {
                    dailyImpressionsLast30Days[index].impressions += entry.impressions;
                }
            });
        });

        console.log(dailyImpressionsLast30Days);

        return new Response(
            JSON.stringify({
                success: true,
                data: {
                    totalListings,
                    totalImpressions,
                    activeListings,
                    expiredListings,
                    dailyImpressionsLast30Days,
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
