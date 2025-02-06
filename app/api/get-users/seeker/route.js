import { connectToDB } from '@/utils/database';
import verifyToken from '@/utils/verifyToken';
import User from '@/models/user';

export const GET = async (req) => {
    const user = verifyToken(req);

    if (!user) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    if (user.role !== "Admin") {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    await connectToDB();

    try {
        const users = await User.find({ role: "Visa Seeker" });

        if (users.length === 0) {
            return new Response(JSON.stringify({ message: "No users found" }), { status: 404 });
        }

        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: `An error occurred: ${error.message}` }), { status: 500 });
    }
};
