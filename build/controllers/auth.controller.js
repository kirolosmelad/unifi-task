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
exports.authController = void 0;
const auth_service_1 = require("../services/auth.service");
const http_status_codes_1 = require("http-status-codes");
const response_class_1 = require("../utils/response.class");
class AuthController {
    //#region Sign up
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield auth_service_1.authService.signup(req.body);
                return res
                    .status(http_status_codes_1.StatusCodes.CREATED)
                    .json(new response_class_1.SuccessResponse(http_status_codes_1.StatusCodes.CREATED, user));
            }
            catch (err) {
                return next(err);
            }
        });
    }
    //#endregion
    //#region Login
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield auth_service_1.authService.login(req.body);
                return res
                    .status(http_status_codes_1.StatusCodes.OK)
                    .json(new response_class_1.SuccessResponse(http_status_codes_1.StatusCodes.OK, token));
            }
            catch (err) {
                return next(err);
            }
        });
    }
}
exports.authController = new AuthController();
