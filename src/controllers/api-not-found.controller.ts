import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../utils/response.class";

export const APINotFoundController = (_req: Request, res: Response) => {
  return res
    .status(StatusCodes.NOT_FOUND)
    .json(new ErrorResponse(StatusCodes.NOT_FOUND, "API not found"));
};
