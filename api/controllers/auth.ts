import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/bad-request";
import User from "../models/User";

export const register = async (req: Request, res: Response) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

export const login = async (req: Request, res: Response) => {
  res.send("login user");
};
