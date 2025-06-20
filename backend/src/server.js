import express from 'express';
import studentRouter from './routes/studentRoutes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Settings from './models/settings.js';
import settingsRouter from './routes/settingsRoutes.js';

dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGODB_URI environment variable is not set");
}
mongoose.connect( process.env.MONGO_URI);
const PORT = process.env.PORT || 3000;
const app = express();

// create a settings collection if it doesn't exist
try {
  const settingsExists = await Settings.findOne();
  if (!settingsExists) {
    await Settings.create({
      cronExpression: '0 0 * * *', // Default cron expression to run daily at midnight
    });
    console.log("Settings collection created with default values.");
  }
  else {
    console.log("Settings collection already exists.");
  }
} catch (error) {
  console.error("Error creating settings collection:", error);
}

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Adjust this to your frontend URL
}));

// Import routes
app.use('/api/students', studentRouter);
app.use('/api/settings', settingsRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});