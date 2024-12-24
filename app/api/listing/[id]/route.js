import Listing from "@/models/listing";
import { connectToDB } from "@/utils/database";
import verifyToken from "@/utils/verifyToken";

export const DELETE = async (req, { params }) => {
    try {
        const user = verifyToken(req);

        if (!user) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), {
                status: 401,
            });
        }

        const { id } = await params;

        if (!id) {
            return new Response(
                JSON.stringify({ message: "Listing ID is required" }),
                {
                    status: 400,
                }
            );
        }

        await connectToDB();

        const listing = await Listing.findById(id);

        if (!listing) {
            return new Response(JSON.stringify({ message: "Listing not found" }), {
                status: 404,
            });
        }

        if (listing.author.toString() !== user._id) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), {
                status: 401,
            });
        }

        await Listing.findByIdAndDelete(id);

        return new Response(
            JSON.stringify({ message: "Listing deleted successfully" }),
            {
                status: 200,
            }
        );
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
        });
    }
};

export const PUT = async (req, { params }) => {
    try {
        const body = await req.json();
        const { author, _id, ...updateBody } = body;

        if (!body || Object.keys(body).length === 0) {
            return new Response(
                JSON.stringify({ message: "Request body cannot be empty" }),
                {
                    status: 400,
                }
            );
        }

        const user = verifyToken(req);

        if (!user) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), {
                status: 401,
            });
        }

        const { id } = await params;

        if (!id) {
            return new Response(
                JSON.stringify({ message: "Listing ID is required" }),
                {
                    status: 400,
                }
            );
        }

        await connectToDB();

        const listing = await Listing.findById(id);

        if (!listing) {
            return new Response(JSON.stringify({ message: "Listing not found" }), {
                status: 404,
            });
        }

        if (listing.author.toString() !== user._id) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), {
                status: 401,
            });
        }

        const updatedListing = await Listing.findByIdAndUpdate(
            id,
            { ...updateBody },
            { new: true }
        );

        return new Response(JSON.stringify(updatedListing), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
        });
    }
};
