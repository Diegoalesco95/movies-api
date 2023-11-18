"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @scripts
const config_1 = __importDefault(require("src/config"));
function cacheResponse(res, seconds) {
    if (!config_1.default.dev) {
        res.set('Cache-Control', `public, max-age=${seconds}`);
    }
}
exports.default = cacheResponse;
