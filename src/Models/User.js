import mongoose from "mongoose";

const Schema = mongoose.Schema;

const subLocationSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
});

// Define location schema
const locationSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  subLocations: [subLocationSchema],
});
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a valid name"],
    },
    email: {
      type: String,
      required: [true, "Please provide a valid email"],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide a valid phone number"],
    },
    organizationName: {
      type: String,
      required: [true, "Please provide a valid organization name"],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password cannot be shorter than 8 characters."],
    },
    manualMapping: {
      type: String,
      enum: ['enabled', 'disabled'],
    },
    objectDisinfection: {
      type: String,
      enum: ['enabled', 'disabled'],
    },
    otp: { type: String },
    forgotPasswordOtp: { type: String },
    isFirstTime: { type: Boolean, default: true },
    isOtpVerified: { type: Boolean, default: false },
    primaryContact: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    },
    locations: [locationSchema],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
