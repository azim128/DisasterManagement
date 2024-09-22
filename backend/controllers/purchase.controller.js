import prisma from "../lib/prisma.js";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responses.utils.js";

import ExcelJS from "exceljs";
import { Parser as Json2CsvParser } from "json2csv";


const getExpenseTotalsLastNDays = async (req, res, next) => {
    try {
      const { days } = req.query;
  
      if (!days) {
        return sendErrorResponse(res, 400, "Days parameter is required");
      }
  
      const daysAgo = parseInt(days);
      if (isNaN(daysAgo) || daysAgo <= 0) {
        return sendErrorResponse(res, 400, "Days parameter must be a positive integer");
      }
  
      const startDateValue = new Date();
      startDateValue.setDate(startDateValue.getDate() - (daysAgo - 1));
      startDateValue.setHours(0, 0, 0, 0);
  
      const endDateValue = new Date();
      endDateValue.setHours(23, 59, 59, 999);
  
      // Fetch purchases along with the related InventoryItem (item)
      const purchases = await prisma.purchase.findMany({
        where: {
          createdAt: {
            gte: startDateValue,
            lte: endDateValue,
          },
        },
        include: {
          item: true, // Ensure the related item is fetched
        },
      });
  
      const expenseTotalsByDate = {};
  
      purchases.forEach((purchase) => {
        if (!purchase.item) {
          return; // Skip the purchase if the related item is missing
        }
  
        const date = purchase.createdAt.toISOString().split("T")[0];
        if (!expenseTotalsByDate[date]) {
          expenseTotalsByDate[date] = 0;
        }
  
        // Add the total expense for this purchase
        expenseTotalsByDate[date] += purchase.quantity * purchase.item.price;
      });
  
      const data = [];
      for (let i = 0; i < daysAgo; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split("T")[0];
        data.push({
          total: expenseTotalsByDate[dateString] || 0,
          date: dateString,
        });
      }
  
      sendSuccessResponse(res, 200, {
        message: `Expense totals for the last ${days} days fetched successfully`,
        data,
      });
    } catch (error) {
      next(error);
    }
  };
  

  const generateExpenseReport = async (req, res, next) => {
    try {
      const { format, days } = req.query;
  
      if (!format || !["csv", "excel"].includes(format)) {
        return res.status(400).json({
          success: false,
          message: "Invalid format. Please specify 'csv' or 'excel' as format.",
        });
      }
  
      const daysAgo = parseInt(days);
      if (isNaN(daysAgo) || daysAgo <= 0) {
        return res.status(400).json({
          success: false,
          message: "Days parameter must be a positive integer.",
        });
      }
  
      const startDateValue = new Date();
      startDateValue.setDate(startDateValue.getDate() - (daysAgo - 1));
      startDateValue.setHours(0, 0, 0, 0);
  
      const endDateValue = new Date();
      endDateValue.setHours(23, 59, 59, 999);
  
      const purchases = await prisma.purchase.findMany({
        where: {
          createdAt: {
            gte: startDateValue,
            lte: endDateValue,
          },
        },
        include: {
          item: {
            select: {
              name: true,
              price: true,
            },
          },
        },
      });
  
      const reportData = purchases.map((purchase) => ({
        PurchaseID: purchase.id,
        ItemName: purchase.item.name,
        Quantity: purchase.quantity,
        Amount: purchase.quantity * purchase.item.price,
        Date: purchase.createdAt.toISOString().split("T")[0],
      }));
  
      if (format === "csv") {
        const csvParser = new Json2CsvParser();
        const csvData = csvParser.parse(reportData);
        res.header("Content-Type", "text/csv");
        res.attachment(`expense_report_${days}days.csv`);
        return res.send(csvData);
      } else if (format === "excel") {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Expenses");
  
        worksheet.columns = [
          { header: "Purchase ID", key: "PurchaseID", width: 15 },
          { header: "Item Name", key: "ItemName", width: 20 },
          { header: "Quantity", key: "Quantity", width: 10 },
          { header: "Amount", key: "Amount", width: 10 },
          { header: "Date", key: "Date", width: 15 },
        ];
  
        worksheet.addRows(reportData);
  
        res.header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.attachment(`expense_report_${days}days.xlsx`);
  
        return workbook.xlsx.write(res).then(() => res.end());
      }
    } catch (error) {
      next(error);
    }
  };

  
  const getTotalExpenses = async (req, res, next) => {
    try {
      const totalExpenses = await prisma.purchase.aggregate({
        _sum: {
          quantity: true,
        },
      });
  
      sendSuccessResponse(res, 200, {
        message: "Total expenses fetched successfully",
        totalExpenses,
      });
    } catch (error) {
      next(error);
    }
  };

  
  export { getExpenseTotalsLastNDays, generateExpenseReport, getTotalExpenses };