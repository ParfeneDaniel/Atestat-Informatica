import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectToMongoDB } from "./db/config.js";
import authRouter from "./routes/auth.router.js";
import taskRouter from "./routes/task.router.js";

const PORT = process.env.PORT;

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log("Server is running");
});
