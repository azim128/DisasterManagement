import prisma from "../lib/prisma.js";
import { sendSuccessResponse } from "../utils/responses.utils.js";

const getUserProfile = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);

    const user = await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        user_id: true,
        name: true,
        email: true,
        phone_number: true,
        role: true,
        status: true,
      },
    });

    sendSuccessResponse(res, 200, {
      message: "User profile retrieved successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export { getUserProfile };
