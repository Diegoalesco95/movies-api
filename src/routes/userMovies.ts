// @packages
import express, { Express } from 'express';
import passport from 'passport';
import joi from '@hapi/joi';
import boom from '@hapi/boom';
// @scripts
import MoviesService from '@services/movies';
import UserMoviesService from '@services/userMovies';
import validationHandler from '@utils/middleware/validationHandler';
import scopesValidationHandler from '@utils/middleware/scopesValidationHandler';
import { movieIdSchema } from '@utils/schemas/movies';
import { userIdSchema } from '@utils/schemas/users';
import { createUserMovieSchema } from '@utils/schemas/userMovies';

// JWT strategy
require('../utils/auth/strategies/jwt');

function userMoviesApi(app: Express) {
  const router = express.Router();
  app.use('/api/user-movies', router);

  const userMoviesService = new UserMoviesService();
  const moviesService = new MoviesService();

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:user-movies']),
    validationHandler(joi.object({ userId: userIdSchema }), 'query'),
    async (req, res, next) => {
      const userId = req.body.userId as string;

      try {
        if (!userId) {
          throw boom.badData('The data sent is wrong');
        }

        const userMovies = await userMoviesService.getUserMovies(userId);

        if (userMovies.length > 0) {
          res.status(200).json({
            data: {
              userId,
              userMovies,
            },
            message: 'User Movies Found Successfully',
          });
        } else {
          res.status(200).json({
            data: {
              userId,
              userMovies,
            },
            message: 'The user does not have movies',
          });
        }
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:user-movies']),
    validationHandler(createUserMovieSchema),
    async (req, res, next) => {
      const { userId, movieId } = req.body;

      try {
        if (!userId && !movieId) {
          throw boom.badData('The data sent is wrong');
        }
        const movie = await moviesService.getMovie(movieId);
        if (!movie) {
          throw boom.badData('The data sent is wrong');
        }
        const userMovies = await userMoviesService.getUserMovies(userId);
        const userMovieAlreadyExist = userMovies.find((userMovie) => userMovie.movieId === movieId);
        if (userMovieAlreadyExist) {
          throw boom.badData('The movie already exists in the user');
        }

        const createdUserMovieId = await userMoviesService.createUserMovie(userId, movieId);
        res.status(201).json({
          data: { createdUserMovieId },
          message: 'The movie was successfully added to the user',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:userMovieId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:user-movies']),
    validationHandler(joi.object({ userMovieId: movieIdSchema }), 'params'),
    async (req, res, next) => {
      const { userMovieId } = req.params;

      try {
        const deletedUserMovieId = await userMoviesService.deleteUserMovie(userMovieId);

        if (deletedUserMovieId) {
          res.status(200).json({
            data: { deletedUserMovieId },
            message: 'Movie was successfully removed from user',
          });
        } else {
          throw boom.badData('No movie was found with that ID');
        }
      } catch (error) {
        next(error);
      }
    }
  );
}

export default userMoviesApi;
