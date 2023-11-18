"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatGenres = void 0;
class Genre {
    constructor(genre) {
        if (genre) {
            this._id = genre._id;
            this.id = genre.id;
            this.name = genre.name;
        }
    }
}
exports.default = Genre;
const formatGenres = (genres) => {
    return genres.map((genre) => new Genre(genre));
};
exports.formatGenres = formatGenres;
