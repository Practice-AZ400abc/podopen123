import { connectToDB } from "@/utils/database";
import Payment from "@/models/payment";

export const GET = async (req, { params }) => {
    const { id } = await params;

    await connectToDB();

    try {
        const payment = await Payment.findOne({ userId: id });

        if (!payment) {
            return new Response(JSON.stringify({ message: 'Payment not found' }), {
                status: 404,
            });
        }

        return new Response(JSON.stringify(payment), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
        });
    }
}
