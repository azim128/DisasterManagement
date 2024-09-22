import prisma from "../lib/prisma.js";
import { sendSuccessResponse } from "../utils/responses.utils.js";

const getAllInventory = async (req, res, next) => {
  try {
    // Extract query parameters
    const { page = 1, pageSize = 10, sort = 'asc', category } = req.query;

    // Convert page and pageSize to integers
    const pageInt = parseInt(page);
    const pageSizeInt = parseInt(pageSize);

    // Define filters and sorting
    const filters = {};
    if (category) {
      filters.category = category;
    }

    // Fetch inventory with pagination, filtering, and sorting
    const inventory = await prisma.inventoryItem.findMany({
      where: filters, // Apply category filtering if present
      orderBy: {
        price: sort, // Sort by price (asc or desc)
      },
      skip: (pageInt - 1) * pageSizeInt, // Skip records for pagination
      take: pageSizeInt, // Limit the number of records returned
    });

    // Get total count of records for pagination
    const totalItems = await prisma.inventoryItem.count({
      where: filters,
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / pageSizeInt);

    sendSuccessResponse(res, 200, {
      message: "All Inventory",
      data: inventory,
      pagination: {
        currentPage: pageInt,
        pageSize: pageSizeInt,
        totalItems,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Detailed error:", error);
    next(error);
  }
};

export { getAllInventory };
