"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserMovieSchema = exports.userMovieIdSchema = void 0;
// @packages
const joi_1 = __importDefault(require("@hapi/joi"));
const movies_1 = require("./movies");
const users_1 = require("./users");
exports.userMovieIdSchema = joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/);
exports.createUserMovieSchema = joi_1.default.object({
    userId: users_1.userIdSchema.required(),
    movieId: movies_1.movieIdSchema.required(),
});
