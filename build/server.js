"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const connection_1 = require("./database/connection");
(0, connection_1.connectMongoDB)()
    .then(() => {
    console.log("MongoDB connected successfully");
})
    .catch((err) => {
    console.log(`Error while connecting MongoDB ${err}`);
});
const port = process.env.PORT || 3000;
app_1.default.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
