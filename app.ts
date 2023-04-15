import express from "express";
import "dotenv/config";
import "express-async-errors";
import authRouter from "./api/routes/auth";
import jobsRouter from "./api/routes/jobs";
import { connectDB } from "./api/db/connect";
import { notFound } from "./api/middleware/not-found";
import { errorHandlerMiddleware } from "./api/middleware/error-handler";
import { auth } from "./api/middleware/authentication";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

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
