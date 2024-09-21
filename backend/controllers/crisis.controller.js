import prisma from "../lib/prisma.js";
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

    // Validate the severity to be one of the enum values
    const severityEnum = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
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

    // Validate the status to be one of the enum values
    const statusEnum = [
      "PENDING",
      "APPROVED",
      "REJECTED",
      "ASSIGNED",
      "RESOLVED",
    ];
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
        approvedBy: true, // Optional: include the approvedBy user details
        assignedTo: true, // Optional: include the assignedTo user details
      },
    });

    const totalCrisisEntries = await prisma.crisisEntry.count({
      where: whereClause,
    });

    sendSuccessResponse(res, 200, {
      message: "Crisis entries fetched successfully",
      data: {
        crisisEntries,
        totalCrisisEntries,
        totalPages: Math.ceil(totalCrisisEntries / limit),
        currentPage: parseInt(page),
      },
    });
  } catch (error) {
    next(error);
  }
};

export { addCrisis, getAllCrisis };
