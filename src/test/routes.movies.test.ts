import assert from 'assert';
import proxyquire from 'proxyquire';

import { moviesMock, MoviesServiceMock } from 'src/utils/mocks/movies';
import testServer from 'src/utils/testServer';

describe('routes - movies', function () {
  const route = proxyquire('src/routes/movies', {
    'src/services/movies': MoviesServiceMock,
  });
  const request = testServer(route);
  describe('GET /movies', function () {
    it('should respond with status 200', function (done) {
      request.get('/api/movies').expect(200, done);
    });
    it('should respond with the list of movies', function (done) {
      request.get('/api/movies').end((err, res) => {
        assert.deepEqual(res.body, {
          data: moviesMock,
          message: 'movies listed',
        });
        done();
      });
    });
  });
});
