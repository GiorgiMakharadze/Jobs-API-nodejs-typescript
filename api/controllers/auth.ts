import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/bad-request";
import User from "../models/User";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide name,email and password");
  }
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ user });
};
export const login = async (req: Request, res: Response) => {
  res.send("login user");
};
