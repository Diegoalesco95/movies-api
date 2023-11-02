// @packages
import { ObjectId } from 'mongodb';

type TUserMovie = {
  _id: ObjectId;
  userId: string;
  movieId: string;
};
export default class UserMovie {
  public _id;
  public userId;
  public movieId;

  constructor(userMovie?: TUserMovie) {
    if (userMovie) {
      this._id = userMovie._id;
      this.userId = userMovie.userId;
      this.movieId = userMovie.movieId;
    }
  }
}

export const formatUserMovies = (userMovies: TUserMovie[]) => {
  return userMovies.map((userMovie) => new UserMovie(userMovie));
};
