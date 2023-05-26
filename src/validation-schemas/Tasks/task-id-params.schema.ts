import Joi from "joi";

export interface TaskIdParamsSchema {
  taskId: string;
}

export const taskIdParamsSchema = Joi.object<TaskIdParamsSchema>({
  taskId: Joi.string().required(),
});
