import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const PUT = async (req) => {
    try {
        const body = await req.json();
        const { email, avatarURL, companyName, websiteURL } = body;

        if (!email) {
            return new Response(JSON.stringify({ message: "Email is required." }), { status: 400 });
        }

        await connectToDB();

        const targetUser = await User.findOne({ email });
        if (!targetUser) {
            return new Response(JSON.stringify({ message: "User not found." }), { status: 404 });
        }

        if (targetUser.role === "Seeker") {
            if (!avatarURL || !companyName || !websiteURL) {
                return new Response(
                    JSON.stringify({ message: "Avatar URL, company name, and website URL are required." }),
                    { status: 400 }
                );
            }

            targetUser.avatarURL = avatarURL;
            targetUser.companyName = companyName;
            targetUser.websiteURL = websiteURL;
            targetUser.completedProfile = true;

            await targetUser.save();
        }

        return new Response(
            JSON.stringify({ message: "Profile updated successfully.", user: targetUser }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating profile:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
};