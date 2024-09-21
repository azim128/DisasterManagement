import express from "express";
import {
  assignCrisisToVolunteer,
  getAllUsers,
  updateCrisisStatus,
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

export default router;
