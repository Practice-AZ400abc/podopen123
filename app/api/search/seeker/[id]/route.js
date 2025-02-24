import verifyToken from '@/utils/verifyToken';
import { connectToDB } from '@/utils/database';
import User from '@/models/user';

export const GET = async (req, { params }) => {

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