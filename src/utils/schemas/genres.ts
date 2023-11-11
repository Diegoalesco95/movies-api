// @packages
import joi from '@hapi/joi';

export const genreIdSchema = joi.string().min(1) || joi.string().regex(/^[0-9a-fA-F]{24}$/);
export const genreIdentifierSchema = joi.number().min(1);
export const genreNameSchema = joi.string().max(80);

export const createGenreSchema = joi.object({
  id: genreIdentifierSchema.required(),
  name: genreNameSchema.required(),
});

export const updateGenreSchema = joi.object({
  id: genreIdentifierSchema,
  name: genreNameSchema,
});
