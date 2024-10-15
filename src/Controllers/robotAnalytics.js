import RobotAnalytics from "../Models/RobotAnalytics.js";

// Controller function to save robot analytics data
export const saveRobotAnalytics = async (req, res) => {
  try {
    const {
      robotId,
      emailId,
      model,
      batteryPercentage,
      analytics: { batteryRunningTime, motorRunningTime, uvLightRunningTime }, // Expecting these in hh:mm:ss format
      startingTime,
      endingTime,
    } = req.body;

    // Create new instance of RobotAnalytics
    const robotAnalytics = new RobotAnalytics({
      robotId,
      emailId,
      model,
      batteryPercentage,
      analytics: {
        batteryRunningTime, // Storing as a string in hh:mm:ss format
        motorRunningTime,
        uvLightRunningTime,
      },
      startingTime,
      endingTime,
    });

    // Save the robot analytics data to the database
    await robotAnalytics.save();

    return res.json({ message: "Robot analytics saved successfully." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};