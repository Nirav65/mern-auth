import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.log(err);
})

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})