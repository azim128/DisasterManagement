import express from "express";
import { createDonation } from "../controllers/donation.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello, world!");
});

router.post("/create", createDonation);

export default router;
