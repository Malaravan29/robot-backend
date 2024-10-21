import noMode from "../Models/mappost.js";


const convertBase64ToBuffer = (base64String) => {
  if (!base64String) {
    throw new Error("Base64 string is required to convert to Buffer.");
  }
  return Buffer.from(base64String, "base64");
};


export const saveMappingData = async (req, res) => {
  try {
    const userId = req.user.id; 
    const {
      emailId,
      robotId,
      map_image,
      map_name,
    } = req.body;

    
    if (!emailId || !robotId || !map_image || !map_name) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: emailId, robotId, map_image, map_name."
      });
    }

    let imageBase64;
    try {
      imageBase64 = convertBase64ToBuffer(map_image);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid map_image format.",
        error: error.message
      });
    }

  
    const newMappingData = new noMode({
      userId,
      emailId,
      robotId,
      map_image: imageBase64,
      map_name,
    });

  
    await newMappingData.save();

    return res.status(201).json({
      success: true,
      message: "Mapping data saved successfully.",
      data: newMappingData,
    });
  } catch (error) {
    console.error("Error saving mapping data:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while saving mapping data.",
      error: error.message,
    });
  }
};

export const getMappingData = async (req, res) => {
  const userId = req.user.id; 
  const { robotId } = req.query;

  
  if (!robotId) {
    return res.status(400).json({
      success: false,
      message: "robotId is required to retrieve mapping data.",
    });
  }

  try {
 
    const data = await noMode.find({ userId, robotId });

    // Check if any data is found
    if (data.length === 0) {
      return res.status(200).json({
        success: true,
        message: `No mapping data found for robotId: ${robotId}. Please start mapping.`,
        data: [],
      });
    }

    
    const mappedData = data.map((entry) => ({
      ...entry._doc,
      map_image: `data:image/png;base64,${entry.map_image.toString('base64')}`,
    }));

    
    return res.status(200).json({
      success: true,
      message: `Data retrieved successfully for robotId: ${robotId}.`,
      data: mappedData,
    });
  } catch (error) {
  
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving mapping data.",
      error: error.message,
    });
  }
};