import express from "express";
import {
  getAllPurchaseHistory,
  purchaseInventoryItem,
} from "../controllers/volunteer/volunteer.controller.js";
import {
  authenticateToken,
  volunteerIsActive,
} from "../middleware/authenticate.middleware.js";

const router = express.Router();

router.post(
  "/inventory/purchase",
  authenticateToken,
  volunteerIsActive,
  purchaseInventoryItem
);
router.get(
  "/inventory/purchase",
  authenticateToken,
  volunteerIsActive,
  getAllPurchaseHistory
);

export default router;
