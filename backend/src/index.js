import express from 'express';
import 'dotenv/config';
import cors from "cors";
import connectDB from './config/database.js';
import cookieParser from "cookie-parser";
// Connect to MongoDB
connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:4004",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
