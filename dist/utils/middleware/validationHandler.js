"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = __importDefault(require("@hapi/boom"));
function validate(data, schema) {
    const { error } = schema.validate(data);
    return error;
}
function validationHandler(schema, check = 'body') {
    return function (req, _res, next) {
        const error = validate(req[check], schema);
        error ? next(boom_1.default.badRequest(error)) : next();
    };
}
exports.default = validationHandler;
