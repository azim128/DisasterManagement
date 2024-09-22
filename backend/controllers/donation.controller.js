import prisma from "../lib/prisma.js";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responses.utils.js";

import ExcelJS from "exceljs";
import { Parser as Json2CsvParser } from "json2csv";

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

const getAllDonations = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, startDate, endDate } = req.query;

    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);

    // Build filtering conditions
    let dateFilter = {};
    if (startDate || endDate) {
      dateFilter.createdAt = {};
      if (startDate) {
        dateFilter.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        dateFilter.createdAt.lte = new Date(endDate);
      }
    }

    // Fetch donations with filtering and pagination
    const donations = await prisma.donation.findMany({
      where: dateFilter,
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: "desc", // Order by the most recent donations
      },
    });

    // Fetch total count for pagination
    const totalDonations = await prisma.donation.count({
      where: dateFilter,
    });

    sendSuccessResponse(res, 200, {
      message: "Donations fetched successfully",
      donations,
      pagination: {
        total: totalDonations,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(totalDonations / pageSize),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getDonationTotalsLastNDays = async (req, res, next) => {
  try {
    const { days } = req.query;

    // Ensure the days parameter is provided
    if (!days) {
      return sendErrorResponse(res, 400, "Days parameter is required");
    }

    const daysAgo = parseInt(days);
    if (isNaN(daysAgo) || daysAgo <= 0) {
      return sendErrorResponse(
        res,
        400,
        "Days parameter must be a positive integer"
      );
    }

    // Set start date based on the number of days requested
    const startDateValue = new Date();
    startDateValue.setDate(startDateValue.getDate() - (daysAgo - 1)); // Adjust for inclusive range
    startDateValue.setHours(0, 0, 0, 0); // Start from the beginning of the day

    const endDateValue = new Date();
    endDateValue.setHours(23, 59, 59, 999); // Set end time to the end of the current day

    // Get all donations within the determined date range
    const donations = await prisma.donation.findMany({
      where: {
        createdAt: {
          gte: startDateValue,
          lte: endDateValue,
        },
      },
    });

    // Initialize an object to hold total donations by date
    const donationTotalsByDate = {};

    // Aggregate donations by date
    donations.forEach((donation) => {
      const date = donation.createdAt.toISOString().split("T")[0]; // Extract date in YYYY-MM-DD format
      if (!donationTotalsByDate[date]) {
        donationTotalsByDate[date] = 0;
      }
      donationTotalsByDate[date] += donation.amount;
    });

    // Prepare the response array
    const data = [];
    for (let i = 0; i < daysAgo; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i); // Get the date for the last N days
      const dateString = date.toISOString().split("T")[0];
      data.push({
        total: donationTotalsByDate[dateString] || 0, // Default to 0 if no donations for that date
        date: dateString,
      });
    }

    sendSuccessResponse(res, 200, {
      message: `Donation totals for the last ${days} days fetched successfully`,
      data,
    });
  } catch (error) {
    next(error);
  }
};

// Controller for generating donation report (CSV/Excel)
const generateDonationReport = async (req, res, next) => {
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

    // Calculate the start date
    const startDateValue = new Date();
    startDateValue.setDate(startDateValue.getDate() - (daysAgo - 1)); // Adjust for inclusive range
    startDateValue.setHours(0, 0, 0, 0); // Start from the beginning of the day

    // Calculate the end date
    const endDateValue = new Date();
    endDateValue.setHours(23, 59, 59, 999); // End of the current day

    // Fetch donations
    const donations = await prisma.donation.findMany({
      where: {
        createdAt: {
          gte: startDateValue,
          lte: endDateValue,
        },
      },
      select: {
        donation_id: true,
        donar_name: true,
        donar_email: true,
        amount: true,
        createdAt: true,
      },
    });

    // Prepare data for the report
    const reportData = donations.map((donation) => ({
      DonationID: donation.donation_id,
      DonorName: donation.donar_name,
      DonorEmail: donation.donar_email,
      Amount: donation.amount,
      Date: donation.createdAt.toISOString().split("T")[0], // Format date as YYYY-MM-DD
    }));

    // Generate CSV or Excel based on the format requested
    if (format === "csv") {
      const csvParser = new Json2CsvParser();
      const csvData = csvParser.parse(reportData);
      res.header("Content-Type", "text/csv");
      res.attachment(`donation_report_${days}days.csv`);
      return res.send(csvData);
    } else if (format === "excel") {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Donations");

      worksheet.columns = [
        { header: "Donation ID", key: "DonationID", width: 15 },
        { header: "Donor Name", key: "DonorName", width: 20 },
        { header: "Donor Email", key: "DonorEmail", width: 25 },
        { header: "Amount", key: "Amount", width: 10 },
        { header: "Date", key: "Date", width: 15 },
      ];

      worksheet.addRows(reportData);

      res.header(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.attachment(`donation_report_${days}days.xlsx`);

      return workbook.xlsx.write(res).then(() => res.end());
    }
  } catch (error) {
    next(error);
  }
};


const getTotalDonations = async (req, res, next) => {
  try {
    const totalDonations = await prisma.donation.aggregate({
      _sum: {
        amount: true,
      },
    });

    sendSuccessResponse(res, 200, {
      message: "Total donations fetched successfully",
      totalDonations,
    });
  } catch (error) {
    next(error);
  }
}

export {
  createDonation,
  generateDonationReport,
  getAllDonations,
  getDonationTotalsLastNDays,
  getTotalDonations,
};
