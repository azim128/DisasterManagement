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


const updateUserProfile = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);

    // Create an empty data object and add fields conditionally
    const data = {};
    if (req.body.name) data.name = req.body.name;
    if (req.body.phone_number) data.phone_number = req.body.phone_number;

    // If no fields are provided, return an error
    if (Object.keys(data).length === 0) {
      return res.status(400).json({ message: "No fields provided to update." });
    }

    const user = await prisma.user.update({
      where: {
        user_id: userId,
      },
      data,  
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
      message: "User profile updated successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};


export { getUserProfile,updateUserProfile };
