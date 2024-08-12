import { Router } from 'express';
import { createRobotmsg} from '../Controllers/robotmsgController.js';
import { verifyToken } from '../Middleware/authMiddleware.js'; // Import your middleware if needed

const router = Router();

// Route to create a new robot message
router.post('/robotmsgs', verifyToken, createRobotmsg); 



export default router;
