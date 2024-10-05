import User from '../Models/User.js';

export const getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Send user details 
    const userDetails = {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      organizationName: user.organizationName,
      otp: user.otp,
      forgotPasswordOtp: user.forgotPasswordOtp,
      isFirstTime: user.isFirstTime,
      isOtpVerified: user.isOtpVerified,
      primaryContact: user.primaryContact,
      locations: user.locations,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
    res.json(userDetails);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user's phone number
export const updateUserPhoneNumber = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from the authenticated user
    const { phoneNumber } = req.body; // Extract new phone number from request body

    // Validate the phone number
    if (!phoneNumber || phoneNumber.length < 10) {
      return res.status(400).json({ message: "Please provide a valid phone number" });
    }

    // Update user's phone number
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { phoneNumber },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Phone number updated successfully", phoneNumber: updatedUser.phoneNumber });
  } catch (error) {
    console.error('Error updating phone number:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



