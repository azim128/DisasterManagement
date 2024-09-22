import express from "express";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";
import {
  authenticateToken,
  checkIsActive,
} from "../middleware/authenticate.middleware.js";

const router = express.Router();

router.get(
  "/get-profile/:id",
  authenticateToken,
  getUserProfile
);

router.put(
  "/update-profile/:id",
  authenticateToken,
  checkIsActive,
  updateUserProfile
);

export default router;
