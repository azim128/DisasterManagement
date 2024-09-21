import express from "express";
import { addCrisis, getAllCrisis } from "../controllers/crisis.controller.js";

const routers = express.Router();

routers.post("/create", addCrisis);

routers.get("/", getAllCrisis);


export default routers;
