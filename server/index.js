import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import questionSetRoutes from './routes/questionSetRoutes.js';
import cookieParser from "cookie-parser";


// Load environment variables and create an express app
dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB
connectDB();

// Middleware
app.use(
    cors({
      origin: ["http://localhost:5173"],
      credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
    res.send("🛒 ShopSphere API is running!");
});
app.use("/api/users", authRoutes);
app.use("/api/question-sets", questionSetRoutes);

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));