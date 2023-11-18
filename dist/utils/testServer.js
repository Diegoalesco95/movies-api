"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
function testServer(route) {
    const app = (0, express_1.default)();
    route(app);
    return (0, supertest_1.default)(app);
}
exports.default = testServer;
