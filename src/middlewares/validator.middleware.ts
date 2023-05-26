import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema, ValidationResult } from "joi";
import { ErrorResponse } from "../utils/response.class";

export const validatorMiddleware =
  <T extends Schema>(schema: T, target: "body" | "params" | "query" = "body") =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationResult: ValidationResult<T> = schema.validate(req.body);
      if (validationResult["error"]) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(
            new ErrorResponse(
              StatusCodes.BAD_REQUEST,
              validationResult.error.details[0].message,
              validationResult.error
            )
          );
      }
      next();
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR));
    }
  };
