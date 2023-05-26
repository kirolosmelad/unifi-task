import Joi from "joi";

export interface UpdateTaskSchema {
  title: string;
  description?: string;
  completed: boolean;
}

export const updateTaskSchema = Joi.object<UpdateTaskSchema>({
  title: Joi.string().min(3).required(),
  description: Joi.string().optional(),
  completed: Joi.boolean().default(false),
});

export interface UpdateTaskParamsSchema {
  taskId: string;
}

export const updateTaskParamsSchema = Joi.object<UpdateTaskParamsSchema>({
  taskId: Joi.string().required(),
});
