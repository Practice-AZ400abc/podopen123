import verifyToken from '@/utils/verifyToken';
import { connectToDB } from '@/utils/database';
import User from '@/models/user';

export const GET = async (req, { params }) => {
    const user = verifyToken(req);

    if (!user) {
        console.log("Unauthorized");
        return new Response({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.subscriptionStatus !== "Active") {
        console.log("Subscription not active");
        return new Response({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await connectToDB();

    try {
        const seeker = await User.findById(id);

        if (!seeker) {
            return new Response(JSON.stringify({ message: "Seeker not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(seeker), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal sever error" }), { status: 500 });
    }
};