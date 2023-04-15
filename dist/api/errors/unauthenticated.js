"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthenticated = void 0;
const custom_api_1 = require("./custom-api");
const http_status_codes_1 = require("http-status-codes");
class Unauthenticated extends custom_api_1.CustomAPIError {
    constructor(message, statusCode = http_status_codes_1.StatusCodes.UNAUTHORIZED) {
        super(message, statusCode);
    }
}
exports.Unauthenticated = Unauthenticated;
