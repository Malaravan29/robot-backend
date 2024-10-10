import Version from '../Models/Version.js';
import User from '../Models/User.js';

// Controller to get version and user details based on email
export const getVersionAndUserByEmail = async (req, res) => {
 
  try {
    const email = req.user.email;

    // Get the latest app version
    const latestVersion = await Version.findOne().sort({ createdAt: -1 }); // Assuming you want the latest version

    // Find the user by email
    const user = await User.findOne({ email }, 'email manualMapping objectDisinfection'); // Fetch only the required fields

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Construct the response data
    const responseData = {
      version: latestVersion ? latestVersion.version : null,
      user: {
        email: user.email,
        manualMapping: user.manualMapping,
        objectDisinfection: user.objectDisinfection
      }
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error fetching version and user details:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
