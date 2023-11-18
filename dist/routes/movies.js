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
const movies_1 = require("../utils/schemas/movies");
const validationHandler_1 = __importDefault(require("../utils/middleware/validationHandler"));
const scopesValidationHandler_1 = __importDefault(require("../utils/middleware/scopesValidationHandler"));
const cacheResponse_1 = __importDefault(require("../utils/cacheResponse"));
const time_1 = require("../utils/time");
const movies_2 = __importDefault(require("../services/movies"));
const genres_1 = __importDefault(require("../services/genres"));
const mongodb_1 = require("mongodb");
// JWT strategy
require('../utils/auth/strategies/jwt');
function moviesApi(app) {
    const router = express_1.default.Router();
    const moviesService = new movies_2.default();
    const genreService = new genres_1.default();
    app.use('/api/movies', router);
    router.get('/', passport_1.default.authenticate('jwt', { session: false }), (0, scopesValidationHandler_1.default)(['read:movies']), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        (0, cacheResponse_1.default)(res, time_1.FIVE_MINUTES_IN_SECONDS);
        const genre = (_a = req.query) === null || _a === void 0 ? void 0 : _a.genre;
        try {
            let genreFound = null;
            if (genre) {
                genreFound = yield genreService.getGenreById(mongodb_1.ObjectId.isValid(genre) ? { _id: new mongodb_1.ObjectId() } : { id: parseInt(genre) });
                if (!genreFound) {
                    genreFound = yield genreService.getGenreByQuery({ name: genre });
                }
                if (!genreFound) {
                    throw boom_1.default.notFound('The genre you are looking for does not exist');
                }
            }
            const movies = (yield moviesService.getMovies(genreFound === null || genreFound === void 0 ? void 0 : genreFound.id));
            // throw new Error('Error getting movies'); // (Testing purposes)
            res.status(200).json({
                data: { movies },
                message: 'Movies listed successfully',
            });
        }
        catch (err) {
            next(err);
        }
    }));
    router.get('/:movieId', passport_1.default.authenticate('jwt', { session: false }), (0, scopesValidationHandler_1.default)(['read:movies']), (0, validationHandler_1.default)(joi_1.default.object({ movieId: movies_1.movieIdSchema }), 'params'), function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, cacheResponse_1.default)(res, time_1.SIXTY_MINUTES_IN_SECONDS);
            const { movieId } = req.params;
            try {
                const movie = yield moviesService.getMovie(movieId);
                if (movie) {
                    res.status(200).json({
                        data: { movie },
                        message: 'The movie was found correctly',
                    });
                }
                else {
                    throw boom_1.default.notFound('The movie you are looking for does not exist');
                }
            }
            catch (err) {
                next(err);
            }
        });
    });
    router.post('/', passport_1.default.authenticate('jwt', { session: false }), (0, scopesValidationHandler_1.default)(['create:movies']), (0, validationHandler_1.default)(movies_1.createMovieSchema), function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body: movie } = req;
            try {
                const newMovieId = yield moviesService.createMovie(movie);
                res.status(201).json({
                    data: { newMovieId },
                    message: 'Successfully created movie',
                });
            }
            catch (err) {
                next(err);
            }
        });
    });
    router.put('/:movieId', passport_1.default.authenticate('jwt', { session: false }), (0, scopesValidationHandler_1.default)(['update:movies']), (0, validationHandler_1.default)(joi_1.default.object({ movieId: movies_1.movieIdSchema }), 'params'), (0, validationHandler_1.default)(movies_1.updateMovieSchema), function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body: movie } = req;
            const { movieId } = req.params;
            try {
                const updatedMovieId = yield moviesService.updateMovie(movieId, movie);
                if (updatedMovieId) {
                    res.status(200).json({
                        data: {
                            updatedMovieId,
                        },
                        message: 'Successfully updated movie',
                    });
                }
                else {
                    throw boom_1.default.badData('Something was wrong with the data');
                }
            }
            catch (err) {
                next(err);
            }
        });
    });
    router.delete('/:movieId', passport_1.default.authenticate('jwt', { session: false }), (0, scopesValidationHandler_1.default)(['delete:movies']), (0, validationHandler_1.default)(joi_1.default.object({ movieId: movies_1.movieIdSchema }), 'params'), function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { movieId } = req.params;
            try {
                const deletedMovieId = yield moviesService.deleteMovie({ movieId });
                if (deletedMovieId) {
                    res.status(200).json({
                        data: { deletedMovieId },
                        message: 'Successfully deleted movie',
                    });
                }
                else {
                    throw boom_1.default.badData('Something was wrong with the data');
                }
            }
            catch (err) {
                next(err);
            }
        });
    });
}
exports.default = moviesApi;
