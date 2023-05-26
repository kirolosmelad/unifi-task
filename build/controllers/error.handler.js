"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const mongoose_1 = require("mongoose");
const http_status_codes_1 = require("http-status-codes");
const response_class_1 = require("../utils/response.class");
// Custom error handler middleware
const errorHandler = (err, req, res, next) => {
    if (err instanceof response_class_1.ErrorResponse) {
    }
    else if (err instanceof mongoose_1.Error) {
        if (err instanceof mongoose_1.Error.ValidationError) {
            // Handle Mongoose validation errors
            const validationErrors = {};
            Object.keys(err.errors).forEach((key) => {
                validationErrors[key] = err.errors[key].message;
            });
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json(new response_class_1.ErrorResponse(http_status_codes_1.StatusCodes.BAD_REQUEST, "Validation Error", validationErrors));
        }
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json(new response_class_1.ErrorResponse(http_status_codes_1.StatusCodes.BAD_REQUEST, `${Object.keys(err.keyValue)[0]} is already exist`));
    }
    else {
        console.error(err);
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json(new response_class_1.ErrorResponse(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, undefined, err));
    }
};
exports.errorHandler = errorHandler;
exports.default = exports.errorHandler;
