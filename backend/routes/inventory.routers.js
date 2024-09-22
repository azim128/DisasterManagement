import express from "express";
import { getAllInventory } from "../controllers/inventory.controller.js";

const router = express.Router();

router.get("/", getAllInventory);

export default router;
