import Joi from "joi";

export interface LoginSchema {
  email: string;
  password: string;
}

export const loginSchema = Joi.object<LoginSchema>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
