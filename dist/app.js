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
const express_1 = __importDefault(require("express"));
require("dotenv/config");
require("express-async-errors");
const xss_clean_1 = __importDefault(require("xss-clean"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const auth_1 = __importDefault(require("./api/routes/auth"));
const jobs_1 = __importDefault(require("./api/routes/jobs"));
const connect_1 = require("./api/db/connect");
const not_found_1 = require("./api/middleware/not-found");
const error_handler_1 = require("./api/middleware/error-handler");
const authentication_1 = require("./api/middleware/authentication");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
//middlewares & extra security packages
app.set("trust proxy", 1);
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
}));
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, xss_clean_1.default)());
//Swagger
const swaggerDocument = yamljs_1.default.load("./swagger.yaml");
app.get("/", (req, res) => {
    res.send("<h1>jobs API</h1><a href='/api-docs'>Documentation</a>");
});
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// routes
app.use("/api/v1/auth", auth_1.default);
app.use("/api/v1/jobs", authentication_1.auth, jobs_1.default);
// error handler
app.use(not_found_1.notFound);
app.use(error_handler_1.errorHandlerMiddleware);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_1.connectDB)(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    }
    catch (error) {
        console.log(error);
    }
});
start();
