import { Router } from "express";
import { validatorMiddleware } from "../middlewares/validator.middleware";
import { createTaskSchema } from "../validation-schemas/Tasks/create-task.schema";
import { tasksController } from "../controllers/tasks.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  updateTaskParamsSchema,
  updateTaskSchema,
} from "../validation-schemas/Tasks/update-task.schema";

const tasksRouter = Router();

tasksRouter.use(authMiddleware);

tasksRouter.post(
  "/",
  validatorMiddleware<typeof createTaskSchema>(createTaskSchema),
  tasksController.createTask
);

tasksRouter.put(
  "/:taskId",
  validatorMiddleware<typeof updateTaskParamsSchema>(
    updateTaskParamsSchema,
    "params"
  ),
  validatorMiddleware<typeof updateTaskSchema>(updateTaskSchema),
  tasksController.updateTask
);

export default tasksRouter;
