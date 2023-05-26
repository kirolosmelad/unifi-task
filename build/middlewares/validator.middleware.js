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
exports.validatorMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_class_1 = require("../utils/response.class");
const validatorMiddleware = (schema, target = "body") => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validationResult = schema.validate(req.body);
        if (validationResult["error"]) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json(new response_class_1.ErrorResponse(http_status_codes_1.StatusCodes.BAD_REQUEST, validationResult.error.details[0].message, validationResult.error));
        }
        next();
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json(new response_class_1.ErrorResponse(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR));
    }
});
exports.validatorMiddleware = validatorMiddleware;
