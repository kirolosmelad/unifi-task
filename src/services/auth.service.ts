import { HydratedDocument } from "mongoose";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { CreateUserSchema } from "../validation-schemas/Users/create-user.schema";
import { UserAttributes } from "../types/interfaces";
import { User } from "../database/models/User";
import { LoginSchema } from "../validation-schemas/Users/login.schema";
import { ErrorResponse } from "../utils/response.class";
import { StatusCodes } from "http-status-codes";

class AuthService {
  //#region Sign up
  public async signup(
    userData: CreateUserSchema
  ): Promise<{ user: Omit<UserAttributes, "password">; token: string }> {
    try {
      const user: HydratedDocument<UserAttributes> = new User(userData);
      const savedUser = await user.save();

      savedUser["password"] = undefined;

      return { user: savedUser, token: this.generateJWT(savedUser) };
    } catch (err) {
      throw err;
    }
  }
  //#endregion

  //#region Login
  public async login(loginData: LoginSchema): Promise<{ token: string }> {
    try {
      const user = await User.findOne({ email: loginData.email });
      if (!user) {
        throw new ErrorResponse(
          StatusCodes.BAD_REQUEST,
          "Invalid username or password"
        );
      }
      const isPasswordMatch = await bcrypt.compare(
        loginData.password,
        user["password"] as string
      );
      if (!isPasswordMatch) {
        throw new ErrorResponse(
          StatusCodes.BAD_REQUEST,
          "Invalid username or password"
        );
      }

      return { token: this.generateJWT(user) };
    } catch (err) {
      throw err;
    }
  }
  //#endregion

  private generateJWT(user: UserAttributes): string {
    return jwt.sign({ id: user["id"] }, process.env.TOKEN_SECRET as string);
  }
}

export const authService = new AuthService();
