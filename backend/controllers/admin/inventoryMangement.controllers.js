import prisma from "../../lib/prisma.js";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/responses.utils.js";

const createInventoryItem = async (req, res, next) => {
  try {
    const { name, description, quantity, price, category } = req.body;

    // validate the input
    if (!name || !description || !quantity || !price || !category) {
      return sendErrorResponse(res, 400, "All fields are required");
    }

    // Create the inventory item
    const inventoryItem = await prisma.inventoryItem.create({
      data: {
        name,
        description,
        quantity,
        price,
        category,
      },
    });

    sendSuccessResponse(res, 201, {
      message: "Inventory item created successfully",
      data: inventoryItem,
    });
  } catch (error) {
    console.error("Error creating inventory item:", error);
    next(error);
  }
};

const updateInventoryItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, quantity, price, category } = req.body;

    // Update the inventory item
    const updatedInventoryItem = await prisma.inventoryItem.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        description,
        quantity,
        price,
        category,
      },
    });

    sendSuccessResponse(res, 200, {
      message: "Inventory item updated successfully",
      data: updatedInventoryItem,
    });
  } catch (error) {
    console.error("Error updating inventory item:", error);
    next(error);
  }
};

const deleteInventoryItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Delete the inventory item
    await prisma.inventoryItem.delete({
      where: {
        id: parseInt(id),
      },
    });

    sendSuccessResponse(res, 200, {
      message: "Inventory item deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting inventory item:", error);
    next(error);
  }
};

const getInventoryItems = async (req, res, next) => {
  try {
    const inventoryItems = await prisma.inventoryItem.findMany();

    sendSuccessResponse(res, 200, {
      data: inventoryItems,
    });
  } catch (error) {
    console.error("Error fetching inventory items:", error);
    next(error);
  }
};

const getInventoryItemById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const inventoryItem = await prisma.inventoryItem.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!inventoryItem) {
      return sendErrorResponse(res, 404, "Inventory item not found");
    }

    sendSuccessResponse(res, 200, {
      data: inventoryItem,
    });
  } catch (error) {
    console.error("Error fetching inventory item:", error);
    next(error);
  }
};

// 

export {
  createInventoryItem,
  deleteInventoryItem,
  getInventoryItemById,
  getInventoryItems,
  updateInventoryItem,
};
