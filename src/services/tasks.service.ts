import { HydratedDocument } from "mongoose";
import { Task } from "../database/models/Task";
import { CreateTaskSchema } from "../validation-schemas/Tasks/create-task.schema";
import { TaskAttributes } from "../types/interfaces";
import { UpdateTaskSchema } from "../validation-schemas/Tasks/update-task.schema";
import { ErrorResponse } from "../utils/response.class";
import { StatusCodes } from "http-status-codes";

class TasksService {
  //#region Create Task
  public async createTask(
    userId: string,
    taskData: CreateTaskSchema
  ): Promise<TaskAttributes> {
    try {
      const task: HydratedDocument<TaskAttributes> = new Task({
        ...taskData,
        userId,
      });
      return await task.save();
    } catch (err) {
      throw err;
    }
  }
  //#endregion

  //#region Update Task
  public async updateTask(
    userId: string,
    taskId: string,
    newTaskData: UpdateTaskSchema
  ): Promise<void> {
    try {
      const task = await Task.findOne({ _id: taskId, userId });

      if (!task) {
        throw new ErrorResponse(StatusCodes.NOT_FOUND, "Task does not exist");
      }

      task.overwrite({ ...task, ...newTaskData, userId });

      await task.save();
    } catch (err) {
      throw err;
    }
  }
  //#endregion

  //#region Delete Task
  public async deleteTask(taskId: string, userId: string): Promise<void> {
    try {
      await Task.deleteOne({ _id: taskId, userId });
    } catch (err) {
      throw err;
    }
  }
  //#endregion

  //#region Get Task By Id
  public async getTaskById(
    taskId: string,
    userId: string
  ): Promise<TaskAttributes> {
    try {
      const task = await Task.findOne({ _id: taskId, userId });
      if (!task) {
        throw new ErrorResponse(StatusCodes.NOT_FOUND, "Task does not exist");
      }

      return task;
    } catch (err) {
      throw err;
    }
  }
  //#endregion

  //#region Get All Tasks
  public async getAll(): Promise<TaskAttributes[]> {
    try {
      return await Task.find();
    } catch (err) {
      throw err;
    }
  }
  //#endregion
}

export const tasksService = new TasksService();
