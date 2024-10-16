import RobotAnalytics from "../Models/RobotAnalytics.js";

// Controller function to save robot analytics data
export const saveRobotAnalytics = async (req, res) => {
  try {
    const {
      robotId,
      emailId,
      model,
      batteryPercentage,
      analytics: {
        batteryRunningTime: { startingTime: batteryStartTime, endingTime: batteryEndTime },
        motorRunningTime: { startingTime: motorStartTime, endingTime: motorEndTime },
        uvLightRunningTime: { startingTime: uvLightStartTime, endingTime: uvLightEndTime },
      },
    } = req.body;

    // Create a new instance of RobotAnalytics
    const robotAnalytics = new RobotAnalytics({
      robotId,
      emailId,
      model,
      batteryPercentage,
      analytics: {
        batteryRunningTime: {
          startingTime: batteryStartTime,
          endingTime: batteryEndTime
        },
        motorRunningTime: {
          startingTime: motorStartTime,
          endingTime: motorEndTime
        },
        uvLightRunningTime: {
          startingTime: uvLightStartTime,
          endingTime: uvLightEndTime
        },
      },
    });

    // Save the robot analytics data to the database
    await robotAnalytics.save();

    return res.json({ message: "Robot analytics saved successfully." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};