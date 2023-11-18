"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatUserMovies = void 0;
class UserMovie {
    constructor(userMovie) {
        if (userMovie) {
            this._id = userMovie._id;
            this.userId = userMovie.userId;
            this.movieId = userMovie.movieId;
        }
    }
}
exports.default = UserMovie;
const formatUserMovies = (userMovies) => {
    return userMovies.map((userMovie) => new UserMovie(userMovie));
};
exports.formatUserMovies = formatUserMovies;
