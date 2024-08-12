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



dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(verifyToken); // Ensure token verification middleware is used correctly

//Routes
app.use('/', adminRouter);
app.use('/', authRoutes);
app.use('/', robotRoutes);
app.use('/', userRoutes);
app.use('/history', history);
app.use('/', robot);




app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
