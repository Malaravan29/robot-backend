import { Router } from "express";
import { saveMappingData } from "../Controllers/singleMap.js"

const router = Router();
router.post("/start-mapping", saveMappingData);

export default router;