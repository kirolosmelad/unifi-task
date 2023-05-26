import { Router } from "express";
import { validatorMiddleware } from "../middlewares/validator.middleware";
import { createTaskSchema } from "../validation-schemas/Tasks/create-task.schema";
import { tasksController } from "../controllers/tasks.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const tasksRouter = Router();

tasksRouter.use(authMiddleware);

tasksRouter.post(
  "/",
  validatorMiddleware(createTaskSchema),
  tasksController.createTask
);

export default tasksRouter;
