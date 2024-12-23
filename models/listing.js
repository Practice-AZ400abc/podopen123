import { Schema, model, models } from "mongoose";
import User from "./user";

const ListingSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: User,
            required: true,
        },
        countryForInvestment: {
            type: String,
            required: true,
        },
        sponsorShipDescription: {
            type: String,
            required: true,
        },
        telegram: {
            type: String,
            required: false,
        },
        whatsapp: {
            type: String,
            required: false,
        },
        contactEmail: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: false,
        },
        investmentIndustry: {
            type: String,
            required: true,
        },
        investmentTimeTable: {
            type: Date,
            required: true,
        },
        countriesForInvestors: {
            type: [String],
            required: true,
        },
        minimumInvestment: {
            type: String,
            required: true,
        },
        projectDescription: {
            type: String,
            required: true,
        },
        images: {
            type: [String],
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const Listing = models.Listing || model("Listing", ListingSchema);

export default Listing;
