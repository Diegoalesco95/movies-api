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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @packages
const boom_1 = __importDefault(require("@hapi/boom"));
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
// @scripts
const config_1 = __importDefault(require("src/config"));
const apiKeys_1 = __importDefault(require("src/services/apiKeys"));
const users_1 = __importDefault(require("src/services/users"));
const validationHandler_1 = __importDefault(require("src/utils/middleware/validationHandler"));
const users_2 = require("src/utils/schemas/users");
const user_1 = __importDefault(require("src/models/user"));
// Basic Strategy
require('src/utils/auth/strategies/basic');
const AUTH_JWT_SECRET = config_1.default.authJwtSecret;
function authApi(app) {
    const router = express_1.default.Router();
    app.use('/api/auth', router);
    const apiKeysService = new apiKeys_1.default();
    const usersService = new users_1.default();
    router.post('/sign-in', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const apiKeyToken = req.headers['x-api-key'];
        const rememberLogin = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.rememberMe) ? '15d' : '60m';
        if (!apiKeyToken) {
            next(boom_1.default.unauthorized('Token is required'));
        }
        passport_1.default.authenticate('basic', (error, user) => {
            try {
                if (error || !user) {
                    throw boom_1.default.unauthorized('Please provide a correct email and password');
                }
                req.login(user, { session: false }, (error) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        if (error) {
                            throw error;
                        }
                        const apiKey = yield apiKeysService.getApiKey(apiKeyToken);
                        if (!(apiKey === null || apiKey === void 0 ? void 0 : apiKey._id)) {
                            throw boom_1.default.unauthorized('Invalid Token');
                        }
                        const { _id: id, name, email } = user;
                        const jwtPayload = {
                            sub: id,
                            name,
                            email,
                            scopes: apiKey.scopes,
                        };
                        const token = jsonwebtoken_1.default.sign(jwtPayload, AUTH_JWT_SECRET, {
                            expiresIn: rememberLogin,
                        });
                        return res.status(200).json({
                            data: { token, user: { id, name, email } },
                            message: 'Successful login',
                            statusCode: 200,
                        });
                    }
                    catch (error) {
                        next(error);
                    }
                }));
            }
            catch (error) {
                next(error);
            }
        })(req, res, next);
    }));
    router.post('/sign-up', (0, validationHandler_1.default)(users_2.createUserSchema), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const newUser = new user_1.default(req.body);
        try {
            const userExists = yield usersService.verifyUserExists(newUser.email);
            if (userExists) {
                throw boom_1.default.conflict('Email already exist');
            }
            const createdUserId = yield usersService.createUser(newUser);
            if (!createdUserId) {
                throw boom_1.default.badImplementation('Error creating user');
            }
            res.status(201).json({
                message: 'Successfully created user',
                statusCode: 201,
            });
        }
        catch (error) {
            next(error);
        }
    }));
    router.post('/sign-provider', (0, validationHandler_1.default)(users_2.createProviderUserSchema), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const { body } = req;
        const { apiKeyToken } = body, user = __rest(body, ["apiKeyToken"]);
        if (!apiKeyToken) {
            next(boom_1.default.unauthorized('apiKeyToken is required'));
        }
        try {
            const queriedUser = yield usersService.getOrCreateuser(user);
            const apiKey = yield apiKeysService.getApiKey(apiKeyToken);
            if (!apiKey) {
                next(boom_1.default.unauthorized());
            }
            const { _id: id, name, email } = queriedUser;
            const payload = {
                sub: id,
                name,
                email,
                scopes: apiKey.scopes,
            };
            const token = jsonwebtoken_1.default.sign(payload, AUTH_JWT_SECRET, {
                expiresIn: '15m',
            });
            return res.status(200).json({ token, user: { id, name, email } });
        }
        catch (error) {
            next(error);
        }
    }));
}
exports.default = authApi;
