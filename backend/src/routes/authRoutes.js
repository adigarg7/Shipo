import express from "express";
import { signup, signin , logoutUser } from "../controllers/authController.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logoutUser);
export default router;
