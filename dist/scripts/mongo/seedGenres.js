"use strict";
// DEBUG=app:* node scripts/mongo/seedMovies.js
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
const chalk_1 = require("chalk");
const debug = require('debug')('app:scripts:genres');
const mongo_1 = __importDefault(require("src/lib/mongo"));
const genres_1 = require("src/utils/mocks/genres");
function seedGenres() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mongoDB = new mongo_1.default();
            const promises = genres_1.genresMock.map((genre) => __awaiter(this, void 0, void 0, function* () {
                yield mongoDB.create('genres', genre);
            }));
            yield Promise.all(promises);
            debug((0, chalk_1.green)(`${promises.length} genres have been created succesfully`)); // prettier-ignore
            return process.exit(0);
        }
        catch (error) {
            debug((0, chalk_1.red)(error));
            process.exit(1);
        }
    });
}
seedGenres();
