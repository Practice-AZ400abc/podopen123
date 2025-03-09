import User from '@/models/user';
import { connectToDB } from '@/utils/database';

export const POST = async (req) => {
    await connectToDB();
    const { email } = await req.json();

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        }

        user.isLocked = true;
        await user.save();

        return new Response(JSON.stringify({ message: "Account locked" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "An error occured" }), { status: 500 });
    }
}