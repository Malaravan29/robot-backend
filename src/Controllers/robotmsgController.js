import Robotmsg from "../Models/Robotmsg.js";
import { sendRobotmsgEmail } from "../utils/robotmsg.js";
import { sendTestSMS } from "../utils/sendTestSMS.js";

// Create a new robot message entry
export const createRobotmsg = async (req, res) => {
  try {
    const {
      robotId,
      emailId,
      message,
      camera_image1,
      camera_image2,
      camera_image3,
      camera_image4,
      map_image,
    } = req.body;

    // Validate required fields
    if (
      !robotId ||
      !emailId ||
      !message ||
      !camera_image1 ||
      !camera_image2 ||
      !camera_image3 ||
      !camera_image4 ||
      !map_image
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
      camera_image1,
      camera_image2,
      camera_image3,
      camera_image4,
      map_image, // Directly use the base64 encoded image data
    });

    // Save the robot message entry to the database
    const savedRobotmsg = await newRobotmsg.save();

    // Send email with the robot message details and image attachment
    await sendRobotmsgEmail(
      "malaravanmanimaran@gmail.com",
      robotId,
      emailId,
      message,
      camera_image1,
      camera_image2,
      camera_image3,
      camera_image4,
      map_image // Pass the camera_image here
    );

    // Uncomment to send SMS

    // await sendTestSMS(
    //   "+918056824497", // Update with the correct phone number format
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
