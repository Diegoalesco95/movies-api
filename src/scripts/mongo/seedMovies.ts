// DEBUG=app:* node scripts/mongo/seedMovies.js

import { green, red } from 'chalk';
const debug = require('debug')('app:scripts:movies');
import MongoLib from '@lib/mongo';
import { moviesMock } from '@utils/mocks/movies';

async function seedMovies() {
  try {
    const mongoDB = new MongoLib();

    const promises = moviesMock.map(async (movie) => {
      await mongoDB.create('movies', movie);
    });

    await Promise.all(promises);
    debug(green(`${promises.length} movies have been created succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(red(error));
    process.exit(1);
  }
}

seedMovies();
