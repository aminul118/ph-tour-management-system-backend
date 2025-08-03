import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { divisionServices } from "./division.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { IDivision } from "./division.interface";

const createDivision = catchAsync(async (req: Request, res: Response) => {
  const payload: IDivision = {
    ...req.body,
    thumbnail: req.file?.path,
  };
  console.log(payload);
  const data = await divisionServices.createDivision(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Division created",
    data,
  });
});

const getAllDivisions = catchAsync(async (req: Request, res: Response) => {
  const result = await divisionServices.getAllDivisions();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Division created",
    data: result,
  });
});

const getSingleDivision = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const result = await divisionServices.getSingleDivision(slug);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Division created",
    data: result,
  });
});

const updateDivision = catchAsync(async (req: Request, res: Response) => {
  const payload = {
    ...req.body,
    thumbnail: req.file?.path,
  };

  const id = req.params.id;

  const result = await divisionServices.updateDivision(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Division updated",
    data: result,
  });
});

const deleteDivision = catchAsync(async (req: Request, res: Response) => {
  const result = await divisionServices.deleteDivision(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Division deleted",
    data: result,
  });
});

export const divisionController = {
  createDivision,
  getAllDivisions,
  getSingleDivision,
  updateDivision,
  deleteDivision,
};
