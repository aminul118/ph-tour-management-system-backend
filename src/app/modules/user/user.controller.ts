import httpStatus from "http-status-codes";
import { userServices } from "./user.service";
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload = {
    ...req.body,
    picture: req.file?.path,
  };
  const user = await userServices.createUserService(payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User create successfully",
    data: user,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const payload = {
    ...req.body,
    picture: req.file?.path,
  };

  const userId = req.params.id;
  const verifiedToken = req.user;

  const user = await userServices.updateUser(
    userId,
    payload,
    verifiedToken as JwtPayload
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User create successfully",
    data: user,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await userServices.getAllUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All users retrieved successfully",
    data: users,
  });
});

export const UserControllers = {
  createUser,
  updateUser,
  getAllUsers,
};
