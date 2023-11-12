// @packages
import { ObjectId } from 'mongodb';
// @scripts
import MongoLib from '@lib/mongo';
import { formatUserMovies } from 'src/models/userMovies';

class UserMoviesService {
  collection: string;
  mongoDB: MongoLib;
  constructor() {
    this.collection = 'user-movies';
    this.mongoDB = new MongoLib();
  }

  async getUserMovies(userId: string) {
    const userMovies = await this.mongoDB.getAll(this.collection, { userId });
    return formatUserMovies(userMovies);
  }

  async createUserMovie(userId: string, movieId: string) {
    const createdUserMovieId = await this.mongoDB.create(this.collection, {
      userId,
      movieId,
    });
    return createdUserMovieId as ObjectId;
  }

  async deleteUserMovie(userMovieId: string) {
    const deletedUserMovieId = await this.mongoDB.delete(this.collection, userMovieId);
    return deletedUserMovieId as ObjectId | null;
  }
}

export default UserMoviesService;
