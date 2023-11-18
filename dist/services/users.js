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
const bcrypt_1 = __importDefault(require("bcrypt"));
// @scripts
const mongo_1 = __importDefault(require("src/lib/mongo"));
const user_1 = __importDefault(require("src/models/user"));
class UserService {
    constructor() {
        this.collection = 'users';
        this.mongoDB = new mongo_1.default();
    }
    getUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user] = yield this.mongoDB.getAll(this.collection, { email });
            if (user) {
                return new user_1.default(user);
            }
            return new user_1.default();
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password } = user;
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = user.updatePassword(hashedPassword);
            const newUserId = yield this.mongoDB.create(this.collection, newUser);
            return newUserId;
        });
    }
    verifyUserExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user] = (yield this.mongoDB.getAll(this.collection, { email }));
            return !!user;
        });
    }
    getOrCreateuser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const queriedUser = yield this.getUser(user === null || user === void 0 ? void 0 : user.email);
            if (queriedUser) {
                return queriedUser;
            }
            yield this.createUser(user);
            const newUser = yield this.getUser(user === null || user === void 0 ? void 0 : user.email);
            return newUser;
        });
    }
}
exports.default = UserService;
