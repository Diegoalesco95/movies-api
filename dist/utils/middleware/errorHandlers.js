"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.wrapErrors = exports.logErrors = void 0;
const boom_1 = __importStar(require("@hapi/boom"));
// @scripts
const config_1 = __importDefault(require("src/config"));
function withErrorStack(error, stack) {
    if (config_1.default.dev) {
        return Object.assign(Object.assign({}, error), { stack });
    }
    return error;
}
function logErrors(err, _req, _res, next) {
    if (config_1.default.dev) {
        console.log(`[❌ ${err.name}]:`, err.message);
        console.log('[🔎]:', err === null || err === void 0 ? void 0 : err.stack);
    }
    next(err);
}
exports.logErrors = logErrors;
function wrapErrors(err, _req, _res, next) {
    if (!boom_1.default.isBoom(err)) {
        next((0, boom_1.badImplementation)(err));
    }
    next(err);
}
exports.wrapErrors = wrapErrors;
function errorHandler(err, _req, res, next) {
    const { output: { statusCode, payload }, } = err;
    res.status(statusCode);
    res.json(withErrorStack(payload, err.stack));
}
exports.errorHandler = errorHandler;
