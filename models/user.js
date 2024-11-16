import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    require: false,
  },
  profilePicture: {
    type: String,
  },
  completedProfile: {
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
  emailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: {
    type: String,
  },
  emailVerificationTokenExpires: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetTokenExpires: {
    type: Date,
  },
}, {
  timestamps: true,
});

const User = models.User || model("User", UserSchema);

export default User;