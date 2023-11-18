"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMovies = exports.OriginalLanguage = void 0;
var OriginalLanguage;
(function (OriginalLanguage) {
    OriginalLanguage["En"] = "en";
    OriginalLanguage["Hi"] = "hi";
})(OriginalLanguage || (exports.OriginalLanguage = OriginalLanguage = {}));
class Movie {
    constructor(movie) {
        if (movie) {
            this._id = movie._id;
            this.adult = movie.adult;
            this.backdrop_path = movie.backdrop_path;
            this.genre_ids = movie.genre_ids;
            this.id = movie.id;
            this.original_language = movie.original_language;
            this.original_title = movie.original_title;
            this.overview = movie.overview;
            this.popularity = movie.popularity;
            this.poster_path = movie.poster_path;
            this.release_date = movie.release_date;
            this.title = movie.title;
            this.video = movie.video;
            this.vote_average = movie.vote_average;
            this.vote_count = movie.vote_count;
        }
    }
}
exports.default = Movie;
const formatMovies = (movies) => {
    return movies.map((movie) => new Movie(movie));
};
exports.formatMovies = formatMovies;
