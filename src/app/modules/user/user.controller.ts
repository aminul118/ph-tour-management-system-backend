import httpStatus from "http-status-codes";
import { userServices } from "./user.service";
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userServices.createUserService(req.body);
  res.status(httpStatus.CREATED).json({
    message: "User create Successfully",
    user,
  });
});

export default catchAsync;

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await userServices.getAllUsers();
  
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "All users retrived successfully",
    data: users,
  });
});

export const UserControllers = {
  createUser,
  getAllUsers,
};
