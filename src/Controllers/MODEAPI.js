import StartMappingData from "../Models/MODE-AUTOMATIC-MAPPING.js";
import History from "../Models/MODE-MANUAL-MAPPING.js";
import AutomatedDisinfectantData from "../Models/MODE-DISINFECTION-MAPPING.js";


const convertBase64ToBuffer = (base64String) => Buffer.from(base64String, "base64");


const validateRequestBody = (body, requiredFields) => 
  requiredFields.every(field => body[field] !== undefined && body[field] !== null);


const createMappingData = (mode, data, userId) => {
  const models = {
    automatic: StartMappingData,
    manual: History,
    AutomatedDisinfectant: AutomatedDisinfectantData,
  };
  
  if (!models[mode]) throw new Error("Invalid mode.");
  
  return new models[mode]({ ...data, userId });
};


export const saveModeMappingData = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
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
      object_image_name,
      object_feedback,
    } = req.body;

    // Check for valid mode
    if (!["automatic", "manual", "AutomatedDisinfectant"].includes(mode)) {
      return res.status(400).json({ success: false, message: "Invalid or missing mode." });
    }

    // Convert the map image from Base64 to Buffer
    const imageBase64 = convertBase64ToBuffer(map_image);

    // Define required fields based on mode
    const modeFields = {
      automatic: ["feedback", "linear_velocity", "angular_velocity", "current_position", "current_orientation", "completion_command", "map_name", "timeTaken", "status", "percentageCompleted"],
      manual: ["map_name", "timeTaken", "percentageCompleted", "status", "linear_velocity", "angular_velocity", "position", "orientation"],
      AutomatedDisinfectant: ["feedback", "position", "orientation", "object_image_name", "object_feedback"],
    };

    // Validate required fields for the specific mode
    if (!validateRequestBody(req.body, modeFields[mode])) {
      return res.status(400).json({ success: false, message: `Missing required fields for ${mode} mode. `});
    }

    // Prepare data for saving
    const data = {
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
      position,
      orientation,
      object_image_name,
      object_feedback,
    };

    // Create and save the new mapping data
    const newMappingData = createMappingData(mode, data, userId);
    await newMappingData.save();

    return res.status(201).json({ success: true, message: `${mode.charAt(0).toUpperCase() + mode.slice(1)} data saved successfully.`, data: newMappingData });

  } catch (error) {
    console.error("Error saving mapping data:", error);
    return res.status(500).json({ success: false, message: "An error occurred while saving mapping data.", error: error.message });
  }
};


export const getModeMappingData = async (req, res) => {
  try {
    const { mode } = req.query;
    const userId = req.user.id;

    
    if (!["automatic", "manual", "AutomatedDisinfectant"].includes(mode)) {
      return res.status(400).json({ success: false, message: "Invalid mode." });
    }

    
    const modelMap = {
      automatic: StartMappingData,
      manual: History,
      AutomatedDisinfectant: AutomatedDisinfectantData,
    };

    const data = await modelMap[mode].find({ userId });

    
    if (data.length === 0) {
      return res.status(200).json({
        success: true,
        message: `No mapping data found for mode: ${mode}. Please start mapping.`,
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: `Data retrieved successfully for mode: ${mode}.`,
      data: data.map(entry => ({
        ...entry._doc,
        map_image:`data:image/png;base64,${entry.map_image}`,
      })),
    });
  } catch (error) {
    console.error("Error retrieving mapping data:", error);
    return res.status(500).json({ success: false, message: "An error occurred while retrieving mapping data.", error: error.message });
  }
};