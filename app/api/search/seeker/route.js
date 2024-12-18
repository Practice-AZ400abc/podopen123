import User from "@/models/user";
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

        const investors = await User.find({ role: "Visa Seeker", countriesForVisa: { $in: [country] }, isPublic: true });

        if (!investors) {
            return new Response(JSON.stringify({ message: "Investors not found" }), {
                status: 404,
            });
        }

        console.log(investors)
        return new Response(JSON.stringify(investors), { status: 200 });
    } catch (error) {
        console.error("Error updating profile:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}