"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const custom_api_1 = require("../errors/custom-api");
const http_status_codes_1 = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof custom_api_1.CustomAPIError) {
        return res
            .status(err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: err.message });
    }
    return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
