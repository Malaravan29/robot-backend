import Manual from "../Models/manual.js";

const ManualgetRobots = async (req, res) => {
  try {
    const robots = await Manual.find();
    res.status(200).json(robots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const ManualRobot = async (req, res) => {
  const {
    robotName,
    mapName,
    image,
    timeTaken,
    percentCompleted,
    status,
    linearVelocities,
    angularVelocities,
    positions,
    orientations,
  } = req.body;

  if (
    !robotName ||
    !mapName ||
    !image ||
    !status ||
    !linearVelocities ||
    !angularVelocities ||
    !positions ||
    !orientations
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newHistory = new Manual({
    robotName,
    mapName,
    image,
    timeTaken: timeTaken || 0,
    percentCompleted: percentCompleted || 0,
    status,
    linearVelocities,
    angularVelocities,
    positions,
    orientations,
  });

  try {
    const savedHistory = await newHistory.save();
    res.status(201).json(savedHistory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { ManualgetRobots,ManualRobot };