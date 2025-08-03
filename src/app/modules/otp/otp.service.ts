import httpStatus from 'http-status-codes';
import crypto from 'crypto';
import { redisClient } from '../../config/redis.config';
import sendEmail from '../../utils/sendEmail';
import AppError from '../../errorHelpers/AppError';
import { User } from '../user/user.model';

const OTP_EXPIRATION = 2 * 60; //2 minutes

const generateOTP = (length = 6) => {
  // 6 digit otp
  const otp = crypto.randomInt(10 ** (length - 1), 10 ** length).toString();
  return otp;
};

const sendOTP = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (user.isVerified) {
    throw new AppError(httpStatus.NOT_FOUND, 'You are already verified');
  }
  const otp = generateOTP();
  const redisKey = `otp:${email}`;
  await redisClient.set(redisKey, otp, {
    expiration: {
      type: 'EX',
      value: OTP_EXPIRATION,
    },
  });
  await sendEmail({
    to: email,
    subject: 'Your OTP code',
    templateName: 'otp',
    templateData: {
      name: user?.name,
      otp,
    },
  });
};

const verifyOTP = async (email: string, otp: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (user.isVerified) {
    throw new AppError(httpStatus.NOT_FOUND, 'You are already verified');
  }

  const redisKey = `otp:${email}`;
  const savedOtp = await redisClient.get(redisKey);
  if (!savedOtp || savedOtp !== otp) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid OTP');
  }

  await Promise.all([
    await User.updateOne({ email }, { isVerified: true }, { runValidators: true }),
    await redisClient.del([redisKey]),
  ]);
};

export const OTPService = {
  sendOTP,
  verifyOTP,
};
