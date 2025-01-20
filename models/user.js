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

    // Visa seeker fields
    websiteURL: {
      type: String,
    },
    countryOfBirth: {
      type: String,
    },
    nationality: {
      type: String,
    },
    dualCitizenship: {
      type: Boolean,
    },
    netWorth: {
      type: String,
    },
    liquidAssets: {
      type: String,
    },
    industryToInvest: {
      type: String,
    },
    investmentAmount: {
      type: String,
    },
    countriesForVisa: {
      type: [String],
    },
    relocationTimeframe: {
      type: String,
    },
    relocationCountry: {
      type: String,
    },
    canProvideLiquidityEvidence: {
      type: Boolean,
    },
    instagram: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    comments: {
      type: String,
      maxlength: 90,
    },
    isPublic: {
      type: Boolean,
    },

    // Visa sponsor fields
    investmentRole: {
      type: String,
    },
    countryLocation: {
      type: String,
    },
    subscriptionStatus: {
      type: String,
      required: true,
      enum: ["Active", "Inactive"],
      default: "Inactive",
    },
    subscriptionExpiresAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
