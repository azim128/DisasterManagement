import prisma from "../lib/prisma.js";
import { extractTokenFromHeader, verifyToken } from "../utils/jwt.utils.js";
import { sendErrorResponse } from "../utils/responses.utils.js";

const checkIsActive = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = Number(id);
    const user = await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
    });

    // check user find or not
    if (!user) {
      return sendErrorResponse(res, 404, "User not found");
    }

    if (user.status === "PENDING" || user.status === "DISABLED") {
      return sendErrorResponse(
        res,
        403,
        "Your account is not active. Please contact the admin"
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

const checkIsAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
    });


    console.log("user", user);

    // check role": "ADMIN"

    if (user.role !== "ADMIN" && user.status === "ACTIVE") {
      return sendErrorResponse(
        res,
        403,
        "You are not authorized to perform this action"
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

const authenticateToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return sendErrorResponse(res, 400, "Invalid token");
    }

    const token = req.headers.authorization;
    const extractedToken = extractTokenFromHeader(token);

    if (!extractedToken) {
      return sendErrorResponse(res, 400, "Invalid token format");
    }

    const decoded = verifyToken(extractedToken);
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    return sendErrorResponse(res, 401, "Unauthorized");
  }
};

export { authenticateToken, checkIsActive, checkIsAdmin };
