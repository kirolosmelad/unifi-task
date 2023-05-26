import { Document, ObjectId, Schema } from "mongoose";

export interface UserAttributes extends Document<ObjectId> {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

export interface TaskAttributes extends Document<ObjectId> {
  title: String;
  description: String;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: Schema.Types.ObjectId;
}
