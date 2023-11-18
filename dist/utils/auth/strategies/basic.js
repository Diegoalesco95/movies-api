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
// @packages
const passport_http_1 = require("passport-http");
const boom_1 = __importDefault(require("@hapi/boom"));
const passport_1 = __importDefault(require("passport"));
// @scripts
const users_1 = __importDefault(require("src/services/users"));
passport_1.default.use(new passport_http_1.BasicStrategy((email, password, cb) => __awaiter(void 0, void 0, void 0, function* () {
    const userService = new users_1.default();
    try {
        if (!email && !password) {
            return cb(boom_1.default.unauthorized('Unauthorized'), false);
        }
        const user = yield userService.getUser(email);
        if (!user._id) {
            return cb(boom_1.default.unauthorized('Unauthorized'), false);
        }
        // const isCorrectPassword = await bcrypt.compare(password, user.password);
        // if (!isCorrectPassword) {
        //   return cb(boom.unauthorized('Unauthorized'), false);
        // }
        user.deletePassWord();
        return cb(null, user);
    }
    catch (error) {
        return cb(error);
    }
})));
