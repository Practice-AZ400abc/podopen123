import Listing from "@/models/listing";
import { connectToDB } from "@/utils/database";

export const GET = async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const country = searchParams.get("country");

        if (!country) {
            return new Response(
                JSON.stringify({ message: "Missing country parameter" }),
                { status: 400 }
            );
        }

        await connectToDB();

        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() - 30);

        await Listing.updateMany(
            {
                createdAt: { $lte: expiryDate },
                status: { $ne: "Expired" },
            },
            { $set: { status: "Expired" } }
        );

        const listings = await Listing.find({
            status: "Published",
            countryForInvestment: country,
        });

        if (!listings) {
            return new Response(JSON.stringify({ message: "Listings not found" }), {
                status: 404,
            });
        }

        return new Response(JSON.stringify(listings), { status: 200 });
    } catch (error) {
        console.error("Error getting listings: ", error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
            status: 500,
        });
    }
};
