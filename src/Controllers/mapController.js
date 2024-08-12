import StartMappingData from "../Models/Mapping.js";
import {Buffer} from "buffer"
const ROBOT_IDS = ["0001","0002","0003","0004","0005","0006","0007","0008","0009","0010"]

export const startMapping = async (req, res) => {
  try {
    const { userId } = req.query;

    return res.status(200).json({
      success: true,
      message: "Mapping started successfully.",
      userId,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while starting the mapping process.",
      error: error.message,
    });
  }
};

export const saveMappingData = async (req, res) => {
  try {
    const {
      userId,
      robotId,
      mode,
      feedback,
      linear_velocity,
      angular_velocity,
      current_position,
      current_orientation,
      map_image,
      completion_command,
      map_name,
      timeTaken,
      status,
      percentageCompleted,
    } = req.body;
    console.log("request body :",req.body)
    if (!robotId || !ROBOT_IDS.includes(robotId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing robotId.",
      });
    }

    if (
      !userId ||
      !robotId ||
      !ROBOT_IDS.includes(robotId) ||
      !mode ||
      !feedback ||
      !linear_velocity ||
      !angular_velocity ||
      !current_position ||
      !current_orientation ||
      !map_image ||
      !completion_command ||
      !map_name ||
      !timeTaken ||
      !status ||
      !percentageCompleted
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields. Ensure all fields are provided and contain valid data.",
      });
    }
 
    const imageBase64 = Buffer.from(map_image,"base64").toString('base64');
    console.log("base64 :",imageBase64)
    const startMappingData = new StartMappingData({
      userId,
      robotId,
      mode,
      feedback,
      linear_velocity,
      angular_velocity,
      current_position,
      current_orientation,
      map_image:imageBase64,
      completion_command,
      map_name,
      timeTaken,
      status,
      percentageCompleted,
    });

    await startMappingData.save();
    console.log("saved in backend :",startMappingData)
    return res.status(201).json({
      success: true,
      message: "Mapping data saved successfully.",
      data: startMappingData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while saving mapping data.",
      error: error.message,
    });
  }
};


export const getListMaps = async (req, res) => {
  try {
    const { userId, robotId } = req.query;

    if (!userId || !robotId) {
      console.log("Missing parameters: userId or robotId");
      return res
        .status(400)
        .json({ success: false, error: "userId & robotId is required." });
    }

    if (robotId && !ROBOT_IDS.includes(robotId)) {
      console.log("Invalid robotId provided:", robotId);
      return res.status(400).json({
        success: false,
        error: "Invalid robotId provided.",
      });
    }

    const query = { userId };
    if (robotId) {
      query.robotId = robotId;
    }

    const maps = await StartMappingData.find(query);

    if (maps.length === 0) {
      console.log("No maps found for userId:", userId, "and robotId:", robotId);
      return res.status(404).json({
        success: true,
        message: "No maps available. Please start your mapping first.",
      });
    }

    
    console.log("Maps retrieved:", maps);

     
    const mappedData = maps.map(map => {
      return {
        ...map._doc,
        map_image: `data:image/png;base64,${map.map_image}`  
      };
    });

    return res.status(200).json({
      success: true,
      message: "Maps retrieved successfully.",
      data: mappedData,
    });
  } catch (error) {
    console.error("Error retrieving maps:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving maps.",
      error: error.message,
    });
  }
};
