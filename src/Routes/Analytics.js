import { Router } from 'express';
import{saveRobotAnalytics } from "../Controllers/robotAnalytics.js"

const router = Router();

router.post('/robotanalytics', saveRobotAnalytics);






export default router;
