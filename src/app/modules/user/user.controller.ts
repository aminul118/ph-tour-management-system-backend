import httpStatus from "http-status-codes";
import { userServices } from "./user.service";
import { NextFunction, Request, Response } from "express";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
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
