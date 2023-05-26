import { Error as MongooseError } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../utils/response.class";

// Custom error handler middleware
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorResponse) {
  } else if (err instanceof MongooseError) {
    if (err instanceof MongooseError.ValidationError) {
      // Handle Mongoose validation errors
      const validationErrors: { [key: string]: string } = {};
      Object.keys(err.errors).forEach((key) => {
        validationErrors[key] = err.errors[key].message;
      });
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          new ErrorResponse(
            StatusCodes.BAD_REQUEST,
            "Validation Error",
            validationErrors
          )
        );
    }
  } else if (err?.code === 11000) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(
        new ErrorResponse(
          StatusCodes.BAD_REQUEST,
          `${Object.keys(err.keyValue)[0]} is already exist`
        )
      );
  } else {
    console.error(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        new ErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, undefined, err)
      );
  }
};

export default errorHandler;
