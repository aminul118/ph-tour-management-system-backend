import httpStatus from "http-status-codes";
import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../../utils/setCookie";
import envVars from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import { createUserToken } from "../../utils/userTokens";

const credentialsLogin = catchAsync(async (req: Request, res: Response) => {
  const loginInfo = await AuthServices.credentialsLogin(req.body);

  setAuthCookie(res, loginInfo);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged In successfully",
    data: loginInfo,
  });
});

const getNewAccessToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "No refresh token received from cookies"
    );
  }
  const tokenInfo = await AuthServices.getNewAccessToken(
    refreshToken as string
  );

  setAuthCookie(res, tokenInfo);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "New Access Token Retrieved Successfully",
    data: tokenInfo,
  });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logout successfully",
    data: null,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const newPassword = req.body.newPassword;
  const oldPassword = req.body.oldPassword;
  const decodedToken = req.user;

  await AuthServices.resetPassword(
    oldPassword,
    newPassword,
    decodedToken as JwtPayload
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password Changed successfully",
    data: null,
  });
});

const googleCallbackController = catchAsync(
  async (req: Request, res: Response) => {
    let redirectTo = req.query.state ? (req.query.state as string) : "";

    if (redirectTo.startsWith("/")) {
      redirectTo = redirectTo.slice(1);
    }

    const user = req.user;

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
    }

    const tokenInfo = createUserToken(user);

    setAuthCookie(res, tokenInfo);

    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`);
  }
);

export const AuthController = {
  credentialsLogin,
  getNewAccessToken,
  logout,
  resetPassword,
  googleCallbackController,
};
