import { Router } from "express";
import { saveMappingData, getMappingData } from "../Controllers/mappost.js"

const router = Router();


router.post("/map-mappings/save", saveMappingData);


router.get("/get-map-mapping-data", getMappingData);

export default router;