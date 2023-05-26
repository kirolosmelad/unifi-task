import Joi from "joi";

export interface CreateTaskSchema {
  title: string;
  description?: string;
  completed: boolean;
}

export const createTaskSchema = Joi.object<CreateTaskSchema>({
  title: Joi.string().min(3).required(),
  description: Joi.string().optional(),
  completed: Joi.boolean().default(false),
});
