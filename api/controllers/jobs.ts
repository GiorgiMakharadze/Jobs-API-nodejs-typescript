import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/bad-request";
import { NotFoundError } from "../errors/not-found";
import { RequestWithUser } from "../../types/authMiddlewareTypes";
import Job from "../models/Job";

export const getAllJobs = async (req: RequestWithUser, res: Response) => {
  const jobs = await Job.find({ createdBy: req.user?.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

export const getJob = async (req: RequestWithUser, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    throw new BadRequestError("User not authenticated");
  }
  const jobId = req.params.id;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

export const createJob = async (req: RequestWithUser, res: Response) => {
  req.body.createdBy = req.user?.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const updateJob = async (req: RequestWithUser, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    throw new BadRequestError("User not authenticated");
  }

  const jobId = req.params.id;

  const { company, position } = req.body;

  if (company === "" || position === "") {
    throw new BadRequestError("Company or Position fields cannot be empty");
  }
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

export const deleteJob = async (req: RequestWithUser, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    throw new BadRequestError("User not authenticated");
  }
  const jobId = req.params.id;

  const job = await Job.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  res.status(StatusCodes.OK).send("Job is removed");
};
