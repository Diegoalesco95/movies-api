// @packages
import joi from '@hapi/joi';

export const movieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const movieContentRaitingSchema = joi.string().max(5);
const movieCoverSchema = joi.string().uri();
const movieDescriptionSchema = joi.string().max(300);
const movieDurationSchema = joi.number().min(1).max(300);
const movieSourceSchema = joi.string().uri();
const movieTagSchema = joi.array().items(joi.string().max(50));
const movieTitleSchema = joi.string().max(80);
const movieYearSchema = joi.number().min(1888).max(2077);

export const createMovieSchema = joi.object({
  contentRating: movieContentRaitingSchema.required(),
  cover: movieCoverSchema.required(),
  description: movieDescriptionSchema.required(),
  duration: movieDurationSchema.required(),
  source: movieSourceSchema.required(),
  tag: movieTagSchema,
  title: movieTitleSchema.required(),
  year: movieYearSchema.required(),
});

export const updateMovieSchema = joi.object({
  contentRating: movieContentRaitingSchema,
  cover: movieCoverSchema,
  description: movieDescriptionSchema,
  duration: movieDurationSchema,
  source: movieSourceSchema,
  tag: movieTagSchema,
  title: movieTitleSchema,
  year: movieYearSchema,
});
