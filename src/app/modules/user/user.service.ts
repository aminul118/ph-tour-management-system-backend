import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs";
import envVars from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

const createUserService = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;
  // console.log(payload);
  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exits");
  }

  const hashedPassword = await bcryptjs.hash(
    password as string,
    envVars.BCRYPT_SALT_ROUND
  );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  const user = await User.create({
    ...rest,
    email,
    picture: payload?.picture,
    password: hashedPassword,
    auths: [authProvider],
  });
  return user;
};

const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  /**
   * email - can not update
   * name,phone, password, address
   * password: re hashing
   * role, isDeleted - admin , supper admin can handle
   *
   * promoting to superAdmin - superAdmin only can handle
   */
  if (payload.role) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }

    if (payload.role === Role.USER && decodedToken.role === Role.ADMIN) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }

    if (payload.isActive || payload.isDeleted || payload.isVerified) {
      if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
        throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
      }
    }

    if (payload.password) {
      payload.password = await bcryptjs.hash(
        payload.password,
        envVars.BCRYPT_SALT_ROUND
      );
    }

    const newUpdateUser = await User.findByIdAndUpdate(userId, payload, {
      new: true,
    });

    return newUpdateUser;
  }
};

const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

export const userServices = {
  createUserService,
  updateUser,
  getAllUsers,
};
