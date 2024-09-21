import express from "express";
import {
  addCrisis,
  getAllCrisis,
  getCrisisById,
} from "../controllers/crisis.controller.js";

const routers = express.Router();

routers.post("/create", addCrisis);

routers.get("/", getAllCrisis);
routers.get("/:id", getCrisisById);

export default routers;
