import Payment from '@/models/payment';
import { connectToDB } from '@/utils/database';
import verifyToken from '@/utils/verifyToken';

export const POST = async (req) => {
    await connectToDB();

    try {
        const body = await req.json();

        console.log(body)

        const newPayment = new Payment({
            ...body,
        });

        await newPayment.save();

        return new Response(JSON.stringify(newPayment), { status: 201 });
    } catch (error) {
        console.error('Error creating payment:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
        });
    }
};

export const GET = async (req) => {
    const user = verifyToken(req);

    if (!user) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    await connectToDB();

    try {
        const payments = await Payment.find({ userId: user._id }).populate("userId");

        if (!payments) {
            return new Response(JSON.stringify({ message: 'Payments not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(payments), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
        });
    }
}