import express, { Request, Response } from "express";
import router from "./app/routes";
import cors, { CorsOptions } from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app = express();

const whitelist = ["http://example1.com", "http://example2.com"];

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
app.use(express.json());
app.use(cors(corsOptions));

// Api routing
app.use("/api/v1", router);

// Testing api
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Tour Management server running",
  });
});

// Error Handler
app.use(globalErrorHandler);
app.use(notFound);

export default app;
