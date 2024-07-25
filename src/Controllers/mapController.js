import MapData from "../Models/Mapping.js";
 

export const startMapping = async (req, res) => {
  try {
    const { userId } = req.body;

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

    if (
      !userId ||
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
        message: "All required fields must be provided.",
      });
    }

    const mapData = new MapData({
      userId,

      mode,

      feedback,
      linear_velocity,
      angular_velocity,
      current_position,
      current_orientation,
      map_image,
      completion_command,
      map_name,

      status,
      percentageCompleted,
    });

    await mapData.save();

    

    return res.status(201).json({
      success: true,
      message: "Mapping data saved successfully.",
      mapId: mapData._id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while saving mapping data.",
      error: error.message,
    });
  }
};

 
export const getMappingData = async (req, res) => {
  try {
    const { robotId } = req.params;

    // Find map data by robotId
    const mapData = await MapData.findOne({ robotId });

    if (!mapData) {
      return res.status(404).json({ message: "Map data not found for the given robot ID" });
    }

    return res.json(mapData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};