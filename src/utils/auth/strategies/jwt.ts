// @packages
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import boom from '@hapi/boom';

// @scripts
import config from '@config/index';
import UsersService from '@services/users';

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (tokenPayload, cb) => {
      const usersService = new UsersService();
      try {
        const user = await usersService.getUser(tokenPayload.email);

        if (!user) {
          return cb(boom.unauthorized('☠️ Unauthorized'), false);
        }
        user.deletePassWord();
        cb(null, { ...user, scopes: tokenPayload.scopes });
      } catch (error) {
        return cb(error);
      }
    }
  )
);
