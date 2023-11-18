import assert from 'assert';
import proxyquire from 'proxyquire';

import { MongoLibMock, getAllStub } from '@/utils/mocks/mongoLib';
import { moviesMock } from '@/utils/mocks/movies';

describe('services - movies', function () {
  const MoviesServices = proxyquire('../services/movies', {
    '../lib/mongo': MongoLibMock,
  });

  const moviesService = new MoviesServices();

  describe('when getMovies method is called', async function () {
    it('should call the getAll MongoLib method', async function () {
      await moviesService.getMovies({});
      assert.strictEqual(getAllStub.called, true);
    });

    it('should return an array of movies', async function () {
      const result = await moviesService.getMovies({});
      const expected = moviesMock;
      assert.deepEqual(result, expected);
    });
  });
});
