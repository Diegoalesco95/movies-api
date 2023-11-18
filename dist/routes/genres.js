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
const mongodb_1 = require("mongodb");
const boom_1 = __importDefault(require("@hapi/boom"));
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("@hapi/joi"));
const passport_1 = __importDefault(require("passport"));
// @scripts
const time_1 = require("../utils/time");
const genres_1 = require("../utils/schemas/genres");
const cacheResponse_1 = __importDefault(require("../utils/cacheResponse"));
const genres_2 = __importDefault(require("../services/genres"));
const scopesValidationHandler_1 = __importDefault(require("../utils/middleware/scopesValidationHandler"));
const validationHandler_1 = __importDefault(require("../utils/middleware/validationHandler"));
// JWT strategy
require('../utils/auth/strategies/jwt');
function genresApi(app) {
    const router = express_1.default.Router();
    const genresService = new genres_2.default();
    app.use('/api/genres', router);
    router.get('/', passport_1.default.authenticate('jwt', { session: false }), (0, scopesValidationHandler_1.default)(['read:genres']), (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
        (0, cacheResponse_1.default)(res, time_1.FIVE_MINUTES_IN_SECONDS);
        try {
            const genres = (yield genresService.getGenres());
            // throw new Error('Error getting genres'); // (Testing purposes)
            res.status(200).json({
                data: { genres },
                message: 'Genres listed successfully',
            });
        }
        catch (err) {
            next(err);
        }
    }));
    router.get('/:genreId', passport_1.default.authenticate('jwt', { session: false }), (0, scopesValidationHandler_1.default)(['read:genres']), (0, validationHandler_1.default)(joi_1.default.object({ genreId: genres_1.genreIdSchema }), 'params'), function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, cacheResponse_1.default)(res, time_1.SIXTY_MINUTES_IN_SECONDS);
            const { genreId } = req.params;
            //Validate if the genreId is a valid ObjectId
            try {
                const genre = yield genresService.getGenreById(mongodb_1.ObjectId.isValid(genreId) ? { _id: new mongodb_1.ObjectId(genreId) } : { id: parseInt(genreId) });
                if (genre) {
                    res.status(200).json({
                        data: { genre },
                        message: 'The genre was found correctly',
                    });
                }
                else {
                    throw boom_1.default.notFound('The genre you are looking for does not exist');
                }
            }
            catch (err) {
                next(err);
            }
        });
    });
    router.get('/name/:name', passport_1.default.authenticate('jwt', { session: false }), (0, scopesValidationHandler_1.default)(['read:genres']), (0, validationHandler_1.default)(joi_1.default.object({ name: genres_1.genreNameSchema }), 'params'), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        (0, cacheResponse_1.default)(res, time_1.FIVE_MINUTES_IN_SECONDS);
        const { name } = req.params;
        try {
            const genre = yield genresService.getGenreByQuery({ name });
            if (genre) {
                res.status(200).json({
                    data: { genre },
                    message: 'Genre listed successfully',
                });
            }
            else {
                throw boom_1.default.notFound('The genre you are looking for does not exist');
            }
        }
        catch (err) {
            next(err);
        }
    }));
    router.post('/', passport_1.default.authenticate('jwt', { session: false }), (0, scopesValidationHandler_1.default)(['create:genres']), (0, validationHandler_1.default)(genres_1.createGenreSchema), function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body: genre } = req;
            try {
                const newGenreId = yield genresService.createGenre(genre);
                res.status(201).json({
                    data: { newGenreId },
                    message: 'Successfully created genre',
                });
            }
            catch (err) {
                next(err);
            }
        });
    });
    router.put('/:genreId', passport_1.default.authenticate('jwt', { session: false }), (0, scopesValidationHandler_1.default)(['update:genres']), (0, validationHandler_1.default)(joi_1.default.object({ genreId: genres_1.genreIdSchema }), 'params'), (0, validationHandler_1.default)(genres_1.updateGenreSchema), function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body: genre } = req;
            const { genreId } = req.params;
            try {
                const updatedGenreId = yield genresService.updateGenre(genreId, genre);
                if (updatedGenreId) {
                    res.status(200).json({
                        data: {
                            updatedGenreId,
                        },
                        message: 'Successfully updated genre',
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
    router.delete('/:genreId', passport_1.default.authenticate('jwt', { session: false }), (0, scopesValidationHandler_1.default)(['delete:genres']), (0, validationHandler_1.default)(joi_1.default.object({ genreId: genres_1.genreIdSchema }), 'params'), function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { genreId } = req.params;
            try {
                const deletedGenreId = yield genresService.deleteGenre(genreId);
                if (deletedGenreId) {
                    res.status(200).json({
                        data: { deletedGenreId },
                        message: 'Successfully deleted genre',
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
exports.default = genresApi;
