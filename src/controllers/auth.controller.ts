import { NextFunction, Request, Response } from "express";
import { authService } from "../services/auth.service";
import { CreateUserSchema } from "../validation-schemas/Users/create-user.schema";
import { StatusCodes } from "http-status-codes";
import { SuccessResponse } from "../utils/response.class";
import { UserAttributes } from "../types/interfaces";
import { LoginSchema } from "../validation-schemas/Users/login.schema";

class AuthController {
  //#region Sign up
  public async signup(
    req: Request<any, any, CreateUserSchema>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await authService.signup(req.body);
      return res
        .status(StatusCodes.CREATED)
        .json(
          new SuccessResponse<{ user: UserAttributes; token: string }>(
            StatusCodes.CREATED,
            user
          )
        );
    } catch (err) {
      return next(err);
    }
  }
  //#endregion

  //#region Login
  public async login(
    req: Request<any, any, LoginSchema>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = await authService.login(req.body);
      return res
        .status(StatusCodes.OK)
        .json(new SuccessResponse<{ token: string }>(StatusCodes.OK, token));
    } catch (err) {
      return next(err);
    }
  }
  //#endregion
}

export const authController = new AuthController();
