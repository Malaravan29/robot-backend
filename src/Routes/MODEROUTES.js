import { Router } from "express";
import { saveModeMappingData ,getModeMappingData} from "../Controllers/MODEAPI.js"
const router = Router();
router.post("/mode-mappings/start",saveModeMappingData) //3 mode in one api
router.get("/get-mode-mapping", getModeMappingData);

export default router;