import httpStatus from "http-status-codes";
import { userServices } from "./user.service";
import { NextFunction, Request, Response } from "express";
import AppError from "../../errorHelpers/AppError";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new AppError(httpStatus.BAD_REQUEST, "Fake Error");
    const data = await userServices.createUserService(req.body);
    res.status(httpStatus.CREATED).json({
      message: "User created Successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const UserControllers = {
  createUser,
};
