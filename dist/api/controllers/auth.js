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
exports.login = exports.register = void 0;
const http_status_codes_1 = require("http-status-codes");
const bad_request_1 = require("../errors/bad-request");
const unauthenticated_1 = require("../errors/unauthenticated");
const User_1 = __importDefault(require("../models/User"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.create(Object.assign({}, req.body));
    const token = user.createJWT();
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ user: { name: user.name }, token });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new bad_request_1.BadRequestError("Please provide email and passwrod");
    }
    const user = yield User_1.default.findOne({ email });
    //compare password
    if (!user) {
        throw new unauthenticated_1.UnauthenticatedError("Invalide Credentials");
    }
    const isPasswordCorrect = yield user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new unauthenticated_1.UnauthenticatedError("Invalide Credentials");
    }
    const token = user.createJWT();
    res.status(http_status_codes_1.StatusCodes.OK).json({ user: { name: user.name }, token });
});
exports.login = login;
