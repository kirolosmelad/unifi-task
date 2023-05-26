import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../utils/response.class";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../database/models/User";
import { UserAttributes } from "../types/interfaces";
import { Document } from "mongoose";

const sendUnauthorizedError = (res: Response) => {
  return res
    .status(StatusCodes.UNAUTHORIZED)
    .json(new ErrorResponse(StatusCodes.UNAUTHORIZED, "unauthorized"));
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) return sendUnauthorizedError(res);

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET as string);

    const isUserExist: Document<UserAttributes> | null = await User.findById(
      (decodedToken as JwtPayload).id
    );
    if (!isUserExist) return sendUnauthorizedError(res);

    res.locals.user = isUserExist;
    next();
  } catch (err) {
    return sendUnauthorizedError(res);
  }
};
