import express from "express";
import { getUserProfile } from "../controllers/user.controller.js";
import {
  authenticateToken,
  checkIsActive,
} from "../middleware/authenticate.middleware.js";

const router = express.Router();

router.get(
  "/get-profile/:id",
  authenticateToken,
  checkIsActive,
  getUserProfile
);

export default router;
