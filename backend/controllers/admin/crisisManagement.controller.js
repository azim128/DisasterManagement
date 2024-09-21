import { CrisisStatus } from "@prisma/client";
import prisma from "../../lib/prisma.js";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/responses.utils.js";

const updateCrisisStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const adminId = req.user.id;

    // Validate the status
    if (!Object.values(CrisisStatus).includes(status)) {
      return sendErrorResponse(res, 400, "Invalid status value");
    }

    // Update the crisis entry
    const updatedCrisis = await prisma.crisisEntry.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status,
        approvedById: adminId,
      },
    });

    sendSuccessResponse(res, 200, {
      message: "Crisis status updated successfully",
      data: updatedCrisis,
    });
  } catch (error) {
    console.error("Error updating crisis status:", error);
    next(error);
  }
};
const assignCrisisToVolunteer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { volunteerId, taskDetails } = req.body;
    const adminId = req.user.id;

    // validate the volunteer id and task details
    if (!volunteerId || !taskDetails) {
      sendErrorResponse(res, 400, "Volunteer ID and task details are required");
    }

    // Check if the crisis exists and is approved
    const crisis = await prisma.crisisEntry.findUnique({
      where: { id: parseInt(id) },
    });

    if (!crisis) {
      return sendErrorResponse(res, 404, "Crisis not found");
    }

    if (crisis.status !== CrisisStatus.APPROVED) {
      return sendErrorResponse(
        res,
        400,
        "Crisis must be approved before assignment"
      );
    }

    // Check if the volunteer exists and is active
    const volunteer = await prisma.user.findUnique({
      where: {
        user_id: parseInt(volunteerId),
        role: "VOLUNTEER",
        status: "ACTIVE",
      },
    });

    if (!volunteer) {
      return sendErrorResponse(res, 404, "Active volunteer not found");
    }

    // Update the crisis entry and create a new task
    const [updatedCrisis, newTask] = await prisma.$transaction([
      prisma.crisisEntry.update({
        where: { id: parseInt(id) },
        data: {
          status: CrisisStatus.ASSIGNED,
          assignedToId: volunteer.user_id,
        },
      }),
      prisma.task.create({
        data: {
          title: `Crisis Task: ${crisis.title}`,
          details: taskDetails || `Handle crisis: ${crisis.description}`,
          user_id: volunteer.user_id,
        },
      }),
    ]);

    sendSuccessResponse(res, 200, {
      message: "Crisis assigned to volunteer and task created successfully",
      data: { updatedCrisis, newTask },
    });
  } catch (error) {
    console.error("Error assigning crisis to volunteer:", error);
    next(error);
  }
};

export { assignCrisisToVolunteer, updateCrisisStatus };
