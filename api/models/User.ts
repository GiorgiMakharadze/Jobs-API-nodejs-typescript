import mongoose, { Schema } from "mongoose";
import { IUserSchema } from "../../types/userSchemaTypes";

const UserSchema = new Schema({
  name: {
    tpye: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    tpye: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: true,
  },
  password: {
    tpye: String,
    required: [true, "Please provide password"],
    minlength: 6,
    maxlength: 12,
  },
});

export default mongoose.model<IUserSchema>("User", UserSchema);
