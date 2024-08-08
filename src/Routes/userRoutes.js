import { Router } from 'express';
import { getUserDetails, updateUserPhoneNumber } from '../Controllers/userControllers.js';
import { verifyToken } from '../Middleware/authMiddleware.js';

const router = Router();

// Route to get user details
router.get('/user/details', verifyToken, getUserDetails);

// Route to update user phone number
router.put('/user/phone', verifyToken, updateUserPhoneNumber);

export default router;
