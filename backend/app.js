import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB(); // Connect to MongoDB

app.use('/api', authRoutes);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server running on port ${port}`));
