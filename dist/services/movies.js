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
const mongodb_1 = require("mongodb");
// @scripts
const mongo_1 = __importDefault(require("../lib/mongo"));
const movies_1 = __importStar(require("../models/movies"));
class MoviesService {
    constructor() {
        this.collection = 'movies';
        this.mongoDB = new mongo_1.default();
    }
    getMovies(genre_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = genre_id ? { genre_ids: { $in: [genre_id] } } : {};
            const movies = yield this.mongoDB.getAll(this.collection, query);
            if (movies) {
                return (0, movies_1.formatMovies)(movies);
            }
            return [];
        });
    }
    getMovie(movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            const movie = yield this.mongoDB.get(this.collection, { _id: new mongodb_1.ObjectId(movieId) });
            if (movie) {
                return new movies_1.default(movie);
            }
            return null;
        });
    }
    createMovie(movie) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdMovieId = yield this.mongoDB.create(this.collection, movie);
            return createdMovieId;
        });
    }
    updateMovie(movieId, movie) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedMovieId = yield this.mongoDB.update(this.collection, movieId, movie);
            return updatedMovieId;
        });
    }
    deleteMovie({ movieId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedMovieId = yield this.mongoDB.delete(this.collection, movieId);
            return deletedMovieId;
        });
    }
}
exports.default = MoviesService;
