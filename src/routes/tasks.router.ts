import { Router } from "express";
import { validatorMiddleware } from "../middlewares/validator.middleware";
import { createTaskSchema } from "../validation-schemas/Tasks/create-task.schema";
import { tasksController } from "../controllers/tasks.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { updateTaskSchema } from "../validation-schemas/Tasks/update-task.schema";
import { taskIdParamsSchema } from "../validation-schemas/Tasks/task-id-params.schema";

const tasksRouter = Router();

tasksRouter.use(authMiddleware);

tasksRouter.post(
  "/",
  validatorMiddleware<typeof createTaskSchema>(createTaskSchema),
  tasksController.createTask
);

tasksRouter.put(
  "/:taskId",
  validatorMiddleware<typeof taskIdParamsSchema>(taskIdParamsSchema, "params"),
  validatorMiddleware<typeof updateTaskSchema>(updateTaskSchema),
  tasksController.updateTask
);

tasksRouter.delete(
  "/:taskId",
  validatorMiddleware<typeof taskIdParamsSchema>(taskIdParamsSchema, "params"),
  tasksController.deleteTask
);

tasksRouter.get(
  "/:taskId",
  validatorMiddleware<typeof taskIdParamsSchema>(taskIdParamsSchema, "params"),
  tasksController.getTaskById
);

export default tasksRouter;
