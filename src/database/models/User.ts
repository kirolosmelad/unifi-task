import { Schema, model } from "mongoose";
import { UserAttributes } from "../../types/interfaces";

const userSchema = new Schema<UserAttributes>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = model<UserAttributes>("User", userSchema);
