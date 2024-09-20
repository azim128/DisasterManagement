import express from "express";
import { createDonation, getAllDonations, getDonationTotalsLastNDays } from "../controllers/donation.controller.js";

const router = express.Router();


// query parameter to filter the donations startDate=2024-09-01&endDate=2024-09-20 or startDate=2024-09-01 or page=1&limit=10 

router.get("/", getAllDonations);
router.get('/last-n-days', getDonationTotalsLastNDays);

router.post("/create", createDonation);

export default router;
