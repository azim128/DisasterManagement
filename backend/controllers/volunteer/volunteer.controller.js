import prisma from "../../lib/prisma.js";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/responses.utils.js";

const purchaseInventoryItem = async (req, res) => {
  const { itemId, quantity } = req.body;
  const userId = req.user.id; // Changed from id to user_id

  console.log("userId", userId);

  if (!itemId || !quantity) {
    return sendErrorResponse(res, 400, "Item ID and quantity are required");
  }

  try {
    // Start a transaction
    const result = await prisma.$transaction(async (prisma) => {
      // Get the inventory item
      const item = await prisma.inventoryItem.findUnique({
        where: { id: itemId },
      });

      if (!item) {
        throw new Error("Item not found");
      }

      if (item.quantity < quantity) {
        throw new Error("Insufficient quantity available");
      }

      // Create the purchase record
      const purchase = await prisma.purchase.create({
        data: {
          itemId,
          quantity,
          userId,
        },
      });

      // Update the inventory item quantity
      const updatedItem = await prisma.inventoryItem.update({
        where: { id: itemId },
        data: { quantity: item.quantity - quantity },
      });

      return { purchase, updatedItem };
    });

    sendSuccessResponse(res, 201, {
      message: "Purchase successful",
      purchase: result.purchase,
      updatedItem: result.updatedItem,
    });
  } catch (error) {
    console.error("Error in purchaseInventoryItem:", error);
    sendErrorResponse(res, 500, error.message);
  }
};

const getAllPurchaseHistory = async (req, res) => {
  const userId = req.user.id; // Changed from id to user_id
//   console.log("userId", userId);

  try {
    const purchaseHistory = await prisma.purchase.findMany({
      where: {
        userId,
      },
      include: {
        item: {
          select: {
            name: true,
            price: true,
            category: true,
          },
        },
      },
    });

    sendSuccessResponse(res, 200, {
      message: "Purchase history retrieved successfully",
      data: purchaseHistory,
    });
  } catch (error) {
    console.error("Error in getAllPurchaseHistory:", error);
    sendErrorResponse(res, 500, error.message);
  }
};

export { getAllPurchaseHistory, purchaseInventoryItem };
