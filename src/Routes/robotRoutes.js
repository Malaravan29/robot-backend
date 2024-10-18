// routes/robotRoutes.js

import { Router } from 'express';
import { getRobotDetails , getRobotsByEmail} from '../Controllers/robotController.js';
import { startMapping, saveMappingData,getListMaps} from "../Controllers/mapController.js"

const router = Router();

router.get('/robot/:robotId',getRobotDetails);
router.get('/robots',  getRobotsByEmail);

//mapping api 
router.post("/start-mapping", startMapping);

router.post("/save-robot-data", saveMappingData);
router.post("/save-mapping-data", saveMappingData);

router.get("/get-list-maps", getListMaps);

export default router;
