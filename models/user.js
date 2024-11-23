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
      enum: ["Investor", "Seeker"],
      required: true,
      default: "Investor",
    },
    firebaseUid: {
      type: String,
      unique: true,
      required: true,
    },
    authToken: {
      type: String,
    },
    authTokenExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
