// controller for updating user details and user role setup ACTIVE or DISABLED
import prisma from "../../lib/prisma.js";
import { sendSuccessResponse } from "../../utils/responses.utils.js";

const getAllUsers = async (req, res, next) => {
    try {
      const { name, role, status, page = 1, limit = 10 } = req.query;
  
      
      const take = parseInt(limit);
      const pageNumber = parseInt(page);
      const skipRecords = (pageNumber - 1) * take;
  
      // Building the query object
      const queryOptions = {
        select: {
          user_id: true,
          name: true,
          email: true,
          phone_number: true,
          role: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
        where: {},
        skip: skipRecords,
        take,
      };
  
      // If name query parameter is provided, use it for filtering
      if (name) {
        queryOptions.where.name = {
          contains: name,
          mode: "insensitive", // Case-insensitive search
        };
      }
  
      // If role query parameter is provided, use it for filtering
      if (role) {
        queryOptions.where.role = role;
      }
  
      // If status query parameter is provided, use it for filtering
      if (status) {
        queryOptions.where.status = status;
      }
  
      // Fetch users based on query options
      const users = await prisma.user.findMany(queryOptions);
  
      // Count total records for pagination
      const totalUsers = await prisma.user.count({ where: queryOptions.where });
  
      sendSuccessResponse(res, 200, {
        message: "All users",
        users,
        pagination: {
          totalUsers,
          currentPage: pageNumber,
          totalPages: Math.ceil(totalUsers / take),
          limit: take,
        },
      });
    } catch (error) {
      next(error);
    }
  };



const updateUserStatus = async (req, res, next) => {
  const userId = Number(req.params.id);
  const { status } = req.body;

  try {
    const fetchUser = await prisma.user.update({
      where: {
        user_id: userId,
      },
      data: {
        status,
      },
      select: {
        user_id: true,
        name: true,
        email: true,
        phone_number: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // if user is not found
    if (!fetchUser) {
      return sendSuccessResponse(res, 404, { message: "User not found" });
    }

    // after activate if user not in volunteer table add user to volunteer table

    if (status === "ACTIVE") {
      const checkUser = await prisma.volunteer.findUnique({
        where: {
          user_id: userId,
        },
      });

      if (!checkUser) {
        await prisma.volunteer.create({
          data: {
            user_id: userId,
          },
        });
      }
    }

    sendSuccessResponse(res, 200, {
      message: "User updated successfully",
      user: fetchUser,
    });
  } catch (error) {
    next(error);
  }
};

export { getAllUsers, updateUserStatus };
