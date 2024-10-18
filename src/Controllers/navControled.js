import History from "../Models/History.js"

const getRobots = async (req, res) => {
  try {
    const robots = await History.find();  
    res.status(200).json(message ,robots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createRobot = async (req, res) => {
  const { robotName, mapName, image, timeTaken, percentCompleted, status, linear_velocity, angular_velocity, position, orientation } = req.body;
  if (!robotName || !mapName || !image || !timeTaken || !percentCompleted || !status || !linear_velocity || !angular_velocity || !position || !orientation) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newHistory = new History({
    robotName,
    mapName,
    image,
    timeTaken,
    percentCompleted,
    status,
    linear_velocity,
    angular_velocity,
    position,
    orientation,
  });
  

  try {
    const savedHistory = await newHistory.save();
    res.status(201).json(savedHistory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { getRobots, createRobot };