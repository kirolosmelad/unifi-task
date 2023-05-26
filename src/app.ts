import dotenv from "dotenv";
dotenv.config();

import express, { Application, Router } from "express";
import cors from "cors";
import helmet from "helmet";
import tasksRouter from "./routes/tasks.router";
import { APINotFoundController } from "./controllers/api-not-found.controller";
import authRouter from "./routes/auth.router";

const app: Application = express();

//#region Global Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
//#endregion

//#region Routes
const mainRouterV1 = Router();
app.use("/api/v1", mainRouterV1);

mainRouterV1.use("/tasks", tasksRouter);
mainRouterV1.use("/auth", authRouter);

// Not Found Routes
app.use("*", APINotFoundController);
//#endregion

export default app;
