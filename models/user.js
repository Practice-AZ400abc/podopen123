import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    completedProfile: {
      type: Boolean,
      required: true,
      default: false,
    },
    emailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    role: {
      type: String,
      enum: ["Visa Sponsor", "Visa Seeker"],
      required: true,
      default: "Visa Sponsor",
    },
    firebaseUid: {
      type: String,
      unique: true,
      required: true,
    },
    authMethod: {
      type: String,
      required: true,
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
    },
    lastName: {
      type: String,
    },
    companyName: {
      type: String,
    },
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
      default: false,
    },
    netWorth: {
      type: String,
    },
    liquidAssets: {
      type: String,
    },
    telegram: {
      type: String,
    },
    whatsapp: {
      type: String,
    },
    phone: {
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
      default: [],
    },
    relocationTimeframe: {
      type: String,
    },
    relocationCountry: {
      type: String,
    },
    canProvideLiquidityEvidence: {
      type: Boolean,
      default: false,
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
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
