import express from "express";
import "dotenv/config";
import "express-async-errors";
import xss from "xss-clean";
import rateLimiter from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";
import authRouter from "./api/routes/auth";
import jobsRouter from "./api/routes/jobs";
import { connectDB } from "./api/db/connect";
import { notFound } from "./api/middleware/not-found";
import { errorHandlerMiddleware } from "./api/middleware/error-handler";
import { auth } from "./api/middleware/authentication";

const app = express();
const port = process.env.PORT || 3000;

//middlewares & extra security packages
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", auth, jobsRouter);

// error handler
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI!);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
