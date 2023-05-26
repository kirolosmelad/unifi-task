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
}
exports.tasksService = new TasksService();
