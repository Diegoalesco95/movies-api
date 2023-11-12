// @packages
import { Document, Filter, ObjectId } from 'mongodb';
// @scripts
import MongoLib from '@lib/mongo';
import Genre, { formatGenres } from 'src/models/genres';

class GenresService {
  collection: string;
  mongoDB: MongoLib;

  constructor() {
    this.collection = 'genres';
    this.mongoDB = new MongoLib();
  }

  async getGenres() {
    const genres = await this.mongoDB.getAll(this.collection, {});

    if (genres) {
      return formatGenres(genres);
    }

    return [];
  }

  async getGenreById(idQuery: Filter<Document>) {
    const genre = await this.mongoDB.get(this.collection, idQuery);
    if (genre) {
      return new Genre(genre);
    }
    return null;
  }

  async getGenreByQuery(query: string | Filter<Document>) {
    const genre = await this.mongoDB.get(this.collection, query);
    if (genre) {
      return new Genre(genre);
    }
    return null;
  }

  async createGenre(genre: Genre) {
    const createdMovieId = await this.mongoDB.create(this.collection, genre);
    return createdMovieId as ObjectId;
  }

  async updateGenre(genreId: string, genre: Genre) {
    const updatedMovieId = await this.mongoDB.update(this.collection, genreId, genre);
    return updatedMovieId as ObjectId | null;
  }

  async deleteGenre(genreId: string) {
    const deletedMovieId = await this.mongoDB.delete(this.collection, genreId);
    return deletedMovieId as ObjectId | null;
  }
}

export default GenresService;
