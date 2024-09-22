import express from "express";
import { generateExpenseReport, getExpenseTotalsLastNDays, getTotalExpenses } from "../controllers/purchase.controller.js";


const router = express.Router();

router.get("/last-n-days", getExpenseTotalsLastNDays);
router.get("/total-expenses", getTotalExpenses);
router.get("/report", generateExpenseReport);


export default router;