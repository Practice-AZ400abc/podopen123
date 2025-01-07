import { Schema, model, models } from "mongoose";
import User from "./user";

const PaymentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        stripePaymentIntentId: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Payment = models.Payment || model("Payment", PaymentSchema);

export default Payment;
