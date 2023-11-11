import sinon from 'sinon';

import { moviesMock, filteredMoviesMock } from './movies';

const getAllStub = sinon.stub();
getAllStub.withArgs('movies').resolves(moviesMock);

const tagQuery = { tags: { $in: ['Drama'] } };
getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMock(28));

const createStub = sinon.stub().resolves(moviesMock[0].id);

class MongoLibMock {
  getAll(collection: any, query: any) {
    return getAllStub(collection, query);
  }

  create(collection: any, data: any) {
    return createStub(collection, data);
  }
}

export { getAllStub, createStub, MongoLibMock };
