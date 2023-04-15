import mongoose from "mongoose";

export interface IJobSchema {
  company: string;
  position: string;
  status: string;
  createdBy: mongoose.Types.ObjectId;
}
