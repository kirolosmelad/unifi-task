"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APINotFoundController = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_class_1 = require("../utils/response.class");
const APINotFoundController = (_req, res) => {
    return res
        .status(http_status_codes_1.StatusCodes.NOT_FOUND)
        .json(new response_class_1.ErrorResponse(http_status_codes_1.StatusCodes.NOT_FOUND, "API not found"));
};
exports.APINotFoundController = APINotFoundController;
