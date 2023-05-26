import { NextFunction, Request, Response } from "express";
import { CreateTaskSchema } from "../validation-schemas/Tasks/create-task.schema";
import { tasksService } from "../services/tasks.service";
import { StatusCodes } from "http-status-codes";
import { SuccessResponse } from "../utils/response.class";
import { TaskAttributes } from "../types/interfaces";
import {
  UpdateTaskParamsSchema,
  UpdateTaskSchema,
} from "../validation-schemas/Tasks/update-task.schema";

class TasksController {
  //#region Create Task
  public async createTask(
    req: Request<any, any, CreateTaskSchema>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const task = await tasksService.createTask(res.locals.user.id, req.body);
      return res
        .status(StatusCodes.CREATED)
        .json(new SuccessResponse<TaskAttributes>(StatusCodes.CREATED, task));
    } catch (err) {
      return next(err);
    }
  }
  //#endregion

  //#region Update Task
  public async updateTask(
    req: Request<any, any, UpdateTaskSchema>,
    res: Response,
    next: NextFunction
  ) {
    try {
      await tasksService.updateTask(
        res.locals.user.id,
        req.params.taskId,
        req.body
      );
      return res
        .status(StatusCodes.OK)
        .json(
          new SuccessResponse<string>(
            StatusCodes.OK,
            "Task updated successfully"
          )
        );
    } catch (err) {
      return next(err);
    }
  }
  //#endregion
}

export const tasksController = new TasksController();
