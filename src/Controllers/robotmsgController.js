import Robotmsg from "../Models/Robotmsg.js";
import { sendRobotmsgEmail } from "../utils/robotmsg.js";
// import { robotsms } from "../utils/robotsms.js";

// Create a new robot message entry
export const createRobotmsg = async (req, res) => {
  try {
    const { robotId, emailId, message } = req.body;

    // Create a new robot message entry
    const newRobotmsg = new Robotmsg({
      robotId,
      // emailId,
      message,
    });

    // Save the robot message entry to the database
    const savedRobotmsg = await newRobotmsg.save();

    // Send email with the robot message details
    await sendRobotmsgEmail(
      "malaravanmanimaran@gmail.com",
      robotId,
      // emailId,
      message
    );


    // Send SMS with the robot message details


    // const sms = await robotsms(
    //   "+918870841909",  // Update with the correct phone number format
    //   `New Robot Message Details:\nRobot ID: ${robotId}\nMessage: ${message}`
    // );
    
    // console.log(sms);

    res.status(201).json({
      success: true,
      data: savedRobotmsg,
      message: "Robot message created and email sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create robot message",
      error: error.message,
    });
  }
};
