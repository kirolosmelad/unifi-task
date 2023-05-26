import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
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
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (this: UserAttributes, next: any) {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export const User = model<UserAttributes>("User", userSchema);
