import StartMappingData from "../Models/startMapping.js"
import History from "../Models/History.js";
import { Buffer } from "buffer";
const ROBOT_IDS = [
  "0001",
  "0002",
  "0003",
  "0004",
  "0005",
  "0006",
  "0007",
  "0008",
  "0009",
  "0010",
];
export const saveMappingData = async (req, res) => {
  try {
    const {
      type,
      userId,
      robotId,
      robotName,
      mode,
      feedback,
      linear_velocity = [],
      angular_velocity = [],
      current_position = [],
      current_orientation = [],
      map_image,
      completion_command,
      map_name,
      timeTaken,
      status,
      percentageCompleted,
      position,
      orientation,
    } = req.body;
    console.log("user requet body :", req.body);

    if (!type || (type !== "automatic" && type !== "manual")) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing type. Expected 'automatic' or 'manual'.",
      });
    }

    if (type === "automatic") {
      if (!robotId || !ROBOT_IDS.includes(robotId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid or missing robotId.",
        });
      }

      if (
        !userId ||
        !mode ||
        !feedback ||
        !Array.isArray(linear_velocity) ||
        !Array.isArray(angular_velocity) ||
        !Array.isArray(current_position) ||
        !Array.isArray(current_orientation) ||
        !map_image ||
        !completion_command ||
        !map_name ||
        !timeTaken ||
        !status ||
        !percentageCompleted
      ) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields or invalid data types.",
        });
      }

      const imageBase64 = Buffer.from(map_image, "base64").toString("base64");

      const startMappingData = new StartMappingData({
        userId,
        robotId,
        mode,
        feedback,
        linear_velocity,
        angular_velocity,
        current_position,
        current_orientation,
        map_image: imageBase64,
        completion_command,
        map_name,
        timeTaken,
        status,
        percentageCompleted,
      });

      await startMappingData.save();
      console.log("startmapping data is:", startMappingData);
      return res.status(201).json({
        success: true,
        message: "Automatic mapping data saved successfully.",
        data: startMappingData,
      });
    } else if (type === "manual") {
      if (
        !robotName ||
        !map_name ||
        !map_image ||
        !timeTaken ||
        !percentageCompleted ||
        !status ||
        !linear_velocity ||
        !angular_velocity ||
        !position ||
        !orientation
      ) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields or invalid data types.",
        });
      }

      const imageBase64 = Buffer.from(map_image, "base64").toString("base64");

      const history = new History({
        robotName,
        mapName: map_name,
        image: imageBase64,
        timeTaken,
        percentCompleted: percentageCompleted,
        status,
        linear_velocity,
        angular_velocity,
        position,
        orientation,
      });

      await history.save();
      console.log("manual mapping data is :", history);
      return res.status(201).json({
        success: true,
        message: "Manual mapping data saved successfully.",
        data: history,
      });
    }
  } catch (error) {
    console.error("Error saving mapping data:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while saving mapping data.",
      error: error.message,
    });
  }
};