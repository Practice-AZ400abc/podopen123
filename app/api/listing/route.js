import Listing from "@/models/listing";
import { connectToDB } from "@/utils/database";
import verifyToken from "@/utils/verifyToken";

export const POST = async (req) => {
    try {
        const body = await req.json();
        const user = verifyToken(req);

        if (!user) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), {
                status: 401,
            });
        }
        if (user.role !== "Visa Sponsor") {
            return new Response(JSON.stringify({ message: "Unauthorized" }), {
                status: 401,
            });
        }

        const {
            countryForInvestment,
            sponsorShipDescription,
            telegram,
            whatsapp,
            contactEmail,
            phone,
            investmentIndustry,
            investmentTimeTable,
            countriesForInvestors,
            minimumInvestment,
            projectDescription,
            attachments,
        } = body;

        if (
            !countryForInvestment ||
            !sponsorShipDescription ||
            !contactEmail ||
            !investmentIndustry ||
            !investmentTimeTable ||
            !countriesForInvestors ||
            !minimumInvestment ||
            !projectDescription
        ) {
            return new Response(
                JSON.stringify({ message: "Missing required fields" }),
                { status: 400 }
            );
        }

        if (user.subscriptionStatus === "Active") {
            body.expiresAt = user.subscriptionExpiresAt;
            body.publishedAt = new Date();
        }

        const publishedListings = await Listing.find({ author: user._id, status: "Published" });

        await connectToDB();

        const listing = await Listing.create({
            ...body,
            status: (user.subscriptionStatus === "Active" && publishedListings.length === 0) ? "Published" : "Draft",
        });

        return new Response(JSON.stringify(listing), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
        });
    }
};

export const GET = async (req) => {
    try {
        const user = verifyToken(req);

        if (!user) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), {
                status: 401,
            });
        }
        if (user.role !== "Visa Sponsor") {
            return new Response(JSON.stringify({ message: "Unauthorized" }), {
                status: 401,
            });
        }

        const id = user._id

        await connectToDB();

        const today = new Date();

        await Listing.updateMany(
            {
                expiresAt: { $lte: today },
                status: { $ne: "Expired" }
            },
            { $set: { status: "Expired" } }
        );

        const listings = await Listing.find({ author: id });

        if (!listings) {
            return new Response(JSON.stringify({ message: "Listings not found" }), {
                status: 400,
            });
        }

        return new Response(JSON.stringify(listings), { status: 200 });
    } catch (error) {
        console.error("Error checking user existence:", error);
        return new Response(JSON.stringify({ message: "Internal server error" }), {
            status: 500,
        });
    }
};
