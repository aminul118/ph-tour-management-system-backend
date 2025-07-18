import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";

import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { tourService } from "./tour.service";

const createTour = catchAsync(async (req: Request, res: Response) => {
  const result = await tourService.createTour(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Tour created",
    data: result,
  });
});

const createTourType = catchAsync(async (req: Request, res: Response) => {
  const result = await tourService.createTourType(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Tour type created",
    data: result,
  });
});

const getAllTours = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await tourService.getAllTours(query as Record<string, string>);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All tours retrieved",
    meta: result.meta,
    data: result.data,
  });
});

const getAllTourTypes = catchAsync(async (req: Request, res: Response) => {
  const result = await tourService.getAllTourTypes();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All tours type retrieved",
    data: result,
  });
});

const updateTour = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await tourService.updateTour(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Tour Updated",
    data: result,
  });
});

const updateTourType = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await tourService.updateTourType(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Tour type updated",
    data: result,
  });
});

const deleteTour = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await tourService.deleteTour(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tour Deleted",
    data: result,
  });
});

const deleteTourType = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await tourService.deleteTourType(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tour Deleted",
    data: result,
  });
});

export const tourController = {
  createTour,
  createTourType,
  getAllTours,
  getAllTourTypes,
  updateTour,
  updateTourType,
  deleteTour,
  deleteTourType,
};
