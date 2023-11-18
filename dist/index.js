"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @packages
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
// @scripts
const config_1 = __importDefault(require("src/config"));
const errorHandlers_1 = require("src/utils/middleware/errorHandlers");
const notFoundHandler_1 = __importDefault(require("src/utils/middleware/notFoundHandler"));
// src/routes
const auth_1 = __importDefault(require("src/routes/auth"));
const movies_1 = __importDefault(require("src/routes/movies"));
const genres_1 = __importDefault(require("src/routes/genres"));
const userMovies_1 = __importDefault(require("src/routes/userMovies"));
const app = (0, express_1.default)();
// Cors
app.use((0, cors_1.default)());
// Body Parser
app.use(express_1.default.json());
// Helmet
app.use((0, helmet_1.default)());
// Routes
(0, auth_1.default)(app);
(0, genres_1.default)(app);
(0, movies_1.default)(app);
(0, userMovies_1.default)(app);
// Catch 404
app.use(notFoundHandler_1.default);
// Errors middleware
app.use(errorHandlers_1.logErrors);
app.use(errorHandlers_1.wrapErrors);
app.use(errorHandlers_1.errorHandler);
app.listen(config_1.default.port, () => {
    console.log(`[⚙️ Listening at: http://localhost:${config_1.default.port}]`);
});
exports.default = app;
