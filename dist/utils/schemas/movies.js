"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovieSchema = exports.createMovieSchema = exports.movieIdSchema = void 0;
// @packages
const joi_1 = __importDefault(require("@hapi/joi"));
exports.movieIdSchema = joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/);
const adult = joi_1.default.boolean();
const backdrop_path = joi_1.default.string();
const genre_ids = joi_1.default.array().items(joi_1.default.number().min(1));
const id = joi_1.default.number().min(1);
const original_language = joi_1.default.string().max(2);
const original_title = joi_1.default.string().max(80);
const overview = joi_1.default.string().max(1000);
const popularity = joi_1.default.number().min(0);
const poster_path = joi_1.default.string().max(80);
const release_date = joi_1.default.date().iso();
const title = joi_1.default.string().max(80);
const video = joi_1.default.boolean();
const vote_average = joi_1.default.number().min(0);
const vote_count = joi_1.default.number().min(0);
exports.createMovieSchema = joi_1.default.object({
    adult: adult.required(),
    backdrop_path: backdrop_path.required(),
    genre_ids: genre_ids.required(),
    id: id.required(),
    original_language: original_language.required(),
    original_title: original_title.required(),
    overview: overview.required(),
    popularity: popularity.required(),
    poster_path: poster_path.required(),
    release_date: release_date.required(),
    title: title.required(),
    video: video.required(),
    vote_average: vote_average.required(),
    vote_count: vote_count.required(),
});
exports.updateMovieSchema = joi_1.default.object({
    adult,
    backdrop_path,
    genre_ids,
    id,
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    title,
    video,
    vote_average,
    vote_count,
});
