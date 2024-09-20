import prisma from "../lib/prisma.js";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responses.utils.js";

const createDonation = async (req, res, next) => {
  try {
    const { amount, donar_name, donar_email } = req.body;

    if (!amount || !donar_email) {
      sendErrorResponse(res, 400, "Amount and donar email are required");
    }

    const donation = await prisma.donation.create({
      data: {
        amount: parseFloat(amount),
        donar_name,
        donar_email,
      },
    });

    sendSuccessResponse(res, 201, {
      message: "Donation done successfully",
      donation,
    });
  } catch (error) {
    next(error);
  }
};

export { createDonation };
