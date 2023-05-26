"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_middleware_1 = require("../middlewares/validator.middleware");
const create_task_schema_1 = require("../validation-schemas/Tasks/create-task.schema");
const tasks_controller_1 = require("../controllers/tasks.controller");
const tasksRouter = (0, express_1.Router)();
tasksRouter.post("/", (0, validator_middleware_1.validatorMiddleware)(create_task_schema_1.createTaskSchema), tasks_controller_1.tasksController.createTask);
exports.default = tasksRouter;
