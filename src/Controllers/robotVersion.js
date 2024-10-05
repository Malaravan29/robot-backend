import RobotVersion from "../Models/RobotVersion.js";


// Controller for fetching robot details by emailId
export const getRobotDetailsByEmailId = async (req, res) => {
    const { emailId } = req.params;
  
    try {
      // Find the robot entry by emailId
      const robot = await RobotVersion.findOne({ emailId });
  
      if (!robot) {
        return res.status(404).json({ message: 'Robot details not found for the provided email ID' });
      }
  
      res.status(200).json(robot); // Return robot details if found
    } catch (error) {
      res.status(500).json({ error: 'Error fetching robot details', details: error.message });
    }
  };
