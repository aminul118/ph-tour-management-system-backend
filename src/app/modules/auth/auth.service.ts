import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { createNewAccessTokenWithRefreshToken } from "../../utils/userTokens";
import { JwtPayload } from "jsonwebtoken";
import envVars from "../../config/env";

const getNewAccessToken = async (refreshToken: string) => {
  return await createNewAccessTokenWithRefreshToken(refreshToken);
};

const resetPassword = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload
) => {
  const user = await User.findById(decodedToken.userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isOldPassword = await bcryptjs.compare(
    oldPassword,
    user.password as string
  );

  if (!isOldPassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Old password doesn't match");
  }

  user.password = await bcryptjs.hash(newPassword, envVars.BCRYPT_SALT_ROUND);
  await user.save();
};

export const AuthServices = {
  getNewAccessToken,
  resetPassword,
};
