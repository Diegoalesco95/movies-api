// @packages
import { ObjectId } from 'mongodb';

export enum OriginalLanguage {
  En = 'en',
  Hi = 'hi',
}
export interface IMovie {
  _id: ObjectId;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: OriginalLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default class Movie {
  public _id;
  public adult;
  public backdrop_path;
  public genre_ids;
  public id;
  public original_language;
  public original_title;
  public overview;
  public popularity;
  public poster_path;
  public release_date;
  public title;
  public video;
  public vote_average;
  public vote_count;
  constructor(movie?: IMovie) {
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

export const formatMovies = (movies: IMovie[]) => {
  return movies.map((movie) => new Movie(movie));
};
