// DEBUG=app:* node scripts/mongo/seedMovies.js

import { green, red } from 'chalk';
const debug = require('debug')('app:scripts:genres');
import MongoLib from '@lib/mongo';
import { genresMock } from 'src/utils/mocks/genres';

async function seedGenres() {
  try {
    const mongoDB = new MongoLib();

    const promises = genresMock.map(async (genre) => {
      await mongoDB.create('genres', genre);
    });

    await Promise.all(promises);
    debug(green(`${promises.length} genres have been created succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(red(error));
    process.exit(1);
  }
}

seedGenres();
