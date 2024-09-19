import express from "express";
import { getAllUsers, updateUserStatus } from "../controllers/admin/index.js";
import {
  authenticateToken,
  checkIsAdmin,
} from "../middleware/authenticate.middleware.js";

const router = express.Router();

router.get("/users", authenticateToken, checkIsAdmin, getAllUsers);

router.put("/users/:id", authenticateToken, checkIsAdmin, updateUserStatus);

export default router;
