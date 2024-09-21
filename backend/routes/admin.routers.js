import express from "express";
import {
  assignCrisisToVolunteer,
  createInventoryItem,
  deleteInventoryItem,
  getAllUsers,
  getInventoryItemById,
  getInventoryItems,
  updateCrisisStatus,
  updateInventoryItem,
  updateUserStatus,
} from "../controllers/admin/index.js";
import {
  authenticateToken,
  checkIsAdmin,
} from "../middleware/authenticate.middleware.js";

const router = express.Router();

router.get("/users", authenticateToken, checkIsAdmin, getAllUsers);

router.put("/users/:id", authenticateToken, checkIsAdmin, updateUserStatus);

router.put("/crisis/:id", authenticateToken, checkIsAdmin, updateCrisisStatus);

router.post(
  "/crisis/:id/assign",
  authenticateToken,
  checkIsAdmin,
  assignCrisisToVolunteer
);

router.post("/inventory", authenticateToken, checkIsAdmin, createInventoryItem);
router.put(
  "/inventory/:id",
  authenticateToken,
  checkIsAdmin,
  updateInventoryItem
);
router.delete(
  "/inventory/:id",
  authenticateToken,
  checkIsAdmin,
  deleteInventoryItem
);
router.get("/inventory", authenticateToken, checkIsAdmin, getInventoryItems);
router.get(
  "/inventory/:id",
  authenticateToken,
  checkIsAdmin,
  getInventoryItemById
);

export default router;
