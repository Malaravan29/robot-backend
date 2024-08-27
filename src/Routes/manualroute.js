import express from 'express';

import { ManualRobot,ManualgetRobots } from '../Controllers/manualcontroller.js';

const router = express.Router();

router.get('/get-manual', ManualgetRobots);
router.post('/manual', ManualRobot);
 

export default router;