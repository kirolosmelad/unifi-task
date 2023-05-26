import mongoose, { Mongoose } from "mongoose";

export const connectMongoDB = async (): Promise<Mongoose> => {
  return await mongoose.connect(process.env.MONGODB_URI as string);
};
