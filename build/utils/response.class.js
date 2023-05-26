"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = exports.ErrorResponse = void 0;
const http_status_codes_1 = require("http-status-codes");
class ErrorResponse {
    constructor(statusCode, message, err) {
        this.statusCode = (0, http_status_codes_1.getReasonPhrase)(statusCode);
        this.message = message !== null && message !== void 0 ? message : "Unable to perform this action";
        this.err = err;
    }
}
exports.ErrorResponse = ErrorResponse;
class SuccessResponse {
    constructor(statusCode, data) {
        this.message = (0, http_status_codes_1.getReasonPhrase)(statusCode);
        this.data = data;
    }
}
exports.SuccessResponse = SuccessResponse;
