import express from 'express';
import studentRouter from './routes/studentRoutes.js';
import mongoose from 'mongoose';
const app = express();
import cors from 'cors';
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to your frontend URL
}));

// Import routes
app.use('/api/students', studentRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, async () => {
  mongoose.connect('mongodb://localhost:27017/tle');
  console.log(`Server is running on http://localhost:${PORT}`);
});