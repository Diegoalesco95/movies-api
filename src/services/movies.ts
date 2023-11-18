// @packages
import { ObjectId } from 'mongodb';
// @scripts
import MongoLib from 'src/lib/mongo';
import Movie, { formatMovies } from 'src/models/movies';

class MoviesService {
  collection: string;
  mongoDB: MongoLib;

  constructor() {
    this.collection = 'movies';
    this.mongoDB = new MongoLib();
  }

  async getMovies(genre_id?: number) {
    const query = genre_id ? { genre_ids: { $in: [genre_id] } } : {};
    const movies = await this.mongoDB.getAll(this.collection, query);

    if (movies) {
      return formatMovies(movies);
    }

    return [];
  }

  async getMovie(movieId: string) {
    const movie = await this.mongoDB.get(this.collection, { _id: new ObjectId(movieId) });
    if (movie) {
      return new Movie(movie);
    }
    return null;
  }

  async createMovie(movie: Movie) {
    const createdMovieId = await this.mongoDB.create(this.collection, movie);
    return createdMovieId as ObjectId;
  }

  async updateMovie(movieId: string, movie: Movie) {
    const updatedMovieId = await this.mongoDB.update(this.collection, movieId, movie);
    return updatedMovieId as ObjectId | null;
  }

  async deleteMovie({ movieId }: any) {
    const deletedMovieId = await this.mongoDB.delete(this.collection, movieId);
    return deletedMovieId as ObjectId | null;
  }
}

export default MoviesService;
