import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: false,
    },
    name: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    completedProfile: {
      type: Boolean,
      required: false,
      default: false,
    },
    emailVerified: {
      type: Boolean,
      required: false,
      default: false,
    },
    role: {
      type: String,
      enum: ["Visa Sponsor", "Visa Seeker"],
      required: false,
      default: "Visa Sponsor",
    },
    firebaseUid: {
      type: String,
      unique: true,
      required: false,
    },
    authMethod: {
      type: String,
      required: false,
      enum: ["credentials", "google", "facebook"],
    },
    authToken: {
      type: String,
    },
    authTokenExpiry: {
      type: Date,
    },

    // Shared fields for both roles
    avatarURL: {
      type: String,
    },

    // Visa seeker fields
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    companyName: {
      type: String,
      required: false,
    },
    websiteURL: {
      type: String,
      required: false,
    },
    countryOfBirth: {
      type: String,
      required: false,
    },
    nationality: {
      type: String,
      required: false,
    },
    dualCitizenship: {
      type: Boolean,
      default: false,
      required: false,
    },
    netWorth: {
      type: String,
      required: false,
    },
    liquidAssets: {
      type: String,
      required: false,
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
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    industryToInvest: {
      type: String,
      required: false,
    },
    investmentAmount: {
      type: String,
      required: false,
    },
    countriesForVisa: {
      type: [String],
      default: [],
      required: false,
    },
    relocationTimeframe: {
      type: String,
      required: false,
    },
    relocationCountry: {
      type: String,
      required: false,
    },
    canProvideLiquidityEvidence: {
      type: Boolean,
      default: false,
      required: false,
    },
    instagram: {
      type: String,
      required: false,
    },
    linkedin: {
      type: String,
      required: false,
    },
    comments: {
      type: String,
      maxlength: 90,
      required: false,
    },
    isPublic: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
