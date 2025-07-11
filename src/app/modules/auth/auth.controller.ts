import httpStatus from "http-status-codes";
import { Request, Response } from "express";

import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import catchAsync from "../../utils/catchAsync";

const credentialsLogin = catchAsync(async (req: Request, res: Response) => {
  const loginInfo = await AuthServices.credentialsLogin(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged In successfully",
    data: loginInfo,
  });
});

export const AuthController = {
  credentialsLogin,
};
