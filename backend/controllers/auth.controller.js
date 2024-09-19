import prisma from "../lib/prisma.js";
import { generateToken } from "../utils/jwt.utils.js";
import { verifyPassword } from "../utils/password.utils.js";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responses.utils.js";

const registerUser = async (req, res, next) => {
  try {
    const { name, password, email, phone_number } = req.body;

    // Basic validation
    if (!name || !password || !email || !phone_number) {
      return sendErrorResponse(res, 400, "Please fill in all fields");
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return sendErrorResponse(res, 400, "User already exists");
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        email,
        phone_number,
      },
    });

    sendSuccessResponse(res, 201, {
      message:
        "User registered successfully and can login after verified by admin",
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return sendErrorResponse(res, 400, "Please fill in all fields");
    }

    // Check if user exists
    const fetchUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!fetchUser) {
      return sendErrorResponse(res, 400, "User does not exist");
    }

    // Verify password
    const isMatch = await verifyPassword(password, fetchUser.password);

    if (!isMatch) {
      return sendErrorResponse(res, 400, "Invalid credentials");
    }

    // check user status PENDING or DISABLED
    if (fetchUser.status === "PENDING" || fetchUser.status === "DISABLED") {
      return sendErrorResponse(
        res,
        403,
        "Your account is not active. Please contact the admin"
      );
    }

    // creat token

    const token = generateToken(fetchUser.user_id);

    sendSuccessResponse(res, 200, {
      message: "Login successful",
      user: {
        user_id: fetchUser.user_id,
        name: fetchUser.name,
        email: fetchUser.email,
        role: fetchUser.role,
        phone_number: fetchUser.phone_number,
        status: fetchUser.status,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export { loginUser, registerUser };
