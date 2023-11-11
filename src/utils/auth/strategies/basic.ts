// @packages
import { BasicStrategy } from 'passport-http';
import bcrypt from 'bcrypt';
import boom from '@hapi/boom';
import passport from 'passport';
// @scripts
import UsersService from '@services/users';

passport.use(
  new BasicStrategy(async (email, password, cb) => {
    const userService = new UsersService();

    try {
      if (!email && !password) {
        return cb(boom.unauthorized('Unauthorized'), false);
      }

      const user = await userService.getUser(email);

      if (!user._id) {
        return cb(boom.unauthorized('Unauthorized'), false);
      }

      // const isCorrectPassword = await bcrypt.compare(password, user.password);

      // if (!isCorrectPassword) {
      //   return cb(boom.unauthorized('Unauthorized'), false);
      // }

      user.deletePassWord();

      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  })
);
