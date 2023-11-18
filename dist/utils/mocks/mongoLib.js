"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoLibMock = exports.createStub = exports.getAllStub = void 0;
const sinon_1 = __importDefault(require("sinon"));
const movies_1 = require("./movies");
const getAllStub = sinon_1.default.stub();
exports.getAllStub = getAllStub;
getAllStub.withArgs('movies').resolves(movies_1.moviesMock);
const tagQuery = { tags: { $in: ['Drama'] } };
getAllStub.withArgs('movies', tagQuery).resolves((0, movies_1.filteredMoviesMock)(28));
const createStub = sinon_1.default.stub().resolves(movies_1.moviesMock[0].id);
exports.createStub = createStub;
class MongoLibMock {
    getAll(collection, query) {
        return getAllStub(collection, query);
    }
    create(collection, data) {
        return createStub(collection, data);
    }
}
exports.MongoLibMock = MongoLibMock;
