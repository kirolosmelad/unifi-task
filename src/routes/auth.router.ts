import { Router } from "express";
import { validatorMiddleware } from "../middlewares/validator.middleware";
import { createUserSchema } from "../validation-schemas/Users/create-user.schema";
import { authController } from "../controllers/auth.controller";
import { loginSchema } from "../validation-schemas/Users/login.schema";

const authRouter = Router();

authRouter.post(
  "/signup",
  validatorMiddleware<typeof createUserSchema>(createUserSchema),
  authController.signup
);

authRouter.post(
  "/login",
  validatorMiddleware<typeof loginSchema>(loginSchema),
  authController.login
);

export default authRouter;
