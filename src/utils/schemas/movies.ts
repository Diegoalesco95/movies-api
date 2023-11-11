// @packages
import joi from '@hapi/joi';

export const movieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const adult = joi.boolean();
const backdrop_path = joi.string();
const genre_ids = joi.array().items(joi.number().min(1));
const id = joi.number().min(1);
const original_language = joi.string().max(2);
const original_title = joi.string().max(80);
const overview = joi.string().max(1000);
const popularity = joi.number().min(0);
const poster_path = joi.string().max(80);
const release_date = joi.date().iso();
const title = joi.string().max(80);
const video = joi.boolean();
const vote_average = joi.number().min(0);
const vote_count = joi.number().min(0);

export const createMovieSchema = joi.object({
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

export const updateMovieSchema = joi.object({
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
