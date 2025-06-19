import express from 'express';
import studentRouter from './routes/studentRoutes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not set");
}

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Adjust this to your frontend URL
}));

// Import routes
app.use('/api/students', studentRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, async () => {
  mongoose.connect( process.env.MONGO_URI);
  console.log(`Server is running on http://localhost:${PORT}`);
});