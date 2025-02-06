import verifyToken from "@/utils/verifyToken";
import { connectToDB } from "@/utils/database";
import Payment from "@/models/payment";

export const GET = async (req) => {
    const user = verifyToken(req);

    if (!user) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    if (user.role !== "Admin") {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 })
    }

    await connectToDB();

    try {
        const payments = await Payment.find().populate("userId");

        if (!payments) {
            return new Response(JSON.stringify({ message: 'Payments not found' }), { status: 404 });
        }

        console.log(payments);
        return new Response(JSON.stringify(payments), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
        });
    }
}