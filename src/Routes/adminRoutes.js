import { Router } from 'express';
import {createUser} from "../Controllers/adminController.js"


const adminRouter = Router();

adminRouter.post("/register",createUser)

export default adminRouter