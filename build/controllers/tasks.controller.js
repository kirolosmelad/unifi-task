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
exports.tasksController = void 0;
const tasks_service_1 = require("../services/tasks.service");
const http_status_codes_1 = require("http-status-codes");
const response_class_1 = require("../utils/response.class");
class TasksController {
    //#region Create Task
    createTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield tasks_service_1.tasksService.createTask(res.locals.user.id, req.body);
                return res
                    .status(http_status_codes_1.StatusCodes.CREATED)
                    .json(new response_class_1.SuccessResponse(http_status_codes_1.StatusCodes.CREATED, task));
            }
            catch (err) {
                return next(err);
            }
        });
    }
    //#endregion
    //#region Update Task
    updateTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield tasks_service_1.tasksService.updateTask(res.locals.user.id, req.params.taskId, req.body);
                return res
                    .status(http_status_codes_1.StatusCodes.OK)
                    .json(new response_class_1.SuccessResponse(http_status_codes_1.StatusCodes.OK, "Task updated successfully"));
            }
            catch (err) {
                return next(err);
            }
        });
    }
    //#endregion
    //#region Delete Task
    deleteTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield tasks_service_1.tasksService.deleteTask(req.params.taskId, res.locals.user.id);
                return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json();
            }
            catch (err) {
                return next(err);
            }
        });
    }
    //#endregion
    //#region Get Task By Id
    getTaskById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield tasks_service_1.tasksService.getTaskById(req.params.taskId, res.locals.user.id);
                return res
                    .status(http_status_codes_1.StatusCodes.OK)
                    .json(new response_class_1.SuccessResponse(http_status_codes_1.StatusCodes.OK, task));
            }
            catch (err) {
                return next(err);
            }
        });
    }
}
exports.tasksController = new TasksController();
