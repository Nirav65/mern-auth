import express from "express";
import { signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/sign-up", signup);

router.get("/sign-in", (req, res) => {
    res.json({
        message: "Sign-in route added."
    })
});

export default router;