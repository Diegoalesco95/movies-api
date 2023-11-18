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
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const joi_1 = __importDefault(require("@hapi/joi"));
const boom_1 = __importDefault(require("@hapi/boom"));
// @scripts
const movies_1 = __importDefault(require("../services/movies"));
const userMovies_1 = __importDefault(require("../services/userMovies"));
const validationHandler_1 = __importDefault(require("../utils/middleware/validationHandler"));
const scopesValidationHandler_1 = __importDefault(require("../utils/middleware/scopesValidationHandler"));
const movies_2 = require("../utils/schemas/movies");
const userMovies_2 = require("../utils/schemas/userMovies");
// JWT strategy
require('../utils/auth/strategies/jwt');
function userMoviesApi(app) {
    const router = express_1.default.Router();
    app.use('/api/user-movies', router);
    const userMoviesService = new userMovies_1.default();
    const moviesService = new movies_1.default();
    router.get('/', passport_1.default.authenticate('jwt', { session: false }), (0, scopesValidationHandler_1.default)(['read:user-movies']), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const _id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id.toString();
        try {
            if (!_id) {
                throw boom_1.default.badData('The data sent is wrong');
            }
            const userMovies = yield userMoviesService.getUserMovies(_id);
            if (userMovies.length > 0) {
                res.status(200).json({
                    data: {
                        userMovies,
                    },
                    message: 'User Movies Found Successfully',
                });
            }
            else {
                res.status(200).json({
                    data: {
                        userMovies,
                    },
                    message: 'The user does not have movies',
                });
            }
        }
        catch (error) {
            next(error);
        }
    }));
    router.post('/', passport_1.default.authenticate('jwt', { session: false }), (0, scopesValidationHandler_1.default)(['create:user-movies']), (0, validationHandler_1.default)(userMovies_2.createUserMovieSchema), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const { userId, movieId } = req.body;
        try {
            if (!userId && !movieId) {
                throw boom_1.default.badData('The data sent is wrong');
            }
            const movie = yield moviesService.getMovie(movieId);
            if (!movie) {
                throw boom_1.default.badData('The data sent is wrong');
            }
            const userMovies = yield userMoviesService.getUserMovies(userId);
            const userMovieAlreadyExist = userMovies.find((userMovie) => userMovie.movieId === movieId);
            if (userMovieAlreadyExist) {
                throw boom_1.default.badData('The movie already exists in the user');
            }
            const createdUserMovieId = yield userMoviesService.createUserMovie(userId, movieId);
            res.status(201).json({
                data: { userMovie: { _id: createdUserMovieId, userId, movieId } },
                message: 'The movie was successfully added to the user',
            });
        }
        catch (error) {
            next(error);
        }
    }));
    router.delete('/:userMovieId', passport_1.default.authenticate('jwt', { session: false }), (0, scopesValidationHandler_1.default)(['delete:user-movies']), (0, validationHandler_1.default)(joi_1.default.object({ userMovieId: movies_2.movieIdSchema }), 'params'), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const { userMovieId } = req.params;
        try {
            const deletedUserMovieId = yield userMoviesService.deleteUserMovie(userMovieId);
            if (deletedUserMovieId) {
                res.status(200).json({
                    data: { deletedUserMovieId },
                    message: 'Movie was successfully removed from user',
                });
            }
            else {
                throw boom_1.default.badData('No movie was found with that ID');
            }
        }
        catch (error) {
            next(error);
        }
    }));
}
exports.default = userMoviesApi;
