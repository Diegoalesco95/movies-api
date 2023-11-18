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
// @scripts
const mongo_1 = __importDefault(require("../lib/mongo"));
const userMovies_1 = require("../models/userMovies");
class UserMoviesService {
    constructor() {
        this.collection = 'user-movies';
        this.mongoDB = new mongo_1.default();
    }
    getUserMovies(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userMovies = yield this.mongoDB.getAll(this.collection, { userId });
            return (0, userMovies_1.formatUserMovies)(userMovies);
        });
    }
    createUserMovie(userId, movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdUserMovieId = yield this.mongoDB.create(this.collection, {
                userId,
                movieId,
            });
            return createdUserMovieId;
        });
    }
    deleteUserMovie(userMovieId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedUserMovieId = yield this.mongoDB.delete(this.collection, userMovieId);
            return deletedUserMovieId;
        });
    }
}
exports.default = UserMoviesService;
