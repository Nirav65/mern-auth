import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/authRoute.js';
import errorMiddleware from "./middlewares/errorMiddleware.js";
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.log(err);
})

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})