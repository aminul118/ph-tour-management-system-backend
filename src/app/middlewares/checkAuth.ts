import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../utils/jwt";
import envVars from "../config/env";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(httpStatus.BAD_GATEWAY, "No token received");
      }
      const verifiedToken = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      if (!verifiedToken) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
      } else if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not permitted");
      }
      req.user = verifiedToken;
      next();
    } catch (error) {
      next(error);
    }
  };

export default checkAuth;
