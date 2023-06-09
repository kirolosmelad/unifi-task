"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const tasks_router_1 = __importDefault(require("./routes/tasks.router"));
const api_not_found_controller_1 = require("./controllers/api-not-found.controller");
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const error_handler_1 = __importDefault(require("./controllers/error.handler"));
const app = (0, express_1.default)();
//#region Global Middlewares
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
//#endregion
//#region Routes
const mainRouterV1 = (0, express_1.Router)();
app.use("/api/v1", mainRouterV1);
mainRouterV1.use("/tasks", tasks_router_1.default);
mainRouterV1.use("/auth", auth_router_1.default);
// Not Found Routes
app.use("*", api_not_found_controller_1.APINotFoundController);
//#endregion
// Global Error handler
app.use(error_handler_1.default);
exports.default = app;
