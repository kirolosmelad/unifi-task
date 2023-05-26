import { NextFunction, Request, Response } from "express";
import { CreateTaskSchema } from "../validation-schemas/Tasks/create-task.schema";
import { tasksService } from "../services/tasks.service";
import { StatusCodes } from "http-status-codes";
import { SuccessResponse } from "../utils/response.class";
import { TaskAttributes } from "../types/interfaces";

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
}

export const tasksController = new TasksController();
