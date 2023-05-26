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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_class_1 = require("../utils/response.class");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../database/models/User");
const sendUnauthorizedError = (res) => {
    return res
        .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
        .json(new response_class_1.ErrorResponse(http_status_codes_1.StatusCodes.UNAUTHORIZED, "unauthorized"));
};
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split("Bearer ")[1];
        if (!token)
            return sendUnauthorizedError(res);
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        const isUserExist = yield User_1.User.findById(decodedToken.id);
        if (!isUserExist)
            return sendUnauthorizedError(res);
        res.locals.user = isUserExist;
        next();
    }
    catch (err) {
        return sendUnauthorizedError(res);
    }
});
exports.authMiddleware = authMiddleware;
