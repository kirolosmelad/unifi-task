import { HydratedDocument } from "mongoose";
import { Task } from "../database/models/Task";
import { CreateTaskSchema } from "../validation-schemas/Tasks/create-task.schema";
import { TaskAttributes } from "../types/interfaces";

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
}

export const tasksService = new TasksService();
