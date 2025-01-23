import Payment from '@/models/payment';
import { connectToDB } from '@/utils/database';

export const POST = async (req) => {
    await connectToDB();

    try {
        const body = await req.json();

        const {
            orderId,
            userId,
            amount,
            currency
        } = body

        console.log(body)

        const newPayment = new Payment({
            orderId,
            userId,
            amount,
            currency
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