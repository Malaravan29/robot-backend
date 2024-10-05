import RobotVersion from "../Models/RobotVersion.js";


// Controller for fetching robot details by email extracted from token
export const getRobotDetailsByEmailId = async (req, res) => {
  try {
    // Extract email from the JWT token (set by verifyToken middleware)
    const email = req.user.email;

    // Find the robot entry using the email
    const robot = await RobotVersion.findOne({ emailId: email });  // Assuming you have emailId field in your Robot model

    if (!robot) {
      return res.status(404).json({ message: "Robot details not found for the provided email ID" });
    }

    // Return robot details if found
    res.status(200).json(robot);
  } catch (error) {
    console.error("Error fetching robot details:", error);
    res.status(500).json({ message: "Server error" });
  }
};
