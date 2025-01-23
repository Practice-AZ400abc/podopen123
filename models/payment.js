import { Schema, model, models } from "mongoose";

const PaymentSchema = new Schema(
    {
        orderId: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Payment = models.Payment || model("Payment", PaymentSchema);

export default Payment;
