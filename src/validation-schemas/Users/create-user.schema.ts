import Joi from "joi";

export interface CreateUserSchema {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const createUserSchema = Joi.object<CreateUserSchema>({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});
