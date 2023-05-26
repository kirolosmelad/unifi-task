"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksService = void 0;
const Task_1 = require("../database/models/Task");
const response_class_1 = require("../utils/response.class");
const http_status_codes_1 = require("http-status-codes");
class TasksService {
    //#region Create Task
    createTask(userId, taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = new Task_1.Task(Object.assign(Object.assign({}, taskData), { userId }));
                return yield task.save();
            }
            catch (err) {
                throw err;
            }
        });
    }
    //#endregion
    //#region Update Task
    updateTask(userId, taskId, newTaskData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield Task_1.Task.findOne({ _id: taskId, userId });
                if (!task) {
                    throw new response_class_1.ErrorResponse(http_status_codes_1.StatusCodes.NOT_FOUND, "Task does not exist");
                }
                task.overwrite(Object.assign(Object.assign(Object.assign({}, task), newTaskData), { userId }));
                yield task.save();
            }
            catch (err) {
                throw err;
            }
        });
    }
    //#endregion
    //#region Delete Task
    deleteTask(taskId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Task_1.Task.deleteOne({ _id: taskId, userId });
            }
            catch (err) {
                throw err;
            }
        });
    }
    //#endregion
    //#region Get Task By Id
    getTaskById(taskId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield Task_1.Task.findOne({ _id: taskId, userId });
                if (!task) {
                    throw new response_class_1.ErrorResponse(http_status_codes_1.StatusCodes.NOT_FOUND, "Task does not exist");
                }
                return task;
            }
            catch (err) {
                throw err;
            }
        });
    }
    //#endregion
    //#region Get All Tasks
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Task_1.Task.find();
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.tasksService = new TasksService();
