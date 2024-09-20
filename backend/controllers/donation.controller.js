import prisma from "../lib/prisma.js";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responses.utils.js";

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
      const startDateValue = new Date();
      startDateValue.setDate(startDateValue.getDate() - daysAgo); // Calculate the start date
  
      // Set the end date to today
      const endDateValue = new Date();
  
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
      donations.forEach(donation => {
        const date = donation.createdAt.toISOString().split('T')[0]; // Extract date in YYYY-MM-DD format
        if (!donationTotalsByDate[date]) {
          donationTotalsByDate[date] = 0;
        }
        donationTotalsByDate[date] += donation.amount;
      });
  
      // Prepare the response array
      const data = Object.entries(donationTotalsByDate).map(([date, total]) => ({
        total,
        date,
      }));
  
      sendSuccessResponse(res, 200, {
        message: `Donation totals for the last ${days} days fetched successfully`,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

export { createDonation, getAllDonations, getDonationTotalsLastNDays };
