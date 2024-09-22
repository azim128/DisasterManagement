import express from "express";
import { PORT } from "./config/variable.config.js";
import prisma from "./lib/prisma.js";
import { adminRouters, authRouters, crisisRouters, donationRouters, inventroyRouters, userRouters, volunteerRouters } from "./routes/index.js";
import cors from "cors";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "./utils/responses.utils.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors setup
app.use(cors());

// Routes
app.use("/api/v1/user", userRouters);
app.use("/api/v1/auth", authRouters);
app.use("/api/v1/admin", adminRouters);
app.use("/api/v1/donation", donationRouters);
app.use("/api/v1/crisis", crisisRouters);
app.use("/api/v1/inventory", inventroyRouters);
app.use("/api/v1/volunteer", volunteerRouters);

app.get("/", (req, res) => {
  sendSuccessResponse(res, 200, { message: "Hello, world!" });
});

// Get all users
app.get("/users", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    sendSuccessResponse(res, 200, users);
  } catch (error) {
    next(error);
  }
});

// health check
app.get("/health", (req, res) => {
  sendSuccessResponse(res, 200, { message: "Server is running" });
});

// Not found error handler
app.use((req, res, next) => {
  sendErrorResponse(res, 404, "Resource not found");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  sendErrorResponse(res, 500, "An error occurred", err.message);
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
