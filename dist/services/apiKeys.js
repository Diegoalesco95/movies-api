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
const mongo_1 = __importDefault(require("../lib/mongo"));
const apiKeys_1 = __importDefault(require("../models/apiKeys"));
class ApiKeysService {
    constructor() {
        this.collection = 'api-keys';
        this.mongoDB = new mongo_1.default();
    }
    getApiKey(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const [apiKey] = yield this.mongoDB.getAll(this.collection, { token });
            const newApiKey = new apiKeys_1.default(apiKey);
            return newApiKey;
        });
    }
}
exports.default = ApiKeysService;
