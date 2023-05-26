import { Router } from "express";
import { validatorMiddleware } from "../middlewares/validator.middleware";
import { createTaskSchema } from "../validation-schemas/Tasks/create-task.schema";
import { tasksController } from "../controllers/tasks.controller";

const tasksRouter = Router();

tasksRouter.post(
  "/",
  validatorMiddleware(createTaskSchema),
  tasksController.createTask
);

export default tasksRouter;
