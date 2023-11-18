"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = __importDefault(require("@hapi/boom"));
function scopesValidationHandler(allowedScopes) {
    return (req, _res, next) => {
        var _a;
        if (!req.user || (req.user && !((_a = req.user) === null || _a === void 0 ? void 0 : _a.scopes))) {
            next(boom_1.default.unauthorized('Missing scopes'));
        }
        const hasAccess = allowedScopes
            .map((allowedScope) => { var _a, _b; return (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.scopes) === null || _b === void 0 ? void 0 : _b.includes(allowedScope); })
            .find((allowed) => Boolean(allowed));
        if (hasAccess) {
            next();
        }
        else {
            next(boom_1.default.unauthorized('Insufficient scopes'));
        }
    };
}
exports.default = scopesValidationHandler;
