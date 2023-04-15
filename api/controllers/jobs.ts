import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/bad-request";
import { NotFoundError } from "../errors/not-found";
import { RequestWithUser } from "../../types/authMiddlewareTypes";
import Job from "../models/Job";

export const getAllJobs = async (req: Request, res: Response) => {
  res.send("get all jobs ");
};
export const getJob = async (req: Request, res: Response) => {
  res.send("get  job ");
};
export const createJob = async (req: RequestWithUser, res: Response) => {
  req.body.craetedBy = req.user?.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
export const updateJob = async (req: Request, res: Response) => {
  res.send("update job ");
};
export const deleteJob = async (req: Request, res: Response) => {
  res.send("delete job ");
};
