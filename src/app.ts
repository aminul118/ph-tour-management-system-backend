import express, { Request, Response } from "express";
import router from "./app/routes";
import cors, { CorsOptions } from "cors";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
import passport from "passport";
import expressSession from "express-session";
import envVars from "./app/config/env";
import "./app/config/passport";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";

const app = express();

// Cors configurations

const whitelist = [
  "http://localhost:5000",
  "http://localhost:5173",
  "https://sandbox.sslcommerz.com",
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Middlewares
app.use(
  expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Api routing version 1
app.use("/api/v1", router);

// Testing api
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: 200,
    message: "Tour Management server running",
  });
});

// Error Handler
app.use(globalErrorHandler);
app.use(notFound);

export default app;
