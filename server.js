import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/DB/db.js';
import cors from 'cors';

import { verifyToken } from './src/Middleware/authMiddleware.js'; 

import adminRouter from './src/Routes/adminRoutes.js';
import authRoutes from './src/Routes/authRoutes.js';
import robotRoutes from './src/Routes/robotRoutes.js';
import userRoutes from './src/Routes/userRoutes.js';
import history from './src/Routes/history.js';
import robot from './src/Routes/robot.js'
import robotmsgRoutes from "./src/Routes/robotmsgRoutes.js"
import Manual from "./src/Routes/manualroute.js"
import singleMap from "./src/Routes/singleMap.js"
import robotVersions from './src/Routes/robotVersions.js';

import bodyParser from "body-parser";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(verifyToken); // Ensure token verification middleware is used correctly

//Routes
app.use('/',singleMap)

app.use('/', adminRouter);
app.use('/', authRoutes);
app.use('/', robotRoutes);
app.use('/', userRoutes);
app.use('/history', history);
app.use('/', robot);
app.use('/', robotmsgRoutes);
app.use('/', Manual);
app.use('/', robotVersions);





app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
