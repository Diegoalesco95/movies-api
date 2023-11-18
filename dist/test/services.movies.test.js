"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const proxyquire_1 = __importDefault(require("proxyquire"));
const mongoLib_1 = require("../utils/mocks/mongoLib");
const movies_1 = require("../utils/mocks/movies");
describe('services - movies', function () {
    const MoviesServices = (0, proxyquire_1.default)('../services/movies', {
        '../lib/mongo': mongoLib_1.MongoLibMock,
    });
    const moviesService = new MoviesServices();
    describe('when getMovies method is called', function () {
        return __awaiter(this, void 0, void 0, function* () {
            it('should call the getAll MongoLib method', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield moviesService.getMovies({});
                    assert_1.default.strictEqual(mongoLib_1.getAllStub.called, true);
                });
            });
            it('should return an array of movies', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const result = yield moviesService.getMovies({});
                    const expected = movies_1.moviesMock;
                    assert_1.default.deepEqual(result, expected);
                });
            });
        });
    });
});
