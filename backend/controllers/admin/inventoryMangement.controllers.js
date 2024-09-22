import prisma from "../../lib/prisma.js";
import { categories } from "../../utils/enums.js";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/responses.utils.js";

const createInventoryItem = async (req, res, next) => {
  try {
    const { name, description, quantity, price, category } = req.body;

    // Validate the input
    if (!name || !description || !quantity || !price || !category) {
      return sendErrorResponse(res, 400, "All fields are required");
    }

    // Check if the category is valid
    if (!categories.includes(category)) {
      return sendErrorResponse(res, 400, "Invalid category");
    }

    // Check if the item name is unique
    const existingItem = await prisma.inventoryItem.findUnique({
      where: { name },
    });

    if (existingItem) {
      return sendErrorResponse(res, 400, "Item name must be unique");
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
    let { name, description, quantity, price, category } = req.body;

    // Check if the category is valid
    if (category && !categories.includes(category)) {
      return sendErrorResponse(res, 400, "Invalid category");
    }

    // Check if the item name is unique
    if (name) {
      const existingItem = await prisma.inventoryItem.findUnique({
        where: { name },
      });

      if (existingItem && existingItem.id !== parseInt(id)) {
        return sendErrorResponse(res, 400, "Item name must be unique");
      }
    }

    // Ensure quantity is a number if provided
    if (quantity) {
      quantity = parseInt(quantity, 10);
      if (isNaN(quantity)) {
        return sendErrorResponse(res, 400, "Quantity must be a valid number");
      }
    }

    // Build the update data
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (quantity !== undefined) updateData.quantity = quantity;
    if (price) updateData.price = price;
    if (category) updateData.category = category;

    // Update the inventory item
    const updatedInventoryItem = await prisma.inventoryItem.update({
      where: { id: parseInt(id) },
      data: updateData,
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



export {
  createInventoryItem,
  deleteInventoryItem,
  getInventoryItemById,
  updateInventoryItem,
};
