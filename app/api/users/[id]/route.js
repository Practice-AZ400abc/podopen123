import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const GET = async (req, { params }) => {
    await connectToDB();

    try {
        const { id } = await params;

        const today = new Date();

        const user = await User.findById(id);

        if (!user) {
            return new Response(JSON.stringify({ message: "user not found" }), {
                status: 404,
            })
        }

        if (today >= user.subscriptionExpiresAt) {
            user.subscriptionStatus = "Inactive";
            user.subscriptionExpiresAt = null;

            await user.save;
        }

        return new Response(JSON.stringify({ user }), {
            status: 201,
        })
    } catch (error) {
        console.error("Error getting user:", error);
        return new Response(JSON.stringify({ message: "Internal server error" }), {
            status: 500,
        });
    }
}

export const PUT = async (req, { params }) => {
    await connectToDB();

    try {
        const { id } = await params;
        const body = await req.json();

        const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });

        if (!updatedUser) {
            return new Response(
                JSON.stringify({ message: "User not found" }),
                { status: 404 }
            );
        }

        return new Response(JSON.stringify(updatedUser), { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return new Response(JSON.stringify({ message: "Internal server error" }), {
            status: 500,
        });
    }
};
