import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_EXPIRES: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRES: string;
  BCRYPT_SALT_ROUND: number;
  SUPER_ADMIN_EMAIL: string;
  SUPER_ADMIN_PASSWORD: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CALLBACK_URL: string;
  EXPRESS_SESSION_SECRET: string;
  FRONTEND_URL: string;
}

const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
};

const loadEnvVariables = (): EnvConfig => {
  return {
    PORT: getEnv("PORT"),
    DB_URL: getEnv("DB_URL"),
    NODE_ENV: getEnv("NODE_ENV") as "development" | "production",
    JWT_ACCESS_SECRET: getEnv("JWT_ACCESS_SECRET"),
    JWT_ACCESS_EXPIRES: getEnv("JWT_ACCESS_EXPIRES"),
    JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),
    JWT_REFRESH_EXPIRES: getEnv("JWT_REFRESH_EXPIRES"),
    BCRYPT_SALT_ROUND: Number(getEnv("BCRYPT_SALT_ROUND")),
    SUPER_ADMIN_EMAIL: getEnv("SUPER_ADMIN_EMAIL"),
    SUPER_ADMIN_PASSWORD: getEnv("SUPER_ADMIN_PASSWORD"),
    GOOGLE_CLIENT_ID: getEnv("GOOGLE_CLIENT_ID"),
    GOOGLE_CLIENT_SECRET: getEnv("GOOGLE_CLIENT_SECRET"),
    GOOGLE_CALLBACK_URL: getEnv("GOOGLE_CALLBACK_URL"),
    EXPRESS_SESSION_SECRET: getEnv("EXPRESS_SESSION_SECRET"),
    FRONTEND_URL: getEnv("FRONTEND_URL"),
  };
};

const envVars = loadEnvVariables();
export default envVars;
