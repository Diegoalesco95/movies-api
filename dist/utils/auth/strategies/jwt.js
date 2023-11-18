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
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const boom_1 = __importDefault(require("@hapi/boom"));
// @scripts
const config_1 = __importDefault(require("../../../config"));
const users_1 = __importDefault(require("../../../services/users"));
passport_1.default.use(new passport_jwt_1.Strategy({
    secretOrKey: config_1.default.authJwtSecret,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
}, (tokenPayload, cb) => __awaiter(void 0, void 0, void 0, function* () {
    const usersService = new users_1.default();
    try {
        const user = yield usersService.getUser(tokenPayload.email);
        if (!user) {
            return cb(boom_1.default.unauthorized('☠️ Unauthorized'), false);
        }
        user.deletePassWord();
        cb(null, Object.assign(Object.assign({}, user), { scopes: tokenPayload.scopes }));
    }
    catch (error) {
        return cb(error);
    }
})));
