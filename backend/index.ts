import express, { Request } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import connectDb from "./src/config/connect";

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL || "";

app.use(cors());
app.use(express.json());

connectDb(MONGO_URL);

const server = app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
