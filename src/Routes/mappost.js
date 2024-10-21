import { Router } from "express";
import { saveMappingData, getMappingData ,deleteMappingData} from "../Controllers/mappost.js"

const router = Router();


router.post("/map-mappings/save", saveMappingData);


router.get("/get-map-data", getMappingData);

router.delete("/delete-map-data",deleteMappingData)

export default router;

