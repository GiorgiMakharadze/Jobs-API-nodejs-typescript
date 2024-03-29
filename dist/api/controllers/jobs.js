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
exports.deleteJob = exports.updateJob = exports.createJob = exports.getJob = exports.getAllJobs = void 0;
const http_status_codes_1 = require("http-status-codes");
const bad_request_1 = require("../errors/bad-request");
const not_found_1 = require("../errors/not-found");
const Job_1 = __importDefault(require("../models/Job"));
const getAllJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const jobs = yield Job_1.default.find({ createdBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId }).sort("createdAt");
    res.status(http_status_codes_1.StatusCodes.OK).json({ jobs, count: jobs.length });
});
exports.getAllJobs = getAllJobs;
const getJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId;
    if (!userId) {
        throw new bad_request_1.BadRequestError("User not authenticated");
    }
    const jobId = req.params.id;
    const job = yield Job_1.default.findOne({
        _id: jobId,
        createdBy: userId,
    });
    if (!job) {
        throw new not_found_1.NotFoundError(`No job with id ${jobId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ job });
});
exports.getJob = getJob;
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    req.body.createdBy = (_c = req.user) === null || _c === void 0 ? void 0 : _c.userId;
    const job = yield Job_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ job });
});
exports.createJob = createJob;
const updateJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.userId;
    if (!userId) {
        throw new bad_request_1.BadRequestError("User not authenticated");
    }
    const jobId = req.params.id;
    const { company, position } = req.body;
    if (company === "" || position === "") {
        throw new bad_request_1.BadRequestError("Company or Position fields cannot be empty");
    }
    const job = yield Job_1.default.findOneAndUpdate({ _id: jobId, createdBy: userId }, req.body, { new: true, runValidators: true });
    if (!job) {
        throw new not_found_1.NotFoundError(`No job with id ${jobId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ job });
});
exports.updateJob = updateJob;
const deleteJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const userId = (_e = req.user) === null || _e === void 0 ? void 0 : _e.userId;
    if (!userId) {
        throw new bad_request_1.BadRequestError("User not authenticated");
    }
    const jobId = req.params.id;
    const job = yield Job_1.default.findByIdAndRemove({
        _id: jobId,
        createdBy: userId,
    });
    if (!job) {
        throw new not_found_1.NotFoundError(`No job with id ${jobId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).send("Job is removed");
});
exports.deleteJob = deleteJob;
