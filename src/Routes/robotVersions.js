import { Router } from 'express';
import { getRobotDetailsByEmailId } from "../Controllers/robotVersion.js";
import { verifyToken } from '../Middleware/authMiddleware.js'; 

const router = Router();


// Route to get all robot details (GET request)
router.get('/metadata', verifyToken, getRobotDetailsByEmailId);



export default router;
