// @packages
import { ObjectId } from 'mongodb';
import boom from '@hapi/boom';
import express, { Express } from 'express';
import joi from '@hapi/joi';
import passport from 'passport';

// @scripts
import { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } from '@/utils/time';
import { genreIdSchema, createGenreSchema, updateGenreSchema, genreNameSchema } from '@/utils/schemas/genres';
import cacheResponse from '@/utils/cacheResponse';
import Genre from '@/models/genres';
import GenresService from '@/services/genres';
import scopesValidationHandler from '@/utils/middleware/scopesValidationHandler';
import validationHandler from '@/utils/middleware/validationHandler';

// JWT strategy
require('@/utils/auth/strategies/jwt');

function genresApi(app: Express) {
  const router = express.Router();
  const genresService = new GenresService();

  app.use('/api/genres', router);

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:genres']),
    async (_req, res, next) => {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);

      try {
        const genres = (await genresService.getGenres()) as Genre[];
        // throw new Error('Error getting genres'); // (Testing purposes)
        res.status(200).json({
          data: { genres },
          message: 'Genres listed successfully',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    '/:genreId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:genres']),
    validationHandler(joi.object({ genreId: genreIdSchema }), 'params'),
    async function (req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { genreId } = req.params;

      //Validate if the genreId is a valid ObjectId

      try {
        const genre = await genresService.getGenreById(
          ObjectId.isValid(genreId) ? { _id: new ObjectId(genreId) } : { id: parseInt(genreId) }
        );
        if (genre) {
          res.status(200).json({
            data: { genre },
            message: 'The genre was found correctly',
          });
        } else {
          throw boom.notFound('The genre you are looking for does not exist');
        }
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    '/name/:name',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:genres']),
    validationHandler(joi.object({ name: genreNameSchema }), 'params'),
    async (req, res, next) => {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      const { name } = req.params;

      try {
        const genre = await genresService.getGenreByQuery({ name });
        if (genre) {
          res.status(200).json({
            data: { genre },
            message: 'Genre listed successfully',
          });
        } else {
          throw boom.notFound('The genre you are looking for does not exist');
        }
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:genres']),
    validationHandler(createGenreSchema),
    async function (req, res, next) {
      const { body: genre } = req;
      try {
        const newGenreId = await genresService.createGenre(genre);
        res.status(201).json({
          data: { newGenreId },
          message: 'Successfully created genre',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    '/:genreId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:genres']),
    validationHandler(joi.object({ genreId: genreIdSchema }), 'params'),
    validationHandler(updateGenreSchema),
    async function (req, res, next) {
      const { body: genre } = req;
      const { genreId } = req.params;
      try {
        const updatedGenreId = await genresService.updateGenre(genreId, genre);
        if (updatedGenreId) {
          res.status(200).json({
            data: {
              updatedGenreId,
            },
            message: 'Successfully updated genre',
          });
        } else {
          throw boom.badData('Something was wrong with the data');
        }
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:genreId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:genres']),
    validationHandler(joi.object({ genreId: genreIdSchema }), 'params'),
    async function (req, res, next) {
      const { genreId } = req.params;
      try {
        const deletedGenreId = await genresService.deleteGenre(genreId);
        if (deletedGenreId) {
          res.status(200).json({
            data: { deletedGenreId },
            message: 'Successfully deleted genre',
          });
        } else {
          throw boom.badData('Something was wrong with the data');
        }
      } catch (err) {
        next(err);
      }
    }
  );
}

export default genresApi;
