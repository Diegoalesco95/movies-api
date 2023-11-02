// @packages
import { ObjectId } from 'mongodb';

type TMovie = {
  _id: ObjectId;
  contentRating: string;
  cover: string;
  description: string;
  duration: number;
  source: string;
  tag: Array<string>;
  title: string;
  year: number;
};
export default class Movie {
  public _id;
  public contentRating;
  public cover;
  public description;
  public duration;
  public source;
  public tag;
  public title;
  public year;
  constructor(movie?: TMovie) {
    if (movie) {
      this._id = movie._id;
      this.contentRating = movie.contentRating;
      this.cover = movie.cover;
      this.description = movie.description;
      this.duration = movie.duration;
      this.source = movie.source;
      this.tag = movie.tag;
      this.title = movie.title;
      this.year = movie.year;
    }
  }
}

export const formatMovies = (movies: TMovie[]) => {
  return movies.map((movie) => new Movie(movie));
};
