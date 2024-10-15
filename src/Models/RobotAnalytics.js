import { Schema as MongooseSchema, model } from "mongoose";

// Define schema for robot analytics
const RobotAnalyticsSchema = new MongooseSchema({
  robotId: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  batteryPercentage: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  analytics: {
    batteryRunningTime: {
      type: String, // Store as hh:mm:ss format
      required: true,
      default: "00:00:00", // Default to 0 hours, 0 minutes, 0 seconds
    },
    motorRunningTime: {
      type: String, // Store as hh:mm:ss format
      required: true,
      default: "00:00:00",
    },
    uvLightRunningTime: {
      type: String, // Store as hh:mm:ss format
      required: true,
      default: "00:00:00",
    },
  },
  startingTime: {
    type: Date,
    required: true,  // Starting time of the task or activity
  },
  endingTime: {
    type: Date,
    required: true,  // Ending time of the task or activity
  },
});

const RobotAnalytics = model("RobotAnalytics", RobotAnalyticsSchema);

export default RobotAnalytics;
