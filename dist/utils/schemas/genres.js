"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGenreSchema = exports.createGenreSchema = exports.genreNameSchema = exports.genreIdentifierSchema = exports.genreIdSchema = void 0;
// @packages
const joi_1 = __importDefault(require("@hapi/joi"));
exports.genreIdSchema = joi_1.default.string().min(1) || joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/);
exports.genreIdentifierSchema = joi_1.default.number().min(1);
exports.genreNameSchema = joi_1.default.string().max(80);
exports.createGenreSchema = joi_1.default.object({
    id: exports.genreIdentifierSchema.required(),
    name: exports.genreNameSchema.required(),
});
exports.updateGenreSchema = joi_1.default.object({
    id: exports.genreIdentifierSchema,
    name: exports.genreNameSchema,
});
