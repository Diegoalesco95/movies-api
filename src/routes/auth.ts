// @packages
import boom from '@hapi/boom';
import express, { Express } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
// @scripts
import config from '@config/index';
import ApiKeysService from '@services/apiKeys';
import UsersService from '@services/users';
import validationHandler from '@utils/middleware/validationHandler';
import { createUserSchema, createProviderUserSchema } from '@utils/schemas/users';
import User from '@models/user';

// Basic Strategy
require('@utils/auth/strategies/basic');

const AUTH_JWT_SECRET = config.authJwtSecret as string;

function authApi(app: Express) {
  const router = express.Router();
  app.use('/api/auth', router);

  const apiKeysService = new ApiKeysService();
  const usersService = new UsersService();

  router.post('/sign-in', async (req, res, next) => {
    const apiKeyToken = req.headers['x-api-key'] as string;
    const rememberLogin = req.body?.rememberMe ? '15d' : '60m';

    if (!apiKeyToken) {
      next(boom.unauthorized('Token is required'));
    }

    passport.authenticate('basic', (error: Error, user: User) => {
      try {
        if (error || !user) {
          throw boom.unauthorized('Please provide a correct email and password');
        }

        req.login(user, { session: false }, async (error) => {
          try {
            if (error) {
              throw error;
            }

            const apiKey = await apiKeysService.getApiKey(apiKeyToken);

            if (!apiKey?._id) {
              throw boom.unauthorized('Invalid Token');
            }

            const { _id: id, name, email } = user;

            const jwtPayload = {
              sub: id,
              name,
              email,
              scopes: apiKey.scopes,
            };

            const token = jwt.sign(jwtPayload, AUTH_JWT_SECRET, {
              expiresIn: rememberLogin,
            });

            return res.status(200).json({
              data: { token, user: { id, name, email } },
              message: 'Successful login',
              statusCode: 200,
            });
          } catch (error) {
            next(error);
          }
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.post('/sign-up', validationHandler(createUserSchema), async (req, res, next) => {
    const newUser = new User(req.body);

    try {
      const userExists = await usersService.verifyUserExists(newUser.email);
      if (userExists) {
        throw boom.conflict('Email already exist');
      }

      const createdUserId = await usersService.createUser(newUser);

      if (!createdUserId) {
        throw boom.badImplementation('Error creating user');
      }

      res.status(201).json({
        message: 'Successfully created user',
        statusCode: 201,
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/sign-provider', validationHandler(createProviderUserSchema), async (req, res, next) => {
    const { body } = req;

    const { apiKeyToken, ...user } = body;

    if (!apiKeyToken) {
      next(boom.unauthorized('apiKeyToken is required'));
    }

    try {
      const queriedUser = await usersService.getOrCreateuser(user);
      const apiKey = await apiKeysService.getApiKey(apiKeyToken);
      if (!apiKey) {
        next(boom.unauthorized());
      }
      const { _id: id, name, email } = queriedUser;

      const payload = {
        sub: id,
        name,
        email,
        scopes: apiKey.scopes,
      };

      const token = jwt.sign(payload, AUTH_JWT_SECRET, {
        expiresIn: '15m',
      });

      return res.status(200).json({ token, user: { id, name, email } });
    } catch (error) {
      next(error);
    }
  });
}

export default authApi;
