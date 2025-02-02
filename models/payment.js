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
        paymentMethod: {
            type: String,
            required: true,
            enum: ['Card', 'PayPal'],
        },
        cardNumber: {
            type: String,
            required: false,
        },
        cardBrand: {
            type: String,
            required: false,
        },
        paypalEmailAddress: {
            type: String,
            required: false,
        },
        paypalAcountId: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

const Payment = models.Payment || model("Payment", PaymentSchema);

export default Payment;
