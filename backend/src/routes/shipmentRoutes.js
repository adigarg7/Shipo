import express from "express";
import { createShipment, getShipments, updateShipment, deleteShipment } from "../controllers/shipmentController.js";
import auth from "../Middleware/authMiddleware.js";

const router = express.Router();
router.post("/create", auth, createShipment);
router.get("/read", auth, getShipments);
router.put("/update/:id", auth, updateShipment);
router.delete("/delete/:id", auth, deleteShipment);

export default router; 