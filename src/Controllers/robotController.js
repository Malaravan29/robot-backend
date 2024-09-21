// src/Controllers/robotDetailsController.js
import Robot from "../Models/Robot.js";

// Controller to save robot details
export const saveRobotDetails = async (req, res) => {
  try {
    const {
      robotId,
      emailId,
      username,
      model,
      serialNumber,
      IPAddress,
      image,
      status,
      location,
      robotInitializeDate,
      lastMaintenanceDate,
    } = req.body;

    const robot = new Robot({
      robotId,
      emailId,
      username,
      model,
      serialNumber,
      IPAddress,
      image,
      status,
      location,
      robotInitializeDate,
      lastMaintenanceDate,
    });

    await robot.save();

    return res.json({ message: "Robot details saved successfully." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Controller to get robot 
export const getRobotsByEmail = async (req, res) => {
  try {
    const { email } = req.user; // Assuming email is extracted from the verified token

    const robots = await Robot.find({ emailId: email }).exec();

    if (!robots) {
      return res.status(404).json({ message: "No robots found for this user" });
    }

    return res.json(robots);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Controller to get robot details
export const getRobotDetails = async (req, res) => {
  try {
    const { robotId } = req.params;

    const robot = await Robot.findOne({ robotId }).exec();

    if (!robot) {
      return res.status(404).json({ message: "Robot not found" });
    }

    return res.json(robot);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

