import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import bookingServices from "./booking.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;

  const data = await bookingServices.createBooking(
    req.body,
    decodedToken.userId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking create successfully",
    data,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const data = await bookingServices.getAllBookings();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking retrieved successfully",
    data,
  });
});

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const data = await bookingServices.getSingleBooking(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking retrieved successfully",
    data,
  });
});

const getUserBookings = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const data = await bookingServices.getUserBookings(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking retrieved successfully",
    data,
  });
});

const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const data = await bookingServices.updateBookingStatus(userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking retrieved successfully",
    data,
  });
});

const BookingControllers = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  getUserBookings,
  updateBookingStatus,
};

export default BookingControllers;
