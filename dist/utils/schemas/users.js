"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProviderUserSchema = exports.createUserSchema = exports.userIdSchema = void 0;
// @packages
const joi_1 = __importDefault(require("@hapi/joi"));
exports.userIdSchema = joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/);
const userSchema = {
    name: joi_1.default.string().max(100).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
};
exports.createUserSchema = joi_1.default.object(Object.assign(Object.assign({}, userSchema), { isAdmin: joi_1.default.boolean() }));
exports.createProviderUserSchema = joi_1.default.object(Object.assign(Object.assign({}, userSchema), { apiKeyToken: joi_1.default.string().required() }));
