import Robotmsg from "../Models/Robotmsg.js";
import { robotemail } from "../utils/robotemail.js";
// import { robotsms } from "../utils/robotsms.js";

// Create a new robot message entry
export const createRobotmsg = async (req, res) => {
  try {
    const {
      robotId,
      emailId,
      message,
    } = req.body;

    // Validate required fields
    if (
      !robotId ||
      !emailId ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided.",
      });
    }

    // Create a new robot message entry
    const newRobotmsg = new Robotmsg({
      robotId,
      emailId,
      message,
    });

    // Save the robot message entry to the database
    const savedRobotmsg = await newRobotmsg.save();

    // Send email with the robot message details and image attachment
    await robotemail(
      "malaravanmanimaran@gmail.com",
      robotId,
      emailId,
      message,
    );

    // //  to send SMS
    // await robotsms(
    //   "+918056824497", 
    //   `New Robot Message Details:\nRobot ID: ${robotId}\nMessage: ${message}`
    // );

    res.status(201).json({
      success: true,
      data: savedRobotmsg,
      message: "Robot message created and email sent successfully",
    });
  } catch (error) {
    console.error("Error creating robot message:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create robot message",
      error: error.message,
    });
  }
};
