// @packages
import { ObjectId } from 'mongodb';

export interface IGenre {
  _id?: ObjectId;
  id: number;
  name: string;
}

export default class Genre {
  public _id;
  public id;
  public name;

  constructor(genre?: IGenre) {
    if (genre) {
      this._id = genre._id;
      this.id = genre.id;
      this.name = genre.name;
    }
  }
}

export const formatGenres = (genres: IGenre[]) => {
  return genres.map((genre) => new Genre(genre));
};
