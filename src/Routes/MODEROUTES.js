import { Router } from "express";
import { saveModeMappingData ,getModeMappingData,getModeMappingDataByRobotId} from "../Controllers/MODEAPI.js"
const router = Router();

router.post("/mode-mappings/start",saveModeMappingData) //3 mode in one api
router.get("/get-mode-mapping", getModeMappingData);
router.get("/get-mode-list-maps",getModeMappingDataByRobotId)
export default router;