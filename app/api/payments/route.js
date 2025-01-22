import Payment from '@/models/payment';
import { connectToDB } from '@/utils/database';

export const POST = async (req) => {
    await connectToDB();

    try {
        const { transactionId, userId, amount, currency, status } = await req.json();

        const newPayment = new Payment({
            transactionId,
            userId,
            amount,
            currency,
            status,
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