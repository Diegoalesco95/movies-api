"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const proxyquire_1 = __importDefault(require("proxyquire"));
const movies_1 = require("src/utils/mocks/movies");
const testServer_1 = __importDefault(require("src/utils/testServer"));
describe('routes - movies', function () {
    const route = (0, proxyquire_1.default)('src/routes/movies', {
        'src/services/movies': movies_1.MoviesServiceMock,
    });
    const request = (0, testServer_1.default)(route);
    describe('GET /movies', function () {
        it('should respond with status 200', function (done) {
            request.get('/api/movies').expect(200, done);
        });
        it('should respond with the list of movies', function (done) {
            request.get('/api/movies').end((err, res) => {
                assert_1.default.deepEqual(res.body, {
                    data: movies_1.moviesMock,
                    message: 'movies listed',
                });
                done();
            });
        });
    });
});
