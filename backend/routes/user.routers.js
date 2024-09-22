import express from "express";
import {
  getAllVolunteers,
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

router.get("/get-volunteers", getAllVolunteers);

export default router;
