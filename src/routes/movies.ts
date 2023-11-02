// @packages
import express, { Express } from 'express';
import passport from 'passport';
import joi from '@hapi/joi';
import boom from '@hapi/boom';

// @scripts
import { movieIdSchema, createMovieSchema, updateMovieSchema } from '@utils/schemas/movies';
import validationHandler from '@utils/middleware/validationHandler';
import scopesValidationHandler from '@utils/middleware/scopesValidationHandler';
import cacheResponse from '@utils/cacheResponse';
import { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } from '@utils/time';
import MoviesService from '@services/movies';
import Movie from '@models/movies';

// JWT strategy
require('@utils/auth/strategies/jwt');

function moviesApi(app: Express) {
  const router = express.Router();
  const moviesService = new MoviesService();

  app.use('/api/movies', router);

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:movies']),
    async (req, res, next) => {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      const { tag } = req.query;

      try {
        const movies = (await moviesService.getMovies(tag as string)) as Movie[];
        // throw new Error('Error getting movies'); // (Testing purposes)
        res.status(200).json({
          movies,
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    '/:movieId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:movies']),
    validationHandler(joi.object({ movieId: movieIdSchema }), 'params'),
    async function (req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { movieId } = req.params;
      try {
        const movie = await moviesService.getMovie(movieId);
        if (movie) {
          res.status(200).json({
            data: { movie },
            message: 'The movie was found correctly',
          });
        } else {
          throw boom.notFound('The movie you are looking for does not exist');
        }
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:movies']),
    validationHandler(createMovieSchema),
    async function (req, res, next) {
      const { body: movie } = req;
      try {
        const newMovieId = await moviesService.createMovie(movie);
        res.status(201).json({
          data: { newMovieId },
          message: 'Successfully created movie',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    '/:movieId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:movies']),
    validationHandler(joi.object({ movieId: movieIdSchema }), 'params'),
    validationHandler(updateMovieSchema),
    async function (req, res, next) {
      const { body: movie } = req;
      const { movieId } = req.params;
      try {
        const updatedMovieId = await moviesService.updateMovie(movieId, movie);
        if (updatedMovieId) {
          res.status(200).json({
            data: {
              updatedMovieId,
            },
            message: 'Successfully updated movie',
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
    '/:movieId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:movies']),
    validationHandler(joi.object({ movieId: movieIdSchema }), 'params'),
    async function (req, res, next) {
      const { movieId } = req.params;
      try {
        const deletedMovieId = await moviesService.deleteMovie({ movieId });
        if (deletedMovieId) {
          res.status(200).json({
            data: { deletedMovieId },
            message: 'Successfully deleted movie',
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

export default moviesApi;
