import prisma from "../lib/prisma.js";
import { severityEnum, statusEnum } from "../utils/enums.js";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responses.utils.js";

const addCrisis = async (req, res, next) => {
  try {
    const { title, description, severity, requiredHelp, imageUrl, location } =
      req.body;

    // Validate the required fields
    if (!title || !description || !severity || !requiredHelp || !location) {
      sendErrorResponse(res, 400, "All fields are required");
    }

    if (!severityEnum.includes(severity)) {
      sendErrorResponse(res, 400, "Invalid severity value");
    }

    // Create the crisis entry in the database
    const crisisEntry = await prisma.crisisEntry.create({
      data: {
        title,
        description,
        severity,
        requiredHelp,
        imageUrl,
        location,
      },
    });

    sendSuccessResponse(res, 201, {
      message:
        "Crisis entry added successfully and management will be notified",
      data: crisisEntry,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCrisis = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    if (status && !statusEnum.includes(status)) {
      sendErrorResponse(res, 400, "Invalid status value");
    }

    // Pagination logic
    const skip = (page - 1) * limit;
    const take = parseInt(limit);

    // Filter by status if provided, otherwise get all
    const whereClause = status ? { status } : {};

    const crisisEntries = await prisma.crisisEntry.findMany({
      where: whereClause,
      skip,
      take,
      include: {
        approvedBy: true,
        assignedTo: true,
      },
    });

    const totalCrisisEntries = await prisma.crisisEntry.count({
      where: whereClause,
    });

    sendSuccessResponse(res, 200, {
      message: "Crisis entries fetched successfully",

      crisisEntries,
      totalCrisisEntries,
      totalPages: Math.ceil(totalCrisisEntries / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    next(error);
  }
};

const getCrisisById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const crisisEntry = await prisma.crisisEntry.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        approvedBy: true,
        assignedTo: true,
      },
    });

    if (!crisisEntry) {
      sendErrorResponse(res, 404, "Crisis entry not found");
    }

    sendSuccessResponse(res, 200, {
      message: "Crisis entry fetched successfully",
      ...crisisEntry,
    });
  } catch (error) {
    next(error);
  }
};

export { addCrisis, getAllCrisis, getCrisisById };
